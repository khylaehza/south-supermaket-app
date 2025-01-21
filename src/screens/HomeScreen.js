import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, Image, VStack, Button } from '@gluestack-ui/themed';
import { CustomText, CustomAvatar, CustomFlatList } from '../components';
import { Colors } from '../themes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';
import moment from 'moment';
const HomeScreen = () => {
	const { curUser, cart, sales, products, discProducts, announcement } =
		useData();

	const insets = useSafeAreaInsets();

	const navigation = useNavigation();

	const onCashInPress = () => {
		navigation.navigate('CashIn');
	};

	const onPaymentPress = () => {
		navigation.navigate('Payment', {
			qr: curUser.qr_code,
		});
	};

	const onScanPress = () => {
		navigation.navigate('Scan');
	};

	let allProd = [...products, ...discProducts];
	let recent = [];

	const hasValue = (arr, targetValue) => {
		return arr.some((obj) => obj.description === targetValue);
	};

	sales.sort((a, b) => {
		const dateTimeA = moment(`${a.date}`, 'YYYY-MM-DD hh:mm:ss');
		const dateTimeB = moment(`${b.date}`, 'YYYY-MM-DD hh:mm:ss');

		return dateTimeB - dateTimeA;
	});

	sales.filter((sales) => {
		allProd.filter((prd) => {
			if (sales.description == prd.description) {
				if (!hasValue(recent, prd.description) && recent.length < 10) {
					recent.push(prd);
				}
			}
		});
	});

	const onCartPress = () => {
		navigation.navigate('Cart');
	};

	const onAnnouncePress = () => {
		navigation.navigate('Announcement');
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
						<Box alignItems='flex-start'>
							<Button
								size='sm'
								variant='link'
								onPress={onAnnouncePress}
							>
								<MaterialIcons
									name='notifications-none'
									size={24}
									color={Colors.green300}
								/>
								{Object.keys(announcement).length > 0 && (
									<Box
										bgColor={Colors.green300}
										w={15}
										h={15}
										rounded={'$full'}
										position='absolute'
										right={-7}
										alignItems='center'
										justifyContent='center'
										top={0}
									>
										<CustomText
											text={
												Object.keys(announcement).length
											}
											type='PRIMARY'
											color={Colors.white200}
											align={'left'}
											font={'Rubik-Regular'}
											size={12}
										/>
									</Box>
								)}
							</Button>
						</Box>
						<Box>
							<CustomText
								text={'HOME'}
								type='PRIMARY'
								color={Colors.green300}
								size={18}
							/>
						</Box>
						<Box alignItems='flex-end'>
							<Button
								size='sm'
								variant='link'
								onPress={onCartPress}
							>
								<Ionicons
									name='cart-outline'
									size={24}
									color={Colors.green300}
								/>
								{Object.keys(cart).length > 0 && (
									<Box
										bgColor={Colors.green300}
										w={15}
										h={15}
										rounded={'$full'}
										position='absolute'
										right={-7}
										alignItems='center'
										justifyContent='center'
										top={0}
									>
										<CustomText
											text={Object.keys(cart).length}
											type='PRIMARY'
											color={Colors.white200}
											align={'left'}
											font={'Rubik-Regular'}
											size={12}
										/>
									</Box>
								)}
							</Button>
						</Box>
					</HStack>
				</View>

				<View style={{ width: '100%', padding: 30, gap: 30 }}>
					<CustomAvatar
						fname={curUser.fname}
						lname={curUser.lname}
						image={curUser.image}
						alt={'avatar'}
					/>
					<Box
						backgroundColor={Colors.orange300}
						height={200}
						w={'100%'}
						borderRadius={13}
						p={35}
						justifyContent='center'
						hardShadow={5}
						shadowColor={Colors.orange400}
						borderColor={Colors.green300}
						borderWidth={1}
						gap={5}
					>
						<VStack
							gap={1}
							p={5}
						>
							<CustomText
								text={'Current Balance'}
								type='PRIMARY'
								color={Colors.green250}
								size={18}
							/>
							<CustomText
								text={
									curUser.balance
										? Number(
												curUser.balance.toLocaleString(
													'en-US'
												)
											).toFixed(2)
										: '0.00'
								}
								type='HEADING'
								color={Colors.green300}
								font='Rubik-Bold'
								size={45}
							/>
						</VStack>

						<HStack
							w={'100%'}
							gap={10}
							justifyContent='center'
						>
							<Button
								w={'33%'}
								bgColor='#fffbf6'
								rounded={5}
								justifyContent='center'
								h={'100%'}
								onPress={onCashInPress}
							>
								<HStack
									flexDirection='column'
									alignItems='center'
									py={5}
									gap={1}
								>
									<Image
										source={require('../../assets/imgs/wallet.png')}
										alt={'cash-in'}
										objectFit='cover'
										resizeMode='center'
										size='xs'
									/>
									<CustomText
										text={'Cash - In'}
										type='HEADING'
										color={Colors.green300}
										font='Rubik-Bold'
										size={10}
									/>
								</HStack>
							</Button>
							<Button
								w={'33%'}
								bgColor='#fffbf6'
								rounded={5}
								justifyContent='center'
								h={'100%'}
								onPress={onPaymentPress}
							>
								<HStack
									flexDirection='column'
									alignItems='center'
									py={5}
									gap={1}
								>
									<Image
										source={require('../../assets/imgs/qr.png')}
										alt={'payment'}
										objectFit='cover'
										resizeMode='center'
										size='xs'
										h={35}
									/>
									<CustomText
										text={'Payment'}
										type='HEADING'
										color={Colors.green300}
										font='Rubik-Bold'
										size={10}
									/>
								</HStack>
							</Button>
							<Button
								w={'33%'}
								bgColor='#fffbf6'
								rounded={5}
								justifyContent='center'
								h={'100%'}
								onPress={onScanPress}
							>
								<HStack
									flexDirection='column'
									alignItems='center'
									py={5}
									gap={1}
								>
									<Image
										source={require('../../assets/imgs/scanner.png')}
										alt={'scan'}
										objectFit='cover'
										resizeMode='center'
										size='xs'
										h={35}
									/>
									<CustomText
										text={'Scan'}
										type='HEADING'
										color={Colors.green300}
										font='Rubik-Bold'
										size={10}
									/>
								</HStack>
							</Button>
						</HStack>
					</Box>
					<VStack
						gap={15}
						justifyContent='center'
						alignContent='center'
					>
						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<CustomText
								text={'Recent Purchases'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
							/>
							<Button
								onPressIn={() =>
									navigation.navigate('Purchase')
								}
								variant='link'
								h={13}
							>
								<CustomText
									text={'View All >'}
									type='PRIMARY'
									color={Colors.green300}
									align={'right'}
									size={12}
									font='Rubik-Regular'
								/>
							</Button>
						</HStack>

						{/* <ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
						> */}
						{recent.length > 0 ? (
							<CustomFlatList
								itemData={recent}
								details={false}
								size={11}
							/>
						) : (
							<CustomText
								text={'No Recent Purchases.'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								font='Rubik-Regular'
							/>
						)}

						{/* </ScrollView> */}
					</VStack>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;
