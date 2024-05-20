import { View, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, } from '@gluestack-ui/themed';
import { CustomText,  CustomButton } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const PaymentScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { qr } = route.params;
	const onDonePress = () => {
		navigation.navigate('Home');
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: Colors.orange300,
			}}
		>
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
								text={'PAY QR'}
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
						gap: 30,
					}}
				>
					<CustomText
						text={
							'Show this code to the kiosk to pay for your purchase.'
						}
						type='HEADING'
						color={Colors.green300}
						font='Rubik-Bold'
					/>
					<VStack
						alignItems='center'
						justifyContent='center'
					>
						<Box
							w={'100%'}
							bgColor='#FFF'
							gap={10}
							p={28}
							rounded={10}
							alignItems='center'
							justifyContent='center'
						>
							{/* <Image
								source={require('../../assets/imgs/barcode.jpg')}
								alt={'qr'}
								// size={'2xl'}
								// h={330}
								w={'100%'}
								objectFit='contain'
							/> */}

							{/* <CustomText
								text={'**********4110 View Numbers'}
								type='PRIMARY'
								color={'#000'}
								font='Rubik-Regular'
								size={12}
							/> */}

							{/* <Image
								source={require('../../assets/imgs/qr-code.png')}
								alt={'qr'}
								h={330}
								w={'100%'}
								objectFit='contain'
							/> */}
							<QRCode
								value={qr}
								size={275}
							/>
						</Box>
					</VStack>
					{/* <Box
						pb={30}
						bgColor='#F8ECDD'
					>
						<CustomButton
							text='DONE'
							onPress={onDonePress}
							type='PRIMARY'
						/>
					</Box> */}
				</View>
			</View>
			<Box
				p={30}
				bgColor='#F8ECDD'
			>
				<CustomButton
					text='DONE'
					onPress={onDonePress}
					type='PRIMARY'
				/>
			</Box>
		</View>
	);
};

export default PaymentScreen;
