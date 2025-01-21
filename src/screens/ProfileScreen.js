import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import {
	HStack,
	VStack,
	Avatar,
	AvatarFallbackText,
	Box,
	Button,
	Divider,
	Image,
} from '@gluestack-ui/themed';
import { CustomText } from '../components';
import { Colors } from '../themes';
import {
	Ionicons,
	AntDesign,
	Feather,
	MaterialIcons,
} from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const { curUser, cart, setCurUser, announcement } = useData();
	const navigation = useNavigation();

	const onCartPress = () => {
		navigation.navigate('Cart');
	};

	const onAnnouncePress = () => {
		navigation.navigate('Announcement');
	};

	const items = [
		{
			name: 'My Information',
			icon: (
				<AntDesign
					name='profile'
					size={24}
					color={Colors.green300}
				/>
			),
			action: 'Information',
		},
		{
			name: 'My QR',
			icon: (
				<AntDesign
					name='qrcode'
					size={24}
					color={Colors.green300}
				/>
			),

			action: 'QR',
		},
		{
			name: 'My RFID',
			icon: (
				<Ionicons
					name='barcode-outline'
					size={24}
					color={Colors.green300}
				/>
			),

			action: 'RFID',
		},
		{
			name: 'Purchases',
			icon: (
				<Ionicons
					name='cart-outline'
					size={24}
					color={Colors.green300}
				/>
			),

			action: 'Purchase',
		},

		{
			name: 'Settings',
			icon: (
				<Feather
					name='settings'
					size={24}
					color={Colors.green300}
				/>
			),
			action: 'Settings',
		},

		{
			name: 'Logout',
			icon: (
				<Feather
					name='log-out'
					size={20}
					color={Colors.green300}
				/>
			),
			action: 'Start',
		},
	];

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
								text={'PROFILE'}
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
										top={-5}
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
				<View style={{ width: '100%', padding: 30, marginTop: 15 }}>
					<VStack
						alignItems='center'
						gap={15}
						mb={15}
					>
						<Avatar
							bgColor={Colors.green300}
							size={'2xl'}
						>
							<Image
								source={
									curUser.image
										? {
												uri: curUser.image,
											}
										: require('../../assets/imgs/no_profile.png')
								}
								alt={'avatar'}
								resizeMode='contain'
								// size='500px'
								// h={'100%'}
								// w={'100%'}
								style={{
									borderRadius: 100,
									width: '100%',
									height: '100%',
								}}
							/>
						</Avatar>
						<CustomText
							text={`${curUser.fname} ${curUser.lname}`}
							type='PRIMARY'
							color={Colors.green300}
							size={18}
						/>
					</VStack>
					<VStack gap={5}>
						{items.map((item, key) => (
							<Box
								bgColor='#FFF'
								rounded={15}
								hardShadow={4}
								alignItems='center'
								justifyContent='space-between'
								px={6}
								py={2}
								key={key}
								borderWidth={0.5}
								shadowColor={Colors.green300}
								onTouchStart={() => {
									if (item.action == 'Start') {
										navigation.navigate(item.action);
										setCurUser([]);
									} else {
										navigation.navigate(item.action);
									}
								}}
							>
								<HStack
									justifyContent={'space-between'}
									w={'100%'}
									alignItems={'center'}
									p={10}
								>
									<Box w={'15%'}>{item.icon}</Box>
									<HStack
										justifyContent={'space-between'}
										w={'75%'}
										alignItems='center'
									>
										<VStack>
											<CustomText
												text={item.name}
												type='PRIMARY'
												color={Colors.green300}
												size={18}
											/>
										</VStack>
									</HStack>
									<Button
										variant='link'
										onPressIn={() => {
											if (item.action == 'Start') {
												navigation.navigate(
													item.action
												);
												setCurUser([]);
											} else {
												navigation.navigate(
													item.action
												);
											}
										}}
										w={50}
									>
										<Ionicons
											name='chevron-forward'
											size={24}
											color='black'
										/>
									</Button>
								</HStack>
							</Box>
						))}
					</VStack>
				</View>
			</View>
		</View>
	);
};

export default ProfileScreen;
