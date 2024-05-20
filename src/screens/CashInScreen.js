import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import { HStack, Box, VStack, Button, Badge } from '@gluestack-ui/themed';
import {
	CustomText,
	CustomMenu,
	CustomButton,
} from '../components';
import { Colors } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const CashInScreen = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [method, setMethod] = useState('');
	const [value, setValue] = useState();
	const onAmtPress = () => {
		navigation.navigate('CashInAmt', {
			type: value,
			method: method.name,
		});
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm({
		values: { Card: '', 'E-Wallets': '', Banking: '' },
	});


	const accords = [
		{
			value: 'Paypal',
			icon: require('../../assets/imgs/paypal.png'),
			name: 'Paypal',
			sub: false,
		},

	];

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
					{ flex: 1, backgroundColor: '#F8ECDD' },
				]}
			>
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
								text={'CASH-IN'}
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
							>
								<Ionicons
									name='cart-outline'
									size={24}
									color={Colors.green300}
								/>
							</Button>
						</Box>
					</HStack>
				</View>

				<View
					style={{
						width: '100%',
						padding: 30,
						gap: 30,
					}}
				>
					<HStack
						justifyContent='space-between'
						alignItems='center'
						zIndex={5}
						w={'100%'}
					>
						<CustomText
							text={'Choose your cash-in method.'}
							type='PRIMARY'
							color={Colors.green300}
							align={'left'}
							size={16}
							font='Rubik-Bold'
						/>
						{method.name && (
							<Badge
								size='sm'
								variant='solid'
								action='success'
								rounded={'$xl'}
								bgColor={Colors.orange200}
							>
								<CustomText
									text={
										value == 'Paypal'
											? `${value}`
											: `${method.name}`
									}
									type='PRIMARY'
									color={Colors.green300}
									align={'left'}
									font='Rubik-Regular'
									p={5}
									size={10}
								/>
							</Badge>
						)}
					</HStack>
					<CustomMenu
						method={method}
						setMethod={setMethod}
						setValue={setValue}
						value={value}
						accords={accords}
					/>
				</View>
			</View>
			{method.name && (
				<Box
					pb={30}
					pr={30}
					pl={30}
					bgColor='#F8ECDD'
				>
					<CustomButton
						text='NEXT'
						onPress={onAmtPress}
						type='PRIMARY'
					/>
				</Box>
			)}
		</View>
	);
};

export default CashInScreen;
