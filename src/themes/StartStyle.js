import { StyleSheet } from 'react-native';
import Color from './Colors';

export default StyleSheet.create({
	mainView: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: Color.white100,
	},

	mainViewLogo: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.orange300,
	},
	bottomView: {
		width: '100%',
		height: '57%',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: Color.white100,
		zIndex: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 60,
	},

	topBar: {
		width: '100%',
		height: 50,
		// height: '5%',
		backgroundColor: Color.orange300,
		zIndex:100
	},

	bottomViewFull: {
		backgroundColor: Color.white100,
		width: '100%',
		height: '92%',
		padding: 30,
		marginTop: 10,
	},

	introTxt: {
		fontFamily: 'Rubik-SemiBold',
		color: Color.green300,
		fontSize: 22,
		marginBottom: 30,
	},

	orangeTxt: {
		color: Color.orange400,
	},

	smallerTxt: {
		fontSize: 14,
	},

	signTxt: {
		fontFamily: 'Rubik-Regular',
		color: Color.green200,
		fontSize: 14,
	},

	wrapIn: {
		marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
});
