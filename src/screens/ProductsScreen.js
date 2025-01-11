import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import {
	HStack,
	Box,
	Image,
	VStack,
	Button,
	AddIcon,
	Icon,
} from '@gluestack-ui/themed';
import { CustomText, CustomSearch, CustomFlatList } from '../components';
import { Colors } from '../themes';
import { useForm } from 'react-hook-form';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';

const ProductsScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm({ values: { search: '' } });
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const searchVal = watch('search');

	const ViewPress = (item) => {
		navigation.navigate('Item', { info: item });
	};
	const onCartPress = () => {
		navigation.navigate('Cart');
	};
	const WishPress = (item) => {
		navigation.navigate('Wish');
	};

	const onAnnouncePress = () => {
		navigation.navigate('Announcement');
	};

	const { products, discProducts, setCart, cart, announcement } = useData();

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
								text={'PRODUCTS'}
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

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ width: '100%', padding: 30, gap: 30 }}>
						<HStack
							width={'100%'}
							justifyContent='space-between'
							alignItems='center'
							gap={5}
						>
							<Box width={'90%'}>
								<CustomSearch
									name={`search`}
									control={control}
									placeholder={'Search products...'}
								/>
							</Box>
							<Button
								width={'10%'}
								pl={7}
								size='sm'
								variant='link'
								onPress={WishPress}
							>
								<Entypo
									name='add-to-list'
									size={24}
									color={Colors.green300}
								/>
							</Button>
						</HStack>

						<HStack
							justifyContent='space-between'
							alignItems='center'
							zIndex={5}
						>
							<CustomText
								text={'EXCLUSIVE DEALS'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								size={16}
							/>
							<CustomText
								text={'View All >'}
								type='PRIMARY'
								color={Colors.green300}
								align={'right'}
								size={12}
								font='Rubik-Regular'
							/>
						</HStack>
						<View style={{ gap: 25, display: 'flex' }}>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								style={{
									marginTop: -10,
									gap: 25,
									display: 'flex',
								}}
							>
								{discProducts != '0 results' ? (
									<HStack gap={10}>
										{discProducts
											.filter((item) => {
												return searchVal.toLowerCase() ===
													''
													? item
													: item.description.includes(
															searchVal
														);
											})
											.map((item, key) => {
												return (
													<Button
														p={10}
														rounded={5}
														borderColor={
															Colors.green300
														}
														borderWidth={1}
														hardShadow={3}
														shadowColor={
															Colors.green300
														}
														h={220}
														bgColor='#fffbf6'
														w={220}
														key={key}
														onPress={() =>
															ViewPress(item)
														}
													>
														<VStack w={'100%'}>
															<CustomText
																text={
																	item.description
																}
																type='PRIMARY'
																color={
																	Colors.green300
																}
																align={'left'}
																transform='capitalize'
															/>
															<CustomText
																text={`${item.qty} pieces left`}
																type='PRIMARY'
																color={
																	Colors.green300
																}
																align={'left'}
																font={
																	'Rubik-Regular'
																}
																size={14}
															/>
															<Box
																h={120}
																p={3}
																alignItems='center'
															>
																<Image
																	source={{
																		uri: `https://bmcforreserve.com/uploads/${item.image}`,
																	}}
																	w={110}
																	h={110}
																	size={'xs'}
																	alt={
																		item.description
																	}
																/>
															</Box>

															<HStack
																alignItems='center'
																justifyContent='space-between'
															>
																<VStack>
																	<CustomText
																		text={`₱${Number(
																			item.discounted_price
																		).toLocaleString(
																			'en-US',
																			{
																				maximumFractionDigits: 2,
																				minimumFractionDigits: 2,
																			}
																		)}`}
																		type='PRIMARY'
																		color={
																			Colors.green300
																		}
																		align={
																			'left'
																		}
																		font={
																			'Rubik-Bold'
																		}
																		size={
																			14
																		}
																	/>
																	<CustomText
																		text={`₱${item.amount.toLocaleString(
																			'en-US',
																			{
																				maximumFractionDigits: 2,
																				minimumFractionDigits: 2,
																			}
																		)}`}
																		type='STRIKE'
																	/>
																</VStack>
																<Button
																	borderRadius={
																		'$full'
																	}
																	size='xs'
																	h={35}
																	w={35}
																	bg={
																		Colors.green200
																	}
																	onPress={() =>
																		onAddToCart(
																			item
																		)
																	}
																>
																	<Icon
																		as={
																			AddIcon
																		}
																		w='$4'
																		h='$4'
																		color='white'
																	/>
																</Button>
																{cart[
																	item
																		.description
																]
																	?.description ==
																	item.description &&
																	cart[
																		item
																			.description
																	]
																		?.quantity >
																		0 && (
																		<Box
																			bgColor={
																				Colors.green300
																			}
																			w={
																				15
																			}
																			h={
																				15
																			}
																			rounded={
																				'$full'
																			}
																			position='absolute'
																			right={
																				-2
																			}
																			alignItems='center'
																			justifyContent='center'
																			top={
																				-2
																			}
																		>
																			<CustomText
																				text={
																					cart[
																						item
																							.description
																					]
																						?.quantity
																				}
																				type='PRIMARY'
																				color={
																					Colors.white200
																				}
																				align={
																					'left'
																				}
																				font={
																					'Rubik-Regular'
																				}
																				size={
																					12
																				}
																			/>
																		</Box>
																	)}
															</HStack>
														</VStack>
													</Button>
												);
											})}
									</HStack>
								) : (
									<>
										<CustomText
											text={'No Exclusive Deals.'}
											type='PRIMARY'
											color={Colors.green300}
											align={'left'}
											font='Rubik-Regular'
										/>
									</>
								)}
							</ScrollView>
						</View>

						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<CustomText
								text={'OTHER PRODUCTS'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								size={16}
							/>
							<CustomText
								text={'View All >'}
								type='PRIMARY'
								color={Colors.green300}
								align={'right'}
								size={12}
								font='Rubik-Regular'
							/>
						</HStack>
						<VStack
							h={'100%'}
							marginTop={-10}
						>
							{products != '0 results' ? (
								<CustomFlatList
									itemData={products}
									maxW={'50%'}
									minW={'45%'}
									h={150}
									searchVal={searchVal}
								/>
							) : (
								<>
									<CustomText
										text={'No Other Products.'}
										type='PRIMARY'
										color={Colors.green300}
										align={'left'}
										font='Rubik-Regular'
									/>
								</>
							)}
						</VStack>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default ProductsScreen;
