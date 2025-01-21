import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import {
	HStack,
	Box,
	VStack,
	Button,
	Image,
	Avatar,
} from '@gluestack-ui/themed';
import { CustomText, CustomMenu, CustomButton } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';
const InformationScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { curUser, cart } = useData();
	const onCartPress = () => {
		navigation.navigate('Cart');
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
					{
						flex: 1,
						backgroundColor: '#F8ECDD',
						alignContent: 'center',
					},
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
								w={'30%'}
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
							<Box w={'40%'}>
								<CustomText
									text={'INFORMATION'}
									type='PRIMARY'
									color={Colors.green300}
									size={18}
								/>
							</Box>
							<Box
								w={'30%'}
								alignItems='flex-end'
							>
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
				</View>
				<View
					style={[
						Styles.mainView,
						{
							flex: 1,
							backgroundColor: '#F8ECDD',
							alignContent: 'center',
							justifyContent: 'center',
						},
					]}
				>
					<VStack
						alignItems='center'
						gap={35}
						padding={30}
						w={'80%'}
						justifyContent='center'
					>
						<Avatar
							bgColor={Colors.green300}
							size='2xl'
							borderRadius='$full'
						>
							<Image
								source={
									curUser?.image
										? {
												uri: curUser?.image,
											}
										: require('../../assets/imgs/no_profile.png')
								}
								alt={'avatar'}
								resizeMode='contain'
								h={'100%'}
								w={'100%'}
							/>
						</Avatar>
						<VStack
							w={'100%'}
							gap={20}
						>
							<Box
								bgColor='#FFF'
								w={'100%'}
								p={20}
								rounded={5}
							>
								<CustomText
									text={
										curUser?.mname
											? `${curUser?.fname} ${curUser?.mname
													.chartAt(0)
													.toUpperCase()} ${
													curUser?.lname
												}`
											: `${curUser?.fname} ${curUser?.lname}`
									}
									type='PRIMARY'
									color={Colors.green300}
									size={18}
								/>
							</Box>
							<Box
								bgColor='#FFF'
								w={'100%'}
								p={20}
								rounded={5}
							>
								<CustomText
									text={curUser?.address}
									type='PRIMARY'
									color={Colors.green300}
									size={18}
								/>
							</Box>
							<Box
								bgColor='#FFF'
								w={'100%'}
								p={20}
								rounded={5}
							>
								<CustomText
									text={curUser?.contact}
									type='PRIMARY'
									color={Colors.green300}
									size={18}
								/>
							</Box>
							<Box
								bgColor='#FFF'
								w={'100%'}
								p={20}
								rounded={5}
							>
								<CustomText
									text={curUser?.date}
									type='PRIMARY'
									color={Colors.green300}
									size={18}
								/>
							</Box>
						</VStack>
					</VStack>
				</View>
			</View>
		</View>
	);
};

export default InformationScreen;
