import React, { useState, useEffect } from 'react';
import { View, ScrollView, ToastAndroid, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, Button } from '@gluestack-ui/themed';
import {
	CustomText,
	CustomSearch,
	CustomFinder,
	CustomButton,
} from '../components';
import { Colors } from '../themes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';
import { useForm } from 'react-hook-form';
import * as Location from 'expo-location';

let TetheringManager, Event, TetheringError;

if (Platform.OS === 'android') {
	// Import TetheringManager only on Android
	TetheringManager = require('@react-native-tethering/wifi').default;
	Event = require('@react-native-tethering/wifi').Event;
	TetheringError = require('@react-native-tethering/wifi').TetheringError;
}

const ProductFinderScreen = () => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [isConnected, setConnected] = useState(false);
	const { control, watch } = useForm({ values: { search: '' } });
	const { products, discProducts, cart, announcement } = useData();
	const searchVal = watch('search');
	const checkProd = products !== '0 results' ? products : [];
	const discProd = discProducts !== '0 results' ? discProducts : [];
	const allProd = [...checkProd, ...discProd];

	useEffect(() => {
		(async () => {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}
			const location = await Location.getCurrentPositionAsync({});
			console.log('Location permission granted', location);
		})();
	}, []);

	useEffect(() => {
		if (Platform.OS === 'android' && TetheringManager) {
			const subscriber = TetheringManager.addEventListener(
				Event.OnNetworkDisconnected,
				() => {
					console.log('Disconnected from the network');
				}
			);

			return () => subscriber.remove();
		}
	}, []);

	const connectWifi = async () => {
		if (Platform.OS === 'android' && TetheringManager) {
			try {
				const state = await TetheringManager.isWifiEnabled();

				if (state) {
					try {
						await TetheringManager.connectToNetwork({
							ssid: 'DIY-TAG',
							password: 'diytagtapandgo',
							isHidden: true,
						});
						setConnected(true);
					} catch (error) {
						if (error instanceof TetheringError) {
							ToastAndroid.show(error.message, ToastAndroid.LONG);
						}
						console.log(error);
					}
				} else {
					try {
						await TetheringManager.setWifiEnabled();
						ToastAndroid.show(
							`Turn on the WiFi and click "Connect to WiFi" again.`,
							ToastAndroid.SHORT
						);
					} catch (error) {
						if (error instanceof TetheringError) {
							ToastAndroid.show(error.message, ToastAndroid.LONG);
						}
						console.log(error);
					}
				}
			} catch (error) {
				if (error instanceof TetheringError) {
					ToastAndroid.show(error.message, ToastAndroid.LONG);
				}
				console.log(error);
			}
		} else {
			Alert.alert(
				'Connect to WiFi',
				'Please connect to the grocery’s WiFi network via your iOS settings.'
			);
		}
	};

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
								text={'FINDER'}
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

				{isConnected ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ width: '100%', padding: 30, gap: 30 }}>
							<CustomSearch
								name={`search`}
								control={control}
								placeholder={'Search products...'}
							/>
							<CustomFinder
								itemData={Object.values(allProd)}
								details={false}
								size={11}
								searchVal={searchVal}
							/>
						</View>
					</ScrollView>
				) : (
					<View
						style={{
							width: '100%',
							padding: 30,
							gap: 30,
							justifyContent: 'center',
							alignContent: 'center',
							flex: 1,
						}}
					>
						<CustomText
							text={"Not connected to the grocery's network."}
							type='PRIMARY'
							color={Colors.green300}
							size={18}
						/>
						<CustomButton
							text='Connect to WiFi.'
							onPress={connectWifi}
							type='PRIMARY'
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default ProductFinderScreen;
