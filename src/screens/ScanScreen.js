import { CameraView,  Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, Button } from '@gluestack-ui/themed';
import { CustomText, CustomButton } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';
const ScanScreen = ({ route }) => {
	const { approvalUrl, setApprovalUrl } = useData();
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	useEffect(() => {
		const getCameraPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getCameraPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		setApprovalUrl(data);
		navigation.navigate('Paymongo', {
							accessToken: data,
						});
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	// if (hasPermission === null) {
	// 	return <Text>Requesting for camera permission</Text>;
	// }
	// if (hasPermission === false) {
	// 	return <Text>No access to camera</Text>;
	// }

	return (
		<View style={styles.container}>
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
									text={'PAY QR'}
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
								>
									<Ionicons
										name='cart-outline'
										size={24}
										color={Colors.green300}
									/>
								</Button>
							</Box>
						</HStack>
					</View>

					<CameraView
						onBarcodeScanned={
							scanned ? undefined : handleBarCodeScanned
						}
						barcodeScannerSettings={{
							barcodeTypes: ['qr', 'pdf417'],
						}}
						style={StyleSheet.absoluteFillObject}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ScanScreen;
