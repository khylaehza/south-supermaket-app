import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Image } from '@gluestack-ui/themed';
import { CustomText, CustomButton } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useData } from '../../DataContext';
import axios from 'axios';
import WebView from 'react-native-webview';
import { RefNoGenerator } from '../utilities/RefNoGenerator';
import moment from 'moment';
import { encode } from 'base-64';
const ConfirmPurchaseScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { url, cart, curUser, approvalUrl, setApprovalUrl } = useData();
	const { type, method, payMethodId, clientKey, fullKey } = route.params;
	const [loading, setLoading] = useState(false);

	const refNo = RefNoGenerator();
	const totalAmount = () => {
		let total = 0;
		Object.values(cart).map((val) => {
			if (val.discounted_price) {
				total += Number(val.discounted_price * val.quantity);
			} else {
				total += Number(val.amount * val.quantity);
			}
		});

		return total;
	};

	const dataDetail = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		transactions: [
			{
				amount: {
					total: Number(totalAmount()),
					currency: 'PHP',
				},
			},
		],
		redirect_urls: {
			return_url: 'https://refresh-load.web.app/',
			cancel_url: 'https://refresh-load.web.app/',
		},
	};

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
							console.log('sample');
							// navigation.navigate('Success');
						})
						.catch(function (response) {
							console.log(response);
							console.log('sample');
						});
				})
			);

			console.log('Server responses:', responses);
		} catch (error) {
			console.error('Error posting data:', error);
		}
	};

	const Confirm = () => {
		setLoading(true);
		if (type == 'Wallet Balance') {
			axios({
				method: 'post',
				url: `${url}/update_balance.php`,
				data: {
					id: Number(curUser.id),
					new_balance: Number(totalAmount()),
					operation: 'minus',
				},
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(async function (response) {
					await axios({
						method: 'post',
						url: `${url}/add_transaction.php`,
						data: {
							user_id: Number(curUser.id),
							type: 'Payment',
							method: 'Wallet',
							amount: Number(totalAmount()),
							date: moment().format('MMM DD, YYYY').toString(),
							time: moment().format('HH:mm:ss').toString(),
							ref: refNo,
						},
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
						.then(function (response) {
							setLoading(false);
							postDataToServer();
							navigation.navigate('Success');
						})
						.catch(function (response) {
							console.log(response);
						});
				})
				.catch(function (response) {
					navigation.navigate('Failed');
				});
		} else if (type == 'Paypal') {
			const clientId =
				'AeW2tGOaThw_KYvfDr3VRRU1YHK-x9n185pU8Qtx0GRJ3AdKyI402Kh-qUIAEh5iwHmQkPpMvL0oX00r';
			const clientSecret =
				'EDu6l1BHkxr-1sI6FNNwVHHOU5C7T0Rr14IzQoHXA7Eo1ibgVj7QDe7Hu19jDwjFZNzSuyNBGeg5bBaV';
			const basicAuth = encode(`${clientId}:${clientSecret}`);

			axios
				.post(
					'https://api-m.sandbox.paypal.com/v1/oauth2/token',
					'grant_type=client_credentials',
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Authorization: `Basic ${basicAuth}`,
						},
					}
				)
				.then((res) => {
					axios
						.post(
							'https://api.sandbox.paypal.com/v1/payments/payment',
							dataDetail,
							{
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${res.data.access_token}`,
								},
							}
						)
						.then((response) => {
							setLoading(false);
							const links = response.data.links;
							const approvalUrl = links.find(
								(data) => data.rel === 'approval_url'
							);
							setApprovalUrl(approvalUrl.href);
							navigation.navigate('TopPaypal', {
								amount: Number(totalAmount()),
								accessToken: res.data.access_token,
								type: 'Payment',
							});
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log(clientKey);
			const options = {
				method: 'POST',
				url: `https://api.paymongo.com/v1/payment_intents/${clientKey}/attach`,

				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Basic ${btoa('sk_live_UYU9XbuNvqjJNDPWryh8nHP1')}`,
				},
				data: {
					data: {
						attributes: {
							client_key: fullKey,
							payment_method: payMethodId,
							return_url: 'https://refresh-load.web.app/',
						},
					},
				},
			};
			axios
				.request(options)
				.then(async function (res) {
					var paymentIntent = res.data.data;
					var paymentIntentStatus = paymentIntent.attributes.status;

					await axios({
						method: 'post',
						url: `${url}/add_transaction.php`,
						data: {
							user_id: Number(curUser.id),
							type: 'Payment',
							method:
								method.charAt(0).toUpperCase() +
								method.slice(1),
							amount: Number(totalAmount()),
							date: moment().format('MMM DD, YYYY').toString(),
							time: moment().format('hh:mm A').toString(),
							ref: refNo,
						},
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
						.then(function (response) {
							console.log(response);
							setLoading(false);
							postDataToServer();

							setApprovalUrl(
								res.data.data.attributes.next_action.redirect
									.url
							);
						})
						.catch(function (response) {
							console.log(response);
						});
					if (paymentIntentStatus === 'awaiting_next_action') {
						console.log('await');
					} else if (paymentIntentStatus === 'succeeded') {
						console.log('success');
					} else if (
						paymentIntentStatus === 'awaiting_payment_method'
					) {
						console.log('pay');
					} else if (paymentIntentStatus === 'processing') {
						console.log('proc');
					}
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};

	const _onNavigationStateChange = async (webViewState) => {
		if (webViewState.url.includes('https://refresh-load.web.app/')) {
			// console.log(approvalUrl)
			setApprovalUrl(null);
			navigation.navigate('Success');
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
				<>
					{loading ? (
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
					) : (
						<View
							style={[
								Styles.mainView,
								{ flex: 1, backgroundColor: '#F8ECDD' },
							]}
						>
							<View style={Styles.topBar}>
								<HStack
									justifyContent='space-between'
									alignItems='center'
									height={'100%'}
									backgroundColor={Colors.orange300}
									pl={30}
									pr={30}
									w={'100%'}
								>
									<Button
										w={'33.3%'}
										justifyContent='flex-start'
										variant='link'
										onPress={() => navigation.goBack()}
									>
										<Ionicons
											name='chevron-back'
											size={24}
											color={Colors.white200}
										/>
									</Button>
									<Box w={'33.3%'}>
										<CustomText
											text={'CONFIRM'}
											type='PRIMARY'
											color={Colors.white200}
											size={18}
										/>
									</Box>
									<Box
										w={'33.3%'}
										alignItems='flex-end'
									></Box>
								</HStack>
							</View>
							<ScrollView showsVerticalScrollIndicator={false}>
								<View
									style={{
										width: '100%',
										gap: 30,
										height: '100%',
									}}
								>
									<VStack
										maxWidth={'100%'}
										height={'100%'}
									>
										{Object.values(cart).map(
											(item, key) => (
												<HStack
													borderWidth={0.2}
													borderColor={
														Colors.green300
													}
													h={70}
													width={'100%'}
													justifyContent='space-between'
													alignItems='center'
													p={20}
													key={key}
												>
													<VStack
														alignItems='flex-start'
														// width={'30%'}
														justifyContent='flex-start'
													>
														<CustomText
															text={
																item.description
															}
															type='PRIMARY'
															color={
																Colors.green300
															}
															align='left'
														/>
														<CustomText
															text={`${
																item.quantity
															} x P${
																item.discounted_price
																	? Number(
																			item.discounted_price
																		).toFixed(
																			2
																		)
																	: Number(
																			item.amount
																		).toFixed(
																			2
																		)
															}`}
															type='PRIMARY'
															color={
																Colors.green300
															}
															font='Rubik-Regular'
														/>
													</VStack>

													<CustomText
														text={
															item.discounted_price
																? Number(
																		item.quantity *
																			item.discounted_price
																	).toFixed(2)
																: Number(
																		item.quantity *
																			item.amount
																	).toFixed(2)
														}
														type='PRIMARY'
														color={Colors.green300}
													/>
												</HStack>
											)
										)}
									</VStack>
								</View>
							</ScrollView>
							<Box
								pb={30}
								bgColor='#F8ECDD'
								w={'100%'}
								pl={30}
								pr={30}
								hardShadow={4}
								shadowColor={'#000'}
								// softShadow={5}
								gap={5}
							>
								<HStack
									w={'100%'}
									mt={20}
									justifyContent='space-between'
								>
									<CustomText
										text={'Total'}
										type='PRIMARY'
										color={Colors.green300}
										align={'left'}
										size={16}
										font='Rubik-Bold'
									/>
									<CustomText
										text={`₱${totalAmount().toLocaleString(
											'en-US',
											{
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											}
										)}`}
										type='PRIMARY'
										color={Colors.green300}
										align={'left'}
										size={16}
										font='Rubik-Regular'
									/>
								</HStack>
								<HStack
									w={'100%'}
									justifyContent='space-between'
								>
									<CustomText
										text={'Payment Method'}
										type='PRIMARY'
										color={Colors.green300}
										align={'left'}
										size={16}
										font='Rubik-Bold'
									/>
									<CustomText
										text={
											type == 'Wallet Balance' || 'Paypal'
												? `${type}`
												: `${type}/${method}`
										}
										type='PRIMARY'
										color={Colors.green300}
										align={'left'}
										size={16}
										font='Rubik-Regular'
									/>
								</HStack>
								<CustomButton
									text='CONFIRM'
									onPress={Confirm}
									type='PRIMARY'
								/>
							</Box>
						</View>
					)}
				</>
			)}
		</View>
	);
};

export default ConfirmPurchaseScreen;
