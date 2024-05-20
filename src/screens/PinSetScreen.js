import { View, StyleSheet, ToastAndroid } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Image } from '@gluestack-ui/themed';
import {
	CustomText,
	CustomMenu,
	CustomButton,
	CustomInput,
} from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useData } from '../../DataContext';

import { useForm } from 'react-hook-form';

const PinSetScreen = ({ route }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { url, curUser, cart } = useData();
	const onCartPress = () => {
		navigation.navigate('Cart');
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const pinPass = watch('pin');

	const onChangePress = async (info) => {
		await axios({
			method: 'post',
			url: `${url}/updateUserPin.php`,
			data: {
				user_id: Number(curUser.id),
				pin_num: info.pin,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then(function (response) {
				navigation.navigate('Home');
				ToastAndroid.showWithGravity(
					`Pin successfully changed.`,
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				);
			})
			.catch(function (response) {
				console.log(response);
			});

		reset();
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
					{
						flex: 1,
						backgroundColor: '#F8ECDD',
						alignContent: 'center',
					},
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
							<Box w={'33.3%'}>
								<CustomText
									text={'PIN SETTINGS'}
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

				<View
					style={[
						{
							flex: 1,
							backgroundColor: '#F8ECDD',
							alignContent: 'center',
							justifyContent: 'center',
							padding: 30,
						},
					]}
				>
					<VStack
						alignItems='center'
						justifyContent='center'
						gap={10}
					>
						<Image
							source={require('../../assets/imgs/lock.png')}
							w={150}
							h={150}
							size={'sm'}
							objectFit='scale-down'
							alt={'pin'}
						/>
						<CustomText
							text={'Change your pin here.'}
							type='HEADING'
							color={Colors.green300}
							font='Rubik-Bold'
						/>

						<CustomInput
							placeholder={'New Pin'}
							name='pin'
							control={control}
							rules={{
								required: '6-digits pin is required.',
							}}
							secureTextEntry
							type={'password'}
							keyboardType='numeric'
							maxLength={6}
						/>
						<CustomInput
							placeholder={'Confirm Pin'}
							name='conpass'
							control={control}
							rules={{
								required: 'Retyping new pin is required.',
								validate: (value) =>
									value === pinPass ||
									'New pin do not match.',
							}}
							secureTextEntry
							type={'password'}
						/>
					</VStack>
				</View>
			</View>
			<Box
				p={30}
				bgColor='#F8ECDD'
				pt={0}
			>
				<CustomButton
					text='DONE'
					onPress={handleSubmit(onChangePress)}
					type='PRIMARY'
				/>
			</Box>
		</View>
	);
};

export default PinSetScreen;
