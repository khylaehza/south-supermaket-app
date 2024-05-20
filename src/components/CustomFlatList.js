import CustomText from './CustomText';
import { Colors } from '../themes';
import {
	View,
	HStack,
	VStack,
	Box,
	Icon,
	AddIcon,
	Button,
	Image,
} from '@gluestack-ui/themed';
import { useData } from '../../DataContext';
import { useNavigation } from '@react-navigation/native';
const CustomFlatList = ({
	itemData,
	maxW = 105,
	minW = 100,
	h = 100,
	details = true,
	name = true,
	size = 14,
	searchVal = '',
}) => {
	const navigation = useNavigation();

	const ViewPress = (item) => {
		navigation.navigate('Item', { info: item });
	};

	const { setCart, cart, url } = useData();

	const onAddToCart = (item) => {
		// ToastAndroid.showWithGravity(
		// 	`${item.description} Added to Cart!`,
		// 	ToastAndroid.SHORT,
		// 	ToastAndroid.CENTER
		// );
		setCart((prevItem) => ({
			...prevItem,
			[item.description]: {
				...item,
				quantity: (prevItem[item.description]?.quantity || 0) + 1,
				total: item.discounted_price
					? item.discounted_price *
						((prevItem[item.description]?.quantity || 0) + 1)
					: item.amount *
						((prevItem[item.description]?.quantity || 0) + 1),
			},
		}));
	};

	return (
		<View
			marginHorizontal={'auto'}
			flexDirection='row'
			flexWrap='wrap'
			gap={10}
			alignItems='center'
		>
			{itemData.length > 0 ? (
				<>
					{itemData
						.filter((item) => {
							return searchVal.toLowerCase() === ''
								? item
								: item.description.includes(searchVal);
						})
						.map((item, k) => {
							return (
								<Button
									flex={1}
									key={k}
									justifyContent='center'
									alignItems='center'
									minWidth={minW}
									maxWidth={maxW}
									h={h}
									bgColor='#fffbf6'
									// p={10}
									rounded={5}
									borderColor={Colors.green300}
									borderWidth={1}
									hardShadow={3}
									shadowColor={Colors.green300}
									onPress={() => ViewPress(item)}
									// p={15}
								>
									<VStack
										gap={2}
										p={details ? 5 : 0}
									>
										{name && (
											<VStack>
												<CustomText
													text={item.description}
													type='PRIMARY'
													color={Colors.green300}
													align={
														details
															? 'left'
															: 'center'
													}
													size={size}
												/>

												{details && (
													<CustomText
														text={`${item.qty} pieces left`}
														type='PRIMARY'
														color={Colors.green300}
														align={'left'}
														font={'Rubik-Regular'}
														size={14}
													/>
												)}
											</VStack>
										)}
										<Box
											justifyContent='center'
											alignItems='center'
										>
											<Image
												source={{
													uri: `https://southsupermarket.store/${item.image}`,
												}}
												size='sm'
												objectFit='cover'
												alt={item.description}
											/>
										</Box>

										{details && (
											<HStack
												alignItems='center'
												justifyContent='space-between'
												// gap={15}
												w={'100%'}
												pt={5}
												pl={5}
											>
												<CustomText
													text={
														item.amount
															? `₱${item.amount.toLocaleString(
																	'en-US',
																	{
																		maximumFractionDigits: 2,
																		minimumFractionDigits: 2,
																	}
																)}`
															: ''
													}
													type='PRIMARY'
													color={Colors.green300}
													align={'left'}
													font={'Rubik-Bold'}
													size={14}
												/>

												<Button
													borderRadius={'$full'}
													size='xs'
													h={30}
													w={30}
													bg={Colors.green200}
													onPress={() =>
														onAddToCart(item)
													}
												>
													<Icon
														as={AddIcon}
														w='$4'
														h='$4'
														color='white'
													/>
												</Button>

												{cart[item.description]
													?.description ==
													item.description &&
													cart[item.description]
														?.quantity > 0 && (
														<Box
															bgColor={
																Colors.green300
															}
															w={15}
															h={15}
															rounded={'$full'}
															position='absolute'
															right={-4}
															alignItems='center'
															justifyContent='center'
															top={2}
														>
															<CustomText
																text={
																	cart[
																		item
																			.description
																	]?.quantity
																}
																type='PRIMARY'
																color={
																	Colors.white200
																}
																align={'left'}
																font={
																	'Rubik-Regular'
																}
																size={12}
															/>
														</Box>
													)}
											</HStack>
										)}
									</VStack>
								</Button>
							);
						})}
				</>
			) : (
				<></>
			)}
		</View>
	);
};

export default CustomFlatList;
