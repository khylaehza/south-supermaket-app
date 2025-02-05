import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useData } from '../../DataContext';
import { Colors } from '../themes';
import moment from 'moment';
import { RefNoGenerator } from '../utilities/RefNoGenerator';
const TopPaypalScreen = ({ route }) => {
	const { accessToken, type } = route.params;
	console.log('here at toppaypal', type);
	const navigation = useNavigation();
	const { approvalUrl, setApprovalUrl, url, curUser, cart } = useData();
	const insets = useSafeAreaInsets();
	const refNo = RefNoGenerator();

	const postDataToServer = async () => {
		console.log('post data to server');
		try {
			const responses = await Promise.all(
				Object.values(cart).map((cart) => {
					axios({
						method: 'post',
						url: `${url}/add_sales.php`,
						data: {
							user_id: Number(curUser.id),
							barcode: cart.barcode,
							description: cart.description,
							qty: cart.quantity,
							receipt_no: refNo,
							amount: cart.discounted_price
								? cart.discounted_price
								: cart.amount,
							total: cart.total,
							date: moment().format('YYYY-MM-DD HH:mm:ss'),
						},
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
						.then(function (response) {
							navigation.navigate('Success');
						})
						.catch(function (response) {
							console.log('toppaypal error');
							console.log(response);
						});
				})
			);

			// console.log('Server responses:', responses);
		} catch (error) {
			console.error('Error posting data:', error);
		}
	};

	const _onNavigationStateChange = async (webViewState) => {
		console.log('reads on nav change');
		if (webViewState.url.includes('https://refresh-load.web.app/')) {
			console.log('change web');
			setApprovalUrl(null);

			const queryParams = webViewState.url.split('&');

			const paymentIdPair = queryParams.find((param) =>
				param.includes('paymentId=')
			);

			const paymentId = paymentIdPair
				? paymentIdPair.split('=')[1]
				: null;

			const payerIdPair = queryParams.find((param) =>
				param.includes('PayerID=')
			);
			const payerId = payerIdPair ? payerIdPair.split('=')[1] : null;

			await axios
				.post(
					`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
					{ payer_id: payerId },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				.then(async (res) => {
					if (type == 'Cash-In') {
						await axios({
							method: 'post',
							url: `${url}/update_balance.php`,
							data: {
								id: Number(curUser.id),
								new_balance: Number(
									res.data.transactions[0].amount.total
								),
								operation: 'add',
							},
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						})
							.then(async function (response) {
								console.log(response);
							})
							.catch(function (response) {
								console.log(response);
							});
					} else {
						console.log('should post data here');
						postDataToServer();
					}

					await axios({
						method: 'post',
						url: `${url}/add_transaction.php`,
						data: {
							user_id: Number(curUser.id),
							type: type,
							method: 'Paypal',
							amount: Number(
								res.data.transactions[0].amount.total
							),
							date: moment().format('MMM DD, YYYY').toString(),
							time: moment().format('hh:mm A').toString(),
							ref: refNo,
						},
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
						.then(function (res) {
							setApprovalUrl(null);
							navigation.navigate('Success');
						})
						.catch(function (response) {
							console.log(response);
							navigation.navigate('Failed');
						});

					if (response.name == 'INVALID_RESOURCE_ID') {
						setApprovalUrl(null);
						navigation.navigate('Failed');
					}
				})
				.catch((err) => {
					console.log({ ...err });
				});
		} else {
			console.log('not the web');
		}
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: Colors.orange300,
			}}
		>
			{approvalUrl ? (
				<WebView
					style={{ height: '100%', width: '100%', marginTop: 20 }}
					source={{ uri: approvalUrl }}
					onNavigationStateChange={_onNavigationStateChange}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					startInLoadingState={false}
				/>
			) : (
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator
						color={'white'}
						size={'large'}
						style={{
							alignSelf: 'center',
							justifyContent: 'center',
							marginTop: 20,
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default TopPaypalScreen;
