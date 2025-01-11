import { View, Dimensions, BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, Button, Image } from '@gluestack-ui/themed';
import { CustomText } from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import { useData } from '../../DataContext';
import axios from 'axios';
import { useEffect } from 'react';
const MapScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const onCartPress = () => {
		navigation.navigate('Cart');
	};

	const { cart } = useData();

	const onBack = async () => {
		const NODEMCU_IP_ADDRESS = '192.168.254.108';
		const NODEMCU_PORT = 80;

		const url = `http://${NODEMCU_IP_ADDRESS}:${NODEMCU_PORT}/OFF`;
		const response = await axios.get(url);

		if (response.status === 200) {
			navigation.goBack();
		}

		setTimeout(async () => {
			const formData = new FormData();
			formData.append('ID', lockID);
			formData.append('stat', 0);

			await axios({
				method: 'post',
				url: `https://bmcforreserve.com/public/php_scripts/edit_statuslock.php`,
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
				.then(function (response) {
					console.log('Status reset to 0 after 7 seconds', response);
				})
				.catch(function (error) {
					console.error('Failed to reset status:', error);
				});
		}, 7000);
	};

	useEffect(() => {
		const backAction = async () => {
			const NODEMCU_IP_ADDRESS = '192.168.254.108';
			const NODEMCU_PORT = 80;

			const url = `http://${NODEMCU_IP_ADDRESS}:${NODEMCU_PORT}/OFF`;
			const response = await axios.get(url);

			if (response.status === 200) {
				navigation.goBack();
			}
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);

		return () => backHandler.remove();
	}, []);

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
								onPress={onBack}
							>
								<Ionicons
									name='chevron-back'
									size={24}
									color={Colors.green300}
								/>
							</Button>
							<Box w={'33.3%'}>
								<CustomText
									text={'LOCATION'}
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
										color={Colors.white200}
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
					style={{
						width: '100%',
						backgroundColor: Colors.orange300,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',

						paddingTop: 30,
						paddingBottom: 10,
					}}
				>
					<ImageZoom
						cropWidth={Dimensions.get('window').width}
						cropHeight={Dimensions.get('window').height}
						imageWidth={350}
						imageHeight={740}
					>
						<Image
							source={require('../../assets/gif/map.gif')}
							w={'100%'}
							h={'100%'}
							alt={'map'}
							objectFit='contain'
						/>
					</ImageZoom>
				</View>
			</View>
		</View>
	);
};

export default MapScreen;
