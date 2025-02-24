import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Image } from '@gluestack-ui/themed';
import { CustomText, CustomNumSel, CustomButton } from '../components';
import { Colors } from '../themes';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useData } from '../../DataContext';
import axios from 'axios';

const CartScreen = () => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [value, setValue] = useState();
	const [payIntent, setPayIntent] = useState();
	const { cart, setCart } = useData();
	const [loading, setLoading] = useState(false);
	const itemData = [
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
		{
			icon: (
				<Image
					// style={{ width: 50, height: 50 }}
					source={require('../../assets/imgs/wallet.png')}
					size='xs'
					objectFit='cover'
					alt={'product'}
				/>
			),
			name: 'Name',
			pieces: 5,
			price: 149.66,
			discount: 123.44,
			image: require('../../assets/imgs/wallet.png'),
			// action: ViewPress,
		},
	];

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

	const Checkout = () => {
		setLoading(true);
		let amt = Number(totalAmount() * 100);
		const options = {
			method: 'POST',
			url: 'https://api.paymongo.com/v1/payment_intents',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				// authorization:
				// 	'Basic c2tfdGVzdF9mZ3cyRG9wdEc5TGFDczFFTkhSaWFROWU6',
				authorization:
					'Basic c2tfbGl2ZV9VWVU5WGJ1TnZxakpORFBXcnloOG5IUDE6c2tfbGl2ZV9VWVU5WGJ1TnZxakpORFBXcnloOG5IUDE=',
			},
			data: {
				data: {
					attributes: {
						amount: amt,
						payment_method_allowed: [
							'dob',
							'gcash',
							'paymaya',
							'grab_pay',
						],
						// payment_method_options: {
						// 	card: { request_three_d_secure: 'any' },
						// },
						currency: 'PHP',
						capture_type: 'automatic',
					},
				},
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setPayIntent(response.data.data.id);

				setLoading(false);
				navigation.navigate('PayBal', {
					clientKey: response.data.data.id,
					fullKey: response.data.data.attributes.client_key,
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: Colors.orange300,
			}}
		>
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
										color={Colors.green300}
									/>
								</Button>
								<Box
									w={'33.3%'}
									alignItems='center'
								>
									<Ionicons
										name='cart-outline'
										size={24}
										color={Colors.green300}
									/>
								</Box>
								<Box w={'33.3%'}>
									<CustomText
										text={''}
										type='PRIMARY'
										color={Colors.white200}
										size={18}
									/>
								</Box>
							</HStack>
						</View>
					</View>

					{Object.keys(cart).length > 0 ? (
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
									{Object.values(cart).map((item, key) => {
										if (item.quantity > 0) {
											return (
												<HStack
													borderWidth={0.2}
													borderColor={
														Colors.green300
													}
													h={110}
													width={'100%'}
													justifyContent='space-between'
													alignItems='center'
													p={20}
													key={key}
												>
													<CustomNumSel
														item={item}
														value={item.quantity}
													/>
													<Image
														source={{
															uri: `https://southsupermarket.nickoaganan.tk/public/${item.image}`,
														}}
														size={'xs'}
														h={'50%'}
														w={'10%'}
														alt={'item'}
														objectFit='scale-down'
													/>
													<VStack
														alignItems='flex-start'
														width={'30%'}
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
															text={
																item.discounted_price
																	? `₱${Number(
																			item.discounted_price.toLocaleString(
																				'en-US',
																				{
																					maximumFractionDigits: 2,
																					minimumFractionDigits: 2,
																				}
																			)
																		).toFixed(
																			2
																		)}`
																	: `₱${item.amount.toLocaleString(
																			'en-US',
																			{
																				maximumFractionDigits: 2,
																				minimumFractionDigits: 2,
																			}
																		)}`
															}
															type='PRIMARY'
															color={
																Colors.green300
															}
														/>
													</VStack>

													<CustomText
														text={
															item.discounted_price
																? `₱${Number(
																		item.discounted_price *
																			item.quantity.toLocaleString(
																				'en-US',
																				{
																					maximumFractionDigits: 2,
																					minimumFractionDigits: 2,
																				}
																			)
																	).toFixed(
																		2
																	)}`
																: `₱${Number(
																		item.amount *
																			item.quantity.toLocaleString(
																				'en-US',
																				{
																					maximumFractionDigits: 2,
																					minimumFractionDigits: 2,
																				}
																			)
																	).toFixed(
																		2
																	)}`
														}
														type='PRIMARY'
														color={Colors.green300}
													/>
												</HStack>
											);
										}
									})}
								</VStack>
							</View>
						</ScrollView>
					) : (
						<View
							style={{
								height: '80%',
								width: '100%',

								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Image
								source={require('../../assets/gif/cart.gif')}
								w={150}
								h={150}
								size={'sm'}
								objectFit='scale-down'
								alt={'cart'}
							/>
							<CustomText
								text={'Cart is Empty.'}
								type='PRIMARY'
								color={Colors.green300}
								align='left'
							/>
						</View>
					)}

					{Object.keys(cart).length > 0 && (
						<Box
							pb={30}
							bgColor={Colors.orange300}
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
							<CustomButton
								text='CHECK-OUT'
								onPress={Checkout}
								type='PRIMARY'
							/>
						</Box>
					)}
				</View>
			)}
		</View>
	);
};

export default CartScreen;
