import { View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { useForm } from 'react-hook-form';
import { HStack, Box, VStack, Button } from '@gluestack-ui/themed';
import {
	CustomText,
	CustomButton,
	CustomAmountList,
	CustomNumInput,
} from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useData } from '../../DataContext';
import { encode } from 'base-64';
const CashInAmtScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [amt, setAmt] = useState('');
	const [accessToken, setAccessToken] = useState(null);
	const { approvalUrl, setApprovalUrl } = useData();
	const textInputRef = useRef();
	const { type, method } = route.params;
	const [loading, setLoading] = useState(false);
	const dataDetail = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		transactions: [
			{
				amount: {
					total: amt,
					currency: 'PHP',
				},
			},
		],
		redirect_urls: {
			return_url: 'https://refresh-load.firebaseapp.com/',
			cancel_url: 'https://refresh-load.firebaseapp.com/',
		},
	};

	const clientId =
		'AeW2tGOaThw_KYvfDr3VRRU1YHK-x9n185pU8Qtx0GRJ3AdKyI402Kh-qUIAEh5iwHmQkPpMvL0oX00r';
	const clientSecret =
		'EDu6l1BHkxr-1sI6FNNwVHHOU5C7T0Rr14IzQoHXA7Eo1ibgVj7QDe7Hu19jDwjFZNzSuyNBGeg5bBaV';
	const basicAuth = encode(`${clientId}:${clientSecret}`);
	const onNextPressed = () => {
		setLoading(true);
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
				setAccessToken(res.data.access_token, amt);
				console.log(res.data.access_token, 'accesss token');
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
						const id = response.data.id;
						const links = response.data.links;
						const approvalUrl = links.find(
							(data) => data.rel === 'approval_url'
						);

						setLoading(false);
						setApprovalUrl(approvalUrl.href);

						navigation.navigate('TopPaypal', {
							amount: amt,
							accessToken: res.data.access_token,
							type: 'Cash-In',
						});
					})
					.catch((err) => {
						console.log({ ...err });
						console.log('error in paypal');
					});
			})
			.catch((err) => {
				console.log(err), console.log('error in paypal');
				console.log({ ...err });
			});
	};
	const itemData = [
		{
			description: '50',

			action: () => {
				setAmt(50);
			},
		},
		{
			description: '100',

			action: () => {
				setAmt(100);
			},
		},
		{
			description: '300',
			action: () => {
				setAmt(300);
			},
		},
		{
			description: '500',
			action: () => {
				setAmt(500);
			},
		},
		{
			description: '750',
			action: () => {
				setAmt(750);
			},
		},
		{
			description: '1000',
			action: () => {
				setAmt(1000);
			},
		},
		{
			description: '1500',
			action: () => {
				setAmt(1500);
			},
		},
		{
			description: '3000',
			action: () => {
				setAmt(3000);
			},
		},
		{
			description: '5000',
			action: () => {
				setAmt(5000);
			},
		},
	];

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		// getValues,
	} = useForm();

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
										color={Colors.green300}
									/>
								</Button>
								<Box w={'33.3%'}>
									<CustomText
										text={'CASH-IN'}
										type='PRIMARY'
										color={Colors.green300}
										size={18}
									/>
								</Box>
								<Box
									w={'33.3%'}
									alignItems='flex-end'
								>
									<Button
										size='sm'
										variant='link'
									>
										<Ionicons
											name='cart-outline'
											size={24}
											color={Colors.green300}
										/>
									</Button>
								</Box>
							</HStack>
						</View>

						<View
							style={{
								width: '100%',
								padding: 30,
								gap: 10,
							}}
						>
							<CustomText
								text={'Input amount (₱)'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								size={16}
								font='Rubik-Bold'
							/>

							<CustomNumInput
								h={65}
								size={45}
								setInput={setAmt}
								input={amt ? amt : ''}
								control={control}
								name={'amt'}
								type={'number'}
								keyboardType={'number-pad'}
								textInputRef={textInputRef}
								placeholder={'P0.00'}
								border={Colors.green300}
								bColor={'#fffbf6'}
								mv={0}
							/>

							<VStack
								mt={20}
								gap={10}
							>
								<CustomText
									text={'Cash in value (₱)'}
									type='PRIMARY'
									color={Colors.green300}
									align={'left'}
									size={16}
									font='Rubik-Bold'
								/>

								<CustomAmountList
									itemData={itemData}
									details={false}
									name={false}
								/>
							</VStack>

							<VStack
								w={'100%'}
								mt={20}
								gap={10}
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
										type == 'Paypal' || 'Wallet Balance'
											? `${type}`
											: `${type}/${method}`
									}
									type='PRIMARY'
									color={Colors.green300}
									align={'left'}
									size={16}
									font='Rubik-Regular'
								/>
							</VStack>
						</View>
					</View>
					<Box
						pb={30}
						pr={30}
						pl={30}
						bgColor='#F8ECDD'
					>
						<CustomButton
							text='NEXT'
							onPress={onNextPressed}
							type='PRIMARY'
						/>
					</Box>
				</>
			)}
		</View>
	);
};

export default CashInAmtScreen;
