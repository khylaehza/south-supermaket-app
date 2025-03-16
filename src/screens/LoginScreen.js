import {
	View,
	StyleSheet,
	Text,
	ToastAndroid,
	KeyboardAvoidingView,
} from 'react-native';
import { TopLayout } from '../layouts';
import { Colors, Styles } from '../themes';
import { CustomInput, CustomButton, CustomText } from '../components';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useData } from '../../DataContext';
import { useState } from 'react';

const LoginScreen = () => {
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	const { users, setCurUser } = useData();
	const onGetStartPress = () => {
		navigation.navigate('Register');
	};
	const password = watch('password');
	const [error, setError] = useState('');

	if (users.length <= 0) {
		ToastAndroid.showWithGravity(
			`Loading ...`,
			ToastAndroid.SHORT,
			ToastAndroid.CENTER
		);
	}
	const onLoginPress = (data) => {
		var hasMatch =
			users.filter((d) => {
				return d.username === data.UName;
			}).length > 0;

		if (!hasMatch) {
			setError('Account does not exist.');
			reset();
		}

		users.map((user) => {
			try {
				if (
					data.uName === user.username &&
					data.pass === user.password &&
					user.role == 'user'
				) {
					setError('none');
					setCurUser(user);
					navigation.navigate('HomeScreen');
				} else if (
					data.uName === user.username &&
					user.password != data.pass &&
					user.role == 'user'
				) {
					setError('Incorrect Password.');
				} else if (data.uName == '' || data.pass == '') {
					setError('none');
				}
			} catch (e) {
				console.log(e);
			}
		});

		// navigation.navigate('HomeScreen');
	};

	const insets = useSafeAreaInsets();
	return (
		<View style={{ paddingTop: insets.top }}>
			<View style={[Styles.mainViewLogo]}>
				<TopLayout />

				<View style={Styles.bottomView}>
					<KeyboardAvoidingView style={styles.container}>
						<Text style={styles.introTxt}>
							Sign in
							{/* <Text style={[Styles.orangeTxt]}>SOUTH SUPERMARKET</Text> */}
							<Text
								style={[
									Styles.signTxt,
									(styles.marginTop = 20),
								]}
							>
								{'\n'}Welcome back! Sign in with your previous
								account to continue shopping.
							</Text>
						</Text>
						<CustomInput
							placeholder={'Username'}
							name='uName'
							control={control}
							rules={{
								required: 'Username is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
						/>

						<CustomInput
							placeholder={'Password'}
							name='pass'
							control={control}
							rules={{
								required: 'Password is required.',
								validate: (value) =>
									value === password || setError('none'),
							}}
							secureTextEntry
							type={'password'}
						/>

						{error !== 'none' && (
							<CustomText
								text={error}
								type={'PRIMARY'}
								style={{ color: 'red', fontSize: 11 }}
								color={Colors.red100}
								size={11}
								font={'Rubik-Regular'}
								align='left'
							/>
						)}
						<CustomButton
							text='LOGIN '
							onPress={handleSubmit(onLoginPress)}
							type='PRIMARY'
						/>

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
								Don't have an account?{' '}
							</Text>
							<CustomButton
								text='Register'
								onPress={onGetStartPress}
								type='TERTIARY'
							/>
						</View>
					</KeyboardAvoidingView>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	introTxt: {
		fontFamily: 'Rubik-SemiBold',
		color: Colors.green300,
		fontSize: 22,
		textAlign: 'left',
		marginBottom: 10,
	},
});

export default LoginScreen;
