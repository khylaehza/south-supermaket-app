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
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import TetheringManager, {
	Event,
	TetheringError,
} from '@react-native-tethering/wifi';

const CustomFinder = ({
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

	const ViewPress = async (item) => {
		const NODEMCU_IP_ADDRESS = '192.168.254.108';
		const NODEMCU_PORT = 80;
		const ip = TetheringManager.getDeviceIP();
		const url = `http://${NODEMCU_IP_ADDRESS}:${NODEMCU_PORT}/${item.prod_code}`;

		try {
			const response = await axios.get(url);
			console.log(response);
			navigation.navigate('Map');
		} catch (error) {
			ToastAndroid.showWithGravity(
				error.message,
				ToastAndroid.LONG,
				ToastAndroid.CENTER
			);
		}
	};

	const { setCart, cart } = useData();

	return (
		<View
			marginHorizontal={'auto'}
			flexDirection='row'
			flexWrap='wrap'
			gap={10}
			alignItems='center'
		>
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
							rounded={5}
							borderColor={Colors.green300}
							borderWidth={1}
							hardShadow={3}
							shadowColor={Colors.green300}
							onPress={() => ViewPress(item)}
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
											align={details ? 'left' : 'center'}
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
							</VStack>
						</Button>
					);
				})}
		</View>
	);
};

export default CustomFinder;
