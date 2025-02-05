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
import { Platform, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
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
	const [lockID, setLockID] = useState();
	const { lock } = useData();

	const ViewPress = async (item) => {
		// const NODEMCU_IP_ADDRESS = '192.168.254.108';
		const NODEMCU_IP_ADDRESS = '192.168.43.247';
		const NODEMCU_PORT = 80;

		const url = `http://${NODEMCU_IP_ADDRESS}:${NODEMCU_PORT}/LEDL${item.prod_post}`;
		const matchedLock = lock.find((l) => l.post === item.prod_post);
		if (matchedLock) {
			setLockID(matchedLock.ID);
		}

		try {
			const response = await axios.get(url);

			if (response.status === 200) {
				console.log('blink');
			}

			const formData = new FormData();
			formData.append('ID', Number(lockID));
			formData.append('stat', 1);

			await axios({
				method: 'post',
				url: `https://southsupermarket.nickoaganan.tk/public/php_scripts/edit_statuslock.php`,
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.error('1', error);
				});

			setTimeout(async () => {
				const formData = new FormData();
				formData.append('ID', lockID);
				formData.append('stat', 0);

				await axios({
					method: 'post',
					url: `${url}/edit_statuslock.php`,
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
					.then(function (response) {
						console.log(
							'Status reset to 0 after 7 seconds',
							response
						);
					})
					.catch(function (error) {
						console.error('Failed to reset status:', error);
					});
			}, 7000);

			navigation.navigate('Map', { prodPost: item.prod_post });
			//
		} catch (error) {
			ToastAndroid.showWithGravity(
				error.message,
				ToastAndroid.LONG,
				ToastAndroid.CENTER
			);
		}
	};

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
											uri: `https://southsupermarket.nickoaganan.tk/public/${item.image}`,
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
