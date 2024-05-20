import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, VStack, Box, Button } from '@gluestack-ui/themed';
import { CustomText, CustomModal } from '../components';
import { Colors } from '../themes';
import {
	MaterialCommunityIcons,
	Ionicons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import moment from 'moment';
import { useData } from '../../DataContext';
const TransactionScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const onCartPress = () => {
		navigation.navigate('Cart');
	};
	const { cart, transactions, announcement } = useData();
	const [showModal, setShowModal] = useState(false);
	const [curData, setCurData] = useState([]);
	const [sortType, setSortType] = useState(false);

	transactions.sort((a, b) => {
		const dateTimeA = moment(`${a.date} ${a.time}`, 'MMM DD, YYYY hh:mm A');
		const dateTimeB = moment(`${b.date} ${b.time}`, 'MMM DD, YYYY hh:mm A');

		if (sortType) {
			// Ascending order
			return dateTimeA - dateTimeB;
		} else {
			// Descending order
			return dateTimeB - dateTimeA;
		}
	});

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
								text={'TRANSACTIONS'}
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
				<HStack
					justifyContent='space-between'
					alignItems='center'
					zIndex={5}
					p={20}
					w={'100%'}
				>
					<CustomText
						text={`Transactions as of ${moment().format(
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
					<View
						style={{
							width: '100%',
							// gap: 30,
							height: '100%',
						}}
					>
						{transactions.length > 0 ? (
							transactions.map((item, key) => (
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
										onTouchEnd={() => {
											setCurData(item);
											setShowModal(true);
										}}
									>
										<VStack alignItems='flex-start'>
											<CustomText
												text={`${item.type}: ${item.method}`}
												type='PRIMARY'
												color={Colors.green300}
											/>
											<CustomText
												text={`${item.date}, ${item.time}`}
												type='PRIMARY'
												color={Colors.green300}
												font='Rubik-Regular'
											/>
										</VStack>

										<CustomText
											text={
												item.type == 'Payment'
													? `- ${Number(
															item.amount.toLocaleString(
																'en-US'
															)
														).toFixed(2)}`
													: `+ ${Number(
															item.amount.toLocaleString(
																'en-US'
															)
														).toFixed(2)}`
											}
											type='PRIMARY'
											color={Colors.green300}
										/>
									</HStack>
								</VStack>
							))
						) : (
							<CustomText
								text={'No Transactions yet.'}
								type='PRIMARY'
								color={Colors.green300}
								align={'left'}
								font='Rubik-Regular'
							/>
						)}
					</View>
				</ScrollView>
				{curData && showModal && (
					<CustomModal
						showModal={showModal}
						setShowModal={setShowModal}
						curData={curData}
					/>
				)}
			</View>
		</View>
	);
};

export default TransactionScreen;
