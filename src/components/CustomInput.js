import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../themes/Colors';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { HStack, Button } from '@gluestack-ui/themed';
import { FontAwesome5 } from '@expo/vector-icons';
const CustomInput = ({
	control,
	name,
	rules = {},
	placeholder,
	secureTextEntry,
	keyboardType,
	type,
	maxLength,
	autoCapitalize,
	border = Colors.green100,
	bColor = Colors.green100,
	h = 45,
	size = 14,
	mv = 7,
	multiline = false,
}) => {
	const [bgColor, setBgColor] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const handleState = () => {
		!secureTextEntry;
		setShowPassword((showState) => {
			return !showState;
		});
	};
	const styles = StyleSheet.create({
		container: {
			backgroundColor: Colors.white200,
			width: '100%',
			borderColor: Colors.green100,
			borderWidth: 1,
			borderRadius: 5,
			padding: 8,
			marginVertical: mv,
			alignSelf: 'center',
		},
		input: {
			color: Colors.green300,
			fontFamily: 'Rubik-Regular',
		},
		error: {
			color: Colors.red100,
			alignSelf: 'stretch',
			top: -5,
			left: 3,
			fontSize: 12.2,
			fontFamily: 'Rubik-Regular',
		},
	});

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<View
						style={[
							styles.container,
							{
								borderColor: error ? Colors.red100 : border,
								backgroundColor: bgColor
									? bColor
									: Colors.white200,
							},
						]}
					>
						{type == 'password' ? (
							<HStack
								justifyContent='space-between'
								alignItems='center'
							>
								<TextInput
									value={value}
									onChangeText={onChange}
									placeholder={placeholder}
									style={[styles.input]}
									secureTextEntry={showPassword}
									keyboardType={keyboardType}
									onFocus={() => setBgColor(true)}
									onBlur={() => setBgColor(false)}
									type={type}
									maxLength={maxLength}
									autoCapitalize={autoCapitalize}
									fontSize={size}
									width={'100%'}
								/>
								<Button
									variant='link'
									onPress={handleState}
									h={15}
									ml={-30}
								>
									{showPassword ? (
										<FontAwesome5
											name='eye-slash'
											size={15}
											color='gray'
										/>
									) : (
										<FontAwesome5
											name='eye'
											size={15}
											color={Colors.green200}
										/>
									)}
								</Button>
							</HStack>
						) : (
							<TextInput
								value={value}
								onChangeText={onChange}
								placeholder={placeholder}
								style={[styles.input]}
								secureTextEntry={secureTextEntry}
								keyboardType={keyboardType}
								onFocus={() => setBgColor(true)}
								onBlur={() => setBgColor(false)}
								type={type}
								maxLength={maxLength}
								autoCapitalize={autoCapitalize}
								fontSize={size}
								width={'100%'}
								multiline={multiline}
							/>
						)}
					</View>
					{error && (
						<Text style={styles.error}>
							{error.message || 'Error'}
						</Text>
					)}
				</>
			)}
		/>
	);
};

export default CustomInput;
