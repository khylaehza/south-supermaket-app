import { View,  ScrollView,  } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Image } from '@gluestack-ui/themed';
import { CustomText, CustomNumSel } from '../components';
import { Colors } from '../themes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';


const AnnouncementScreen = () => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const { announcement } = useData();

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
							<Box
								w={'33.3%'}
								alignItems='center'
							>
								<MaterialIcons
									name='notifications-none'
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

				{Object.keys(announcement).length > 0 ? (
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
								{Object.values(announcement).map(
									(item, key) => {
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
															uri: `https://southsupermarket.store/${item.image}`,
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
									}
								)}
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
						{/* <Image
							source={require('../../assets/gif/announcement.gif')}
							w={150}
							h={150}
							size={'sm'}
							objectFit='scale-down'
							alt={'announcement'}
						/> */}
						<CustomText
							text={'No Announcement/s.'}
							type='PRIMARY'
							color={Colors.green300}
							align='left'
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default AnnouncementScreen;
