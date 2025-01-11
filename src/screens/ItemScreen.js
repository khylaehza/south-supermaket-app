import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Image } from '@gluestack-ui/themed';
import { CustomText, CustomButton, CustomNumSel } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useData } from '../../DataContext';
const ItemScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { info } = route.params;
	const { cart, setCart } = useData();
	const onCartPress = () => {
		navigation.navigate('Cart');
	};
	var hasMatch =
		Object.values(cart).filter((element) => {
			return element.description == info.description;
		}).length > 0;

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
									text={'PRODUCTS'}
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

				<View style={[Styles.mainViewLogo]}>
					<Box
						h={'65%'}
						w={'100%'}
						p={30}
						alignItems='center'
						justifyContent='center'
					>
						<Box
							// bgColor={Colors.green300}
							w={'85%'}
							h={'85%'}
							rounded={10}
						>
							<Image
								source={{
									uri: `https://southsupermarket.nickoaganan.tk/public/${info.image}`,
								}}
								w={'100%'}
								h={'100%'}
								size={'xl'}
								alt={info.description}
							/>
						</Box>
					</Box>
					<View
						style={[
							Styles.bottomView,
							{
								height: '35%',
								justifyContent: 'flex-start',
							},
						]}
					>
						<VStack
							w={'100%'}
							justifyContent='space-between'
							h={'100%'}
						>
							<HStack
								justifyContent='space-between'
								alignItems='flex-start'
							>
								<VStack alignItems='flex-start'>
									<CustomText
										text={info.description}
										type='HEADING'
										color={Colors.green300}
										size={22}
										transform='capitalize'
									/>
									<HStack
										alignItems='center'
										justifyContent='space-between'
										gap={10}
									>
										{info.discounted_price ? (
											<>
												<CustomText
													text={`₱${Number(
														info.discounted_price
													).toLocaleString('en-US', {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2,
													})}`}
													type='PRIMARY'
													color={Colors.green300}
													size={18}
													font='Rubik-Regular'
												/>
												<CustomText
													text={`₱${Number(
														info.amount
													).toLocaleString('en-US', {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2,
													})}`}
													type='STRIKE'
													color={Colors.green300}
													size={12}
													font='Rubik-Regular'
												/>
											</>
										) : (
											<>
												<CustomText
													text={`₱${Number(
														info.amount
													).toLocaleString('en-US', {
														maximumFractionDigits: 2,
														minimumFractionDigits: 2,
													})}`}
													type='PRIMARY'
													color={Colors.green300}
													size={18}
													font='Rubik-Regular'
												/>
											</>
										)}
									</HStack>
								</VStack>

								{Object.values(cart)
									.filter((item) => {
										return (
											item.description == info.description
										);
									})
									.map((data, key) => (
										<View key={key}>
											<CustomNumSel
												item={data}
												value={data.quantity}
											/>
										</View>
									))}

								{!hasMatch && (
									<CustomNumSel
										item={info}
										value={info.quantity}
									/>
								)}
							</HStack>
							<Box
								pb={30}
								w={'100%'}
							>
								<CustomButton
									text='DONE'
									onPress={() =>
										navigation.navigate('Products')
									}
									type='PRIMARY'
								/>
							</Box>
						</VStack>
					</View>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	introTxt: {
		fontFamily: 'Rubik-SemiBold',
		color: Colors.green300,
		fontSize: 22,
		textAlign: 'center',
		marginBottom: 50,
	},
});
export default ItemScreen;
