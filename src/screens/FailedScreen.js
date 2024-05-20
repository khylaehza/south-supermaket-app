import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { Box, Image } from '@gluestack-ui/themed';
import { CustomText, CustomButton } from '../components';
import { Colors } from '../themes';
import { useNavigation } from '@react-navigation/native';

const FailedScreen = ({ label = 'PAYMENT' }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				backgroundColor: '#F8ECDD',
			}}
		>
			<View
				style={[
					Styles.mainView,
					{
						flex: 1,
						backgroundColor: '#F8ECDD',
						justifyContent: 'center',
						alignItems: 'center',
					},
				]}
			>
				<Image
					source={require('../../assets/gif/error.gif')}
					w={150}
					h={150}
					size={'sm'}
					objectFit='scale-down'
					alt={'failed'}
				/>
				<CustomText
					text={`${label} FAILED! PLEASE TRY AGAIN.`}
					type='PRIMARY'
					color={Colors.orange400}
					size={18}
				/>
			</View>
			<Box
				p={30}
				w={'100%'}
			>
				<CustomButton
					text='DONE'
					onPress={() => navigation.navigate('HomeScreen')}
					type='PRIMARY'
				/>
			</Box>
		</View>
	);
};

export default FailedScreen;
