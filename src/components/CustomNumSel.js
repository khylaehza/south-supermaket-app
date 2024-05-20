import React, { useState } from 'react';
import { View, Button, ButtonText } from '@gluestack-ui/themed';
import { StyleSheet, TextInput } from 'react-native';
import { useData } from '../../DataContext';
const CustomNumSel = ({ value, item }) => {

	let val = value ? value : 0
	const [number, setNumber] = useState(val);
	const { setCart } = useData();
	const handleMinus = () => {
		if (number > 0) {
			setNumber((prevNumber) => prevNumber - 1);

			setCart((prevItem) => ({
				...prevItem,
				[item.description]: {
					...item,
					quantity: number - 1,
					total: item.discounted_price
						? item.discounted_price * number - 1
						: item.amount * number - 1,
				},
			}));
		}
	};


	const handleAdd = () => {
		setNumber((prevNumber) => prevNumber + 1);
	
		setCart((prevItem) => ({
			...prevItem,
			[item.description]: {
				...item,
				quantity: number + 1,
				total: item.discounted_price
					? item.discounted_price * number + 1
					: item.amount * number + 1,
			},
		}));
	};

	const handleChange = (text) => {
		const num = parseInt(text, 10);
		if (isNaN(num) || num < 0) {
			setNumber(0);
		} else {
			setNumber(num);
			setCart((prevItem) => ({
				...prevItem,
				[item.description]: {
					...item,
					quantity: number,
					total: item.discounted_price
						? item.discounted_price * number
						: item.amount * number,
				},
			}));
		}
	};
	return (
		<View style={styles.container}>
			<Button
				onPress={handleMinus}
				style={styles.buttonLeft}
				variant='solid'
				padding={0}
			>
				<ButtonText color='white'>-</ButtonText>
			</Button>
			<TextInput
				placeholder='0'
				value={number ? number.toString() : '0'}
				onChangeText={handleChange}
				keyboardType='numeric'
				style={styles.input}
			/>

			<Button
				onPress={handleAdd}
				style={styles.buttonRight}
				variant='solid'
				padding={0}
			>
				<ButtonText color='white'>+</ButtonText>
			</Button>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 0,
		minWidth: 40,
		height: 40,
		textAlign: 'center',
		width: 40,
	},
	buttonLeft: {
		backgroundColor: '#335500',
		borderRadius: 5,
		minWidth: 40,
		height: 40,
		textAlign: 'center',
		width: 47,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},

	buttonRight: {
		backgroundColor: '#335500',
		borderRadius: 5,
		minWidth: 40,
		height: 40,
		textAlign: 'center',
		width: 50,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
});
export default CustomNumSel;
