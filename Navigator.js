import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View } from 'react-native';
import {
	StartScreen,
	LoginScreen,
	RegisterScreen,
	// OTPScreen,
	HomeScreen,
	ProductsScreen,
	TransactionScreen,
	ProfileScreen,
	CashInScreen,
	CashInAmtScreen,
	PaymentScreen,
	ItemScreen,
	CartScreen,
	// PaymentBalScreen,
	// ConfirmPurchaseScreen,
	ProductFinderScreen,
	SuccessScreen,
	TopPaypalScreen,
	FailedScreen,
	InformationScreen,
	QRScreen,
	PurchaseScreen,
	RFIDScreen,
	SettingsScreen,
	MapScreen,
	PinSetScreen,
	PassSetScreen,
	ScanScreen,
	WishlistScreen,
	AnnouncementScreen,
	PaymongoScreen,
} from './src/screens';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from './src/themes';
import DataProvider from './DataContext';
import {
	Entypo,
	MaterialCommunityIcons,
	FontAwesome5,
	Ionicons,
	MaterialIcons,
} from '@expo/vector-icons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <MyTabBar {...props} />}
		>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<Entypo
							name='home'
							size={17}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Products'
				component={ProductsScreen}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<MaterialCommunityIcons
							name='shopping-search'
							size={17}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name='Finder'
				component={ProductFinderScreen}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<MaterialIcons
							name='location-searching'
							size={17}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name='Transactions'
				component={TransactionScreen}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<FontAwesome5
							name='receipt'
							size={17}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<Ionicons
							name='person'
							size={17}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const Navigator = () => {
	return (
		<NavigationContainer>
			<DataProvider>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName='Start'
				>
					<Stack.Screen
						name='Start'
						component={StartScreen}
					/>
					<Stack.Screen
						name='Login'
						component={LoginScreen}
					/>
					<Stack.Screen
						name='Register'
						component={RegisterScreen}
					/>
					<Stack.Screen
						name='HomeScreen'
						component={TabNavigator}
					/>
					<Stack.Screen
						name='CashIn'
						component={CashInScreen}
					/>

					<Stack.Screen
						name='CashInAmt'
						component={CashInAmtScreen}
					/>

					<Stack.Screen
						name='TopPaypal'
						component={TopPaypalScreen}
					/>
					<Stack.Screen
						name='Success'
						component={SuccessScreen}
					/>
					<Stack.Screen
						name='Failed'
						component={FailedScreen}
					/>
					<Stack.Screen
						name='Payment'
						component={PaymentScreen}
					/>
					<Stack.Screen
						name='Scan'
						component={ScanScreen}
					/>
					<Stack.Screen
						name='Cart'
						component={CartScreen}
					/>
					<Stack.Screen
						name='Item'
						component={ItemScreen}
					/>
					<Stack.Screen
						name='Map'
						component={MapScreen}
					/>
					<Stack.Screen
						name='Information'
						component={InformationScreen}
					/>
					<Stack.Screen
						name='QR'
						component={QRScreen}
					/>
					<Stack.Screen
						name='Purchase'
						component={PurchaseScreen}
					/>
					<Stack.Screen
						name='RFID'
						component={RFIDScreen}
					/>
					<Stack.Screen
						name='Settings'
						component={SettingsScreen}
					/>
					<Stack.Screen
						name='PassSettings'
						component={PassSetScreen}
					/>
					<Stack.Screen
						name='PinSettings'
						component={PinSetScreen}
					/>
					<Stack.Screen
						name='Wish'
						component={WishlistScreen}
					/>
					<Stack.Screen
						name='Announcement'
						component={AnnouncementScreen}
					/>
					<Stack.Screen
						name='Paymongo'
						component={PaymongoScreen}
					/>
					{/* <Stack.Screen
						name='OTP'
						component={OTPScreen}
					/>
					<Stack.Screen
						name='PayBal'
						component={PaymentBalScreen}
					/>
					<Stack.Screen
						name='Confirm'
						component={ConfirmPurchaseScreen}
					/>		
					
					
					
					
					 */}
				</Stack.Navigator>
			</DataProvider>
		</NavigationContainer>
	);
};

function MyTabBar({ state, descriptors, navigation }) {
	return (
		<View
			style={{ flexDirection: 'row', backgroundColor: Colors.green300 }}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				let color = isFocused ? '#FFF' : '#D3d3d3';
				return (
					<TouchableOpacity
						accessibilityRole='button'
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						key={index}
						style={{
							flex: 1,
							minHeight: 50,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{options.tabBarIcon(color)}
						<Text
							style={{
								color: isFocused ? '#FFF' : '#D3d3d3',
								fontFamily: isFocused
									? 'Rubik-SemiBold'
									: 'Rubik-Regular',
								fontSize: 12,
							}}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default Navigator;
