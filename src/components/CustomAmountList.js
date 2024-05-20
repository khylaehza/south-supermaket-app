import CustomText from './CustomText';
import { Colors } from '../themes';
import {
	View,
	Button,

} from '@gluestack-ui/themed';

import { useNavigation } from '@react-navigation/native';

const CustomAmountList = ({
	itemData,
	maxW = 105,
	minW = 100,
	h = 100,
	details = true,
	name = true,
	size = 14,
}) => {
	const navigation = useNavigation();

	return (
		<View
			marginHorizontal={'auto'}
			flexDirection='row'
			flexWrap='wrap'
			gap={10}
			alignItems='center'
		>
			{itemData.map((item, k) => {
				return (
					<Button
						flex={1}
						key={k}
						justifyContent='center'
						alignItems='center'
						minWidth={minW}
						maxWidth={maxW}
						h={h}
						bgColor='#fffbf6'
						// p={10}
						rounded={5}
						borderColor={Colors.green300}
						borderWidth={1}
						hardShadow={3}
						shadowColor={Colors.green300}
						onPress={item.action}
						// p={15}
					>
						<CustomText
							text={item.description}
							type='PRIMARY'
							color={Colors.green300}
							align={'left'}
							size={25}
						/>
					</Button>
				);
			})}
		</View>
	);
};

export default CustomAmountList;
