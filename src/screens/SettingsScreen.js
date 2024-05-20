import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../themes';
import {
	HStack,
	VStack,
	Avatar,
	AvatarFallbackText,
	Box,
	Button,
	Divider,
	Image,
} from '@gluestack-ui/themed';
import { CustomText } from '../components';
import { Colors } from '../themes';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const SettingsScreen = () => {
	const insets = useSafeAreaInsets();
	const { curUser, cart, setCurUser } = useData();
	const navigation = useNavigation();

	const onCartPress = () => {
		navigation.navigate('Cart');
	};
	const items = [
		{
			name: 'Password',

			action: 'PassSettings',
		},
		{
			name: 'PIN',

			action: 'PinSettings',
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
								text={'SETTINGS'}
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
								onPress={onCartPress}
							>
								<Ionicons
									name='cart-outline'
									size={24}
									color={Colors.green300}
								/>
								{Object.keys(cart).length > 0 && (
									<Box
										bgColor={Colors.green300}
										w={15}
										h={15}
										rounded={'$full'}
										position='absolute'
										right={-7}
										alignItems='center'
										justifyContent='center'
										top={0}
									>
										<CustomText
											text={Object.keys(cart).length}
											type='PRIMARY'
											color={Colors.white200}
											align={'left'}
											font={'Rubik-Regular'}
											size={12}
										/>
									</Box>
								)}
							</Button>
						</Box>
					</HStack>
				</View>
				<View style={{ width: '100%', padding: 30, marginTop: 15 }}>
					<VStack gap={5}>
						{items.map((item, key) => (
							<Box
								bgColor='#FFF'
								rounded={15}
								hardShadow={4}
								alignItems='center'
								justifyContent='space-between'
								p={6}
								key={key}
								borderWidth={0.5}
								shadowColor={Colors.green300}
								onTouchStart={() => {
									navigation.navigate(item.action);
								}}
							>
								<HStack
									justifyContent={'space-between'}
									w={'100%'}
									alignItems={'center'}
									p={10}
								>
									<HStack
										justifyContent={'space-between'}
										w={'75%'}
										alignItems='center'
									>
										<VStack>
											<CustomText
												text={item.name}
												type='PRIMARY'
												color={Colors.green300}
												size={18}
											/>
										</VStack>
									</HStack>
									<Button
										variant='link'
										onPressIn={() => {
											navigation.navigate(item.action);
										}}
										w={50}
									>
										<Ionicons
											name='chevron-forward'
											size={24}
											color='black'
										/>
									</Button>
								</HStack>
							</Box>
						))}
					</VStack>
				</View>
			</View>
		</View>
	);
};

export default SettingsScreen;
