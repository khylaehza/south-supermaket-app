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

const PassSetScreen = ({ route }) => {
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

	const password = watch('password');

	const onChangePress = async (info) => {
		if (curUser.password == info.curPassword) {
			await axios({
				method: 'post',
				url: `${url}/update_password.php`,
				data: {
					id: Number(curUser.id),
					password: info.password,
				},
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
				.then(function (response) {
					navigation.navigate('Home');
					ToastAndroid.showWithGravity(
						`Password successfully changed.`,
						ToastAndroid.SHORT,
						ToastAndroid.CENTER
					);
				})
				.catch(function (response) {
					console.log(response);
				});
		}
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
									text={'PASSWORD SETTINGS'}
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
							alt={'pass'}
						/>
						<CustomText
							text={'Change your password here.'}
							type='HEADING'
							color={Colors.green300}
							font='Rubik-Bold'
						/>
						<CustomInput
							placeholder={'Current Password'}
							name='curPassword'
							control={control}
							rules={{
								required: 'Current Password is required.',
								validate: (value) =>
									value === curUser.password ||
									'Current password do not match.',
							}}
							secureTextEntry
							type={'password'}
						/>
						<CustomInput
							placeholder={'New Password'}
							name='password'
							control={control}
							rules={{
								required: 'New Password is required.',
							}}
							secureTextEntry
							type={'password'}
						/>
						<CustomInput
							placeholder={'Confirm Password'}
							name='conpass'
							control={control}
							rules={{
								required: 'Retyping new password is required.',
								validate: (value) =>
									value === password ||
									'New Password do not match.',
							}}
							secureTextEntry
							type={'password'}
						/>
					</VStack>
					{/* <Box
						pb={30}
						bgColor='#F8ECDD'
					>
						<CustomButton
							text='DONE'
							onPress={onDonePress}
							type='PRIMARY'
						/>
					</Box> */}
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

export default PassSetScreen;
