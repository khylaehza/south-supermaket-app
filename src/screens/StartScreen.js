import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
	View,
	Text,
	StyleSheet,
	ToastAndroid,
	KeyboardAvoidingView,
} from 'react-native';
import { Colors, Styles } from '../themes';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../components';
import { TopLayout } from '../layouts';
import { useData } from '../../DataContext';
const StartScreen = () => {
	const navigation = useNavigation();
	const { users } = useData();
	const onGetStartPress = () => {
		navigation.navigate('Register');
	};

	const onLoginPress = () => {
		navigation.navigate('Login');
	};

	const insets = useSafeAreaInsets();

	if (users.length <= 0) {
		ToastAndroid.showWithGravity(
			`Loading...`,
			ToastAndroid.SHORT,
			ToastAndroid.CENTER
		);
	}

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
			}}
		>
			<KeyboardAvoidingView>
				<View style={[Styles.mainViewLogo]}>
					<TopLayout />
					<View style={Styles.bottomView}>
						<Text style={styles.introTxt}>
							Shop your{' '}
							<Text style={Styles.orangeTxt}>groceries</Text>
							{'\n'}
							at South Supermarket hassle-free.
						</Text>

						<CustomButton
							text='GET STARTED'
							type='PRIMARY'
							onPress={onGetStartPress}
						/>
						<View style={Styles.wrapIn}>
							<Text
								style={[Styles.signTxt, (styles.fontSize = 14)]}
							>
								Already have an account?{' '}
							</Text>
							<CustomButton
								text='Login'
								onPress={onLoginPress}
								type='TERTIARY'
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	introTxt: {
		fontFamily: 'Rubik-SemiBold',
		color: Colors.green300,
		fontSize: 22,
		textAlign: 'center',
		marginBottom: 50,
	},
});

export default StartScreen;
