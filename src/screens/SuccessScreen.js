import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { Box, Image } from '@gluestack-ui/themed';
import { CustomText, CustomButton } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../DataContext';
const SuccessScreen = ({ label = 'PAYMENT' }) => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const { setCurUser, curUser, users, setCart } = useData();

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
					source={require('../../assets/gif/success.gif')}
					w={150}
					h={150}
					size={'sm'}
					objectFit='scale-down'
					alt={'success'}
				/>
				<CustomText
					text={`${label} SUCCESS!`}
					type='PRIMARY'
					color={'#6A9100'}
					size={18}
				/>
			</View>
			<Box
				p={30}
				w={'100%'}
			>
				<CustomButton
					text='DONE'
					onPress={() => {
						setCart([]);
						navigation.navigate('Home');
					}}
					type='PRIMARY'
				/>
			</Box>
		</View>
	);
};

export default SuccessScreen;
