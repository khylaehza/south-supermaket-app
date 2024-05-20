import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../themes/Colors';

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
	return (
		<TouchableOpacity
			onPressIn={onPress}
			style={[styles.container, styles[`container_${type}`]]}
		>
			<Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
	},

	container_PRIMARY: {
		backgroundColor: Colors.green200,
		marginVertical: 5,
		fontFamily: 'Rubik-Bold',
	},

	container_SECONDARY: {
		borderColor: Colors.green200,
		borderWidth: 2,
	},

	container_TERTIARY: {
		borderRadius: 0,
		padding: 0,
		width: 'auto',
	},

	container_FOURTH: {
		borderRadius: 0,
		padding: 0,
		width: 'auto',
	},

	text: {
		color: Colors.white200,
		textAlign: 'center',
	},

	text_PRIMARY: {
		fontFamily: 'Rubik-SemiBold',
	},

	text_SECONDARY: {
		color: Colors.green200,
		fontFamily: 'Rubik-SemiBold',
	},

	text_TERTIARY: {
		color: Colors.green300,
		textDecorationLine: 'underline',
		fontFamily: 'Rubik-SemiBold',
		fontSize: 14,
	},

	text_FOURTH: {
		color: Colors.orange300,
		textDecorationLine: 'underline',
		fontFamily: 'Rubik-SemiBold',
		fontSize: 12,
	},
});

export default CustomButton;
