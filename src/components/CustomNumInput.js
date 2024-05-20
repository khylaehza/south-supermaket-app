import { Input, InputField } from '@gluestack-ui/themed';
import { Colors } from '../themes';

import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Controller } from 'react-hook-form';
import { useState,  } from 'react';

const CustomNumInput = ({
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
	setInput,
	input,
	textInputRef,
}) => {
	const [bgColor, setBgColor] = useState(false);

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
								height: h,
							},
						]}
					>
						<TextInput
							ref={textInputRef}
							onChangeText={(val) => {
								let num = val.replace(/\D/g, '');
								setInput(num);
							}}
							value={new Intl.NumberFormat('en-US').format(input)}
							placeholder={placeholder}
							style={[styles.input]}
							secureTextEntry={secureTextEntry}
							keyboardType={keyboardType}
							onBlur={() => setBgColor(false)}
							onFocus={() => {
								setBgColor(true);
							}}
							type={type}
							// maxLength={13}
							autoCapitalize={autoCapitalize}
							fontSize={size}
						/>
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


export default CustomNumInput;
