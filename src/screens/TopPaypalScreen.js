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
	const navigation = useNavigation();
	const { approvalUrl, setApprovalUrl, url, curUser, cart } = useData();
	const insets = useSafeAreaInsets();
	const refNo = RefNoGenerator();

	const postDataToServer = async () => {
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
		if (
			webViewState.url.includes('https://refresh-load.firebaseapp.com/')
		) {
			setApprovalUrl(null);
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
