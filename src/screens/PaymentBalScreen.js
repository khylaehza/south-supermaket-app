import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HStack, Box, Button, Badge } from '@gluestack-ui/themed';
import {
	CustomText,
	CustomMenu,
	CustomButton,
	CustomRadio,
} from '../components';
import { Styles, Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const PaymentBalScreen = ({ route }) => {
	const { clientKey, fullKey } = route.params;

	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [method, setMethod] = useState('');
	const [value, setValue] = useState('');
	const [payMethodId, setPayMethodId] = useState('');
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm({
		values: { Card: '', 'E-Wallets': '', Banking: '' },
	});
	// const card = [
	// 	{
	// 		name: 'Debit Card',
	// 		icon: require('../../assets/imgs/debit-cards.png'),
	// 		type: 'Card',
	// 		val: 'paypal',
	// 	},
	// 	{
	// 		name: 'Credit Card',
	// 		icon: require('../../assets/imgs/credit-card.png'),
	// 		type: 'Card',
	// 		val: 'paypal',
	// 	},
	// ];
	const wallet = [
		{
			name: 'GCash',
			icon: require('../../assets/imgs/gcash.jpeg'),
			val: 'gcash',
		},
		{
			name: 'Paymaya',
			icon: require('../../assets/imgs/maya.jpg'),
			val: 'paymaya',
		},
		{
			name: 'Grab_Pay',
			icon: require('../../assets/imgs/grabpay.png'),
			val: 'grab_pay',
		},
	];
	const bank = [
		{
			name: 'BPI Online',
			icon: require('../../assets/imgs/bpi.jpg'),
			val: 'dob',
		},
		{
			name: 'UnionBank Online',
			icon: require('../../assets/imgs/unionbank.jpg'),
			val: 'dob',
		},
	];

	const accords = [
		{
			value: 'Wallet Balance',
			icon: require('../../assets/imgs/wallet-bal.png'),
			name: 'Wallet Balance',
			sub: false,
		},
		{
			value: 'Paypal',
			icon: require('../../assets/imgs/paypal.png'),
			name: 'Paypal',
			sub: false,
		},
		{
			value: 'E-Wallets',
			icon: require('../../assets/imgs/e-wallet.png'),
			name: 'E-Wallets',

			context: (
				<CustomRadio
					radioLabels={wallet}
					control={control}
					name={`E-Wallets`}
					method={method}
					setMethod={setMethod}
				/>
			),
			sub: true,
		},
		// {
		// 	value: 'Banking',
		// 	name: 'Banking',
		// 	icon: require('../../assets/imgs/bank.png'),
		// 	context: (
		// 		<CustomRadio
		// 			radioLabels={bank}
		// 			control={control}
		// 			name={`Banking`}
		// 			setMethod={setMethod}
		// 			method={method}
		// 		/>
		// 	),
		// 	sub: true,
		// },
	];

	const ConfirmPress = async () => {
		console.log('pressing confirm', value, method);
		setLoading(true);
		if (value == 'Wallet Balance' || value == 'Paypal') {
			navigation.navigate('Confirm', {
				type: value,
			});
		} else {
			console.log('paymongo', method.toLowerCase());
			const options = {
				method: 'POST',
				url: 'https://api.paymongo.com/v1/payment_methods',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					authorization:
						'Basic c2tfdGVzdF9mZ3cyRG9wdEc5TGFDczFFTkhSaWFROWU6',
				},
				data: {
					data: { attributes: { type: method?.toLowerCase() } },
				},
			};

			await axios
				.request(options)
				.then(function (response) {
					console.log('paymethodid', response.data.data.id);
					setPayMethodId(response.data.data.id);

					navigation.navigate('Confirm', {
						type: value,
						method: method,
						payMethodId: response.data.data.id,
						clientKey: clientKey,
						fullKey: fullKey,
					});
				})
				.catch(function (error) {
					console.error(error, 'error here');
				});
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
				<>
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
										text={'CHECK-OUT'}
										type='PRIMARY'
										color={Colors.white200}
										size={18}
									/>
								</Box>
								<Box
									w={'33.3%'}
									alignItems='flex-end'
								>
									{/* <Button
								size='sm'
								variant='link'
							>
								<Ionicons
									name='cart-outline'
									size={24}
									color={Colors.white200}
								/>
							</Button> */}
								</Box>
							</HStack>
						</View>

						<View
							style={{
								width: '100%',
								// padding: 30,
								// gap: 30,
							}}
						>
							<ScrollView showsVerticalScrollIndicator={false}>
								<View
									style={{
										gap: 30,
										marginBottom: 60,
										padding: 30,
									}}
								>
									<HStack
										alignItems='center'
										zIndex={5}
										w={'100%'}
										gap={10}
									>
										<CustomText
											text={'Choose your payment method.'}
											type='PRIMARY'
											color={Colors.green300}
											align={'left'}
											size={16}
											font='Rubik-Bold'
										/>

										{method.name && (
											<Badge
												size='sm'
												variant='solid'
												action='success'
												rounded={'$xl'}
												bgColor={Colors.orange200}
											>
												<CustomText
													text={
														value == 'Paypal' ||
														value ==
															'Wallet Balance'
															? `${value}`
															: `${method.name}`
													}
													type='PRIMARY'
													color={Colors.green300}
													align={'left'}
													font='Rubik-Regular'
													p={5}
													size={10}
												/>
											</Badge>
										)}
									</HStack>

									<CustomMenu
										method={method}
										setMethod={setMethod}
										setValue={setValue}
										value={value}
										accords={accords}
									/>
								</View>
							</ScrollView>
						</View>
					</View>
					{(method.name || method) && (
						<Box
							pb={30}
							pr={30}
							pl={30}
							bgColor='#F8ECDD'
							pt={10}
						>
							<CustomButton
								text='NEXT'
								onPress={ConfirmPress}
								type='PRIMARY'
							/>
						</Box>
					)}
				</>
			)}
		</View>
	);
};

export default PaymentBalScreen;
