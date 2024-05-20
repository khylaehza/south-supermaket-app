import { View, StyleSheet, Image } from 'react-native';
import Colors from '../themes/Colors';

const TopLayout = () => {
	return (
		<View style={styles.topView}>
			<Image
				source={require('../../assets/south-logo.png')}
				style={styles.logo}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	topView: {
		width: '100%',
		height: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		color: Colors.green300,
		zIndex: 2,
		flexDirection: 'column',
	},
	logo: {
		objectFit: 'scale-down',
		height: 270,
		width: 270,
		marginTop: 20,
	},
	nameTxt: {
		marginTop: 10,
		fontFamily: 'Rubik-Bold',
		fontSize: 20,
		color: Colors.green300,
	},
});

export default TopLayout;
