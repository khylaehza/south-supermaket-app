import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, VStack, Box, Button } from '@gluestack-ui/themed';
import { CustomText, CustomModal2 } from '../components';
import { Colors } from '../themes';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import moment from 'moment';
import { useData } from '../../DataContext';
const PurchaseScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const onCartPress = () => {
		navigation.navigate('Cart');
	};
	const { cart, sales } = useData();
	const [showModal, setShowModal] = useState(false);
	const [curData, setCurData] = useState([]);
	const [sortType, setSortType] = useState(false);

	sales.sort((a, b) => {
		const dateTimeA = moment(`${a.date}`, 'YYYY-MM-DD hh:mm:ss');
		const dateTimeB = moment(`${b.date}`, 'YYYY-MM-DD hh:mm:ss');

		if (sortType) {
			// Ascending order
			return dateTimeA - dateTimeB;
		} else {
			// Descending order
			return dateTimeB - dateTimeA;
		}
	});

	const unique = new Set();
	const noDuplicate = sales.filter((obj) => {
		if (unique.has(obj.receipt_no)) {
			return false;
		} else {
			unique.add(obj.receipt_no);
			return true;
		}
	});

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
									text={'PURCHASES'}
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
				<HStack
					justifyContent='space-between'
					alignItems='center'
					zIndex={5}
					p={20}
					w={'100%'}
				>
					<CustomText
						text={`Purchases as of ${moment().format(
							'MMM DD, YYYY'
						)}`}
						type='PRIMARY'
						color={Colors.green300}
						align={'left'}
						size={16}
						font='Rubik-Bold'
					/>
					<Button
						onPressIn={() => {
							setSortType(!sortType);
						}}
						variant='link'
						h={22}
					>
						{sortType ? (
							<MaterialCommunityIcons
								name='sort-calendar-ascending'
								size={22}
								color={Colors.green300}
							/>
						) : (
							<MaterialCommunityIcons
								name='sort-calendar-descending'
								size={22}
								color={Colors.green300}
							/>
						)}
					</Button>
				</HStack>
				<ScrollView showsVerticalScrollIndicator={false}>
					{sales.length > 0 ? (
						<View
							style={{
								width: '100%',
								// gap: 30,
								height: '100%',
							}}
						>
							{noDuplicate.length > 0 ? (
								noDuplicate.map((item, key) => {
									return (
										<VStack
											maxWidth={'100%'}
											key={key}
										>
											<HStack
												borderWidth={0.5}
												borderColor={Colors.green300}
												h={60}
												width={'100%'}
												justifyContent='space-between'
												alignItems='center'
												p={20}
												onTouchStart={() => {
													setCurData(item);
													setShowModal(true);
												}}
											>
												<VStack alignItems='flex-start'>
													<CustomText
														text={`Receipt No. ${item.receipt_no}`}
														type='PRIMARY'
														color={Colors.green300}
													/>
													<CustomText
														text={`${moment(
															item.date
														).format(
															'MMM DD, YYYY, hh:mm A'
														)}`}
														type='PRIMARY'
														color={Colors.green300}
														font='Rubik-Regular'
													/>
												</VStack>

												<CustomText
													text={''}
													type='PRIMARY'
													color={Colors.green300}
												/>
											</HStack>
										</VStack>
									);
								})
							) : (
								<></>
							)}
						</View>
					) : (
						<>
							<CustomText
								text={'No Recent Purchases.'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								font='Rubik-Regular'
							/>
						</>
					)}
				</ScrollView>
				{curData && showModal && (
					<CustomModal2
						showModal={showModal}
						setShowModal={setShowModal}
						curData={curData}
					/>
				)}
			</View>
		</View>
	);
};

export default PurchaseScreen;
