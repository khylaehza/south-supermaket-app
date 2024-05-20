import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	ToastAndroid,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton, CustomInput } from '../components';
import { Colors, Styles } from '../themes';
import { IDGenerator } from '../utilities/IDGenerator';
import NoProfile from '../../assets/imgs/no_profile.png';
import axios from 'axios';
import moment from 'moment';
import { useData } from '../../DataContext';

const FormData = global.FormData;
const RegisterScreen = () => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const id = IDGenerator(23);
	const { url, curUser } = useData();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		values: {
			role: 'user',
			balance: '0',
			date: moment().format('YYYY-MM-DD'),
			image: image,
			mname: '',
			deletable: 1,
			unique_num: 12121,
			rfid: '',
			qr_code: '',
			status: 'pending',
		},
	});

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const CONTACT_REGEX = /^(09|\+639)\d{9}$/;
	const PASS_REGEX =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_()]).{8,}$/;

	const password = watch('password');

	const onOTPPress = async (info) => {
		let uriParts = image.split('.');
		let fileType = uriParts[uriParts.length - 1];

		let form = new FormData();
		form.append('unique_num', id);
		form.append('balance', info.balance);
		form.append('rfid', info.rfid);
		form.append('qr_code', id);
		form.append('date', info.date);
		form.append('role', info.role);
		form.append('email', info.email);
		form.append('password', info.password);
		form.append('username', info.uname);
		form.append('fname', info.fname);
		form.append('mname', info.mname);
		form.append('lname', info.lname);
		form.append('contact', info.cnum);
		form.append('address', info.homeAdd);
		form.append('status', info.status);
		form.append('deletable', info.deletable);
		form.append('image', image);

		// form.append('image', {
		// 	uri: image,
		// 	name: `${fileType}`,
		// 	type: `image`,
		// });

		await axios({
			method: 'post',
			url: `${url}/add_user.php`,
			data: form,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then(function (response) {
				// console.log(response.data);

				reset();
				ToastAndroid.showWithGravity(
					`Registration Successful! Please login.`,
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				);
			})
			.catch(function (response) {
				console.log(response);
			});
	};

	const onLoginPress = () => {
		navigation.navigate('Login');
	};
	const PickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Camera,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	return (
		<View style={[Styles.mainView]}>
			<View style={Styles.topBar}></View>
			<View style={Styles.bottomViewFull}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={[Styles.introTxt]}>
						Register
						{/* <Text style={[Styles.orangeTxt]}>SOUTH</Text> */}
						<Text style={[Styles.signTxt, { marginTop: 25 }]}>
							{'\n'}
							Fill this form to create an account.
						</Text>
					</Text>
					<View style={styles.profileMain}>
						<View>
							<Image
								style={styles.profile}
								source={image ? { uri: image } : NoProfile}
							/>

							<TouchableOpacity
								title='Pick an image from camera roll'
								onPress={PickImage}
								style={{ alignItems: 'flex-end', top: -15 }}
							>
								<SimpleLineIcons
									name='pencil'
									size={20}
									color={Colors.green200}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<CustomInput
						placeholder={'Last Name'}
						name='lname'
						control={control}
						rules={{ required: 'Last name is required.' }}
						autoCapitalize='words'
					/>
					<CustomInput
						placeholder={'First Name'}
						name='fname'
						control={control}
						rules={{ required: 'First name is required.' }}
						autoCapitalize='words'
					/>
					<CustomInput
						placeholder={'Middle Name'}
						name='mname'
						control={control}
						rules={{ required: false }}
						autoCapitalize='words'
					/>
					<CustomInput
						placeholder={'Contact Number'}
						name='cnum'
						control={control}
						rules={{
							required: 'Contact Number is required.',
							pattern: {
								value: CONTACT_REGEX,
								message:
									'Contact Number is invalid. It must be 11-digit number for 09 or 12-digits for +639.',
							},
						}}
						keyboardType='numeric'
						type='tel'
						maxLength={13}
					/>
					<CustomInput
						placeholder={'Home Address'}
						name='homeAdd'
						control={control}
						rules={{ required: 'Home Address is required.' }}
						autoCapitalize='words'
					/>
					<CustomInput
						placeholder={'Email Address'}
						name='email'
						control={control}
						rules={{
							required: 'Email Address is required.',
							pattern: {
								value: EMAIL_REGEX,
								message:
									'Email is invalid. Use the proper format with @ and .',
							},
							keyboardType: 'email-address',
						}}
						type='email'
						autoCapitalize='none'
					/>
					<CustomInput
						placeholder={'Username'}
						name='uname'
						control={control}
						rules={{
							required: 'Username is required.',
							minLength: {
								value: 3,
								message:
									'Username should be at least 3 characters long.',
							},
						}}
					/>
					<CustomInput
						placeholder={'Password'}
						name='password'
						control={control}
						rules={{
							required: 'Password is required.',
							pattern: {
								value: PASS_REGEX,
								message:
									'Password should have minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character.',
							},
						}}
						secureTextEntry
						type={'password'}
					/>
					<CustomInput
						placeholder={'Confirm Password'}
						name='conpass'
						control={control}
						rules={{
							required: 'Retyping password is required.',
							validate: (value) =>
								value === password || 'Password do not match',
						}}
						secureTextEntry
						type={'password'}
					/>

					<CustomButton
						text='Register '
						onPress={handleSubmit(onOTPPress)}
						type='PRIMARY'
					/>

					<View style={[styles.profileMain]}>
						<View
							style={[
								Styles.wrapIn,
								{
									alignItems: 'center',
									marginTop: 20,
									marginBottom: 20,
								},
							]}
						>
							<Text style={[Styles.signTxt, { fontSize: 14 }]}>
								Already have an account?{' '}
							</Text>
							<CustomButton
								text='Login'
								onPress={onLoginPress}
								type='TERTIARY'
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	profileMain: {
		alignItems: 'center',
		fontSize: 12,
	},

	profile: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderColor: Colors.orange200,
		borderWidth: 2,
	},

	reg: {
		marginTop: 5,
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 12,
	},
});

export default RegisterScreen;
