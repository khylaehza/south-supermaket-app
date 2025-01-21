import {
	RadioGroup,
	HStack,
	Radio,
	RadioIndicator,
	Box,
	RadioIcon,
	CircleIcon,
	FormControl,
	Image,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import CustomText from './CustomText';
import { Controller } from 'react-hook-form';
import { Colors } from '../themes';
const CustomRadio = ({
	control,
	name,
	rules = {},
	placeholder,
	required,
	icon,
	readOnly = false,
	radioLabels,
	w = 250,
	setMethod,
	method,
}) => {
	console.log(method);
	return (
		// <Controller
		// 	control={control}
		// 	name={name}
		// 	rules={rules}
		// 	render={({ field: { value, onChange }, fieldState: { error } }) => (
		<>
			<FormControl isRequired={required}>
				<RadioGroup
					value={method ? method : ''}
					onChange={setMethod}
				>
					{radioLabels.map((label, key) => (
						<Radio
							value={label.name}
							key={key}
						>
							<HStack
								p={20}
								borderBottomWidth={
									radioLabels.length - 1 != key ? 0.2 : 0
								}
								w={'100%'}
								alignItems='center'
								bgColor={
									method.name === label.name
										? Colors.green300
										: null
								}
								rounded={3}
							>
								<RadioIndicator
									mr={10}
									bgColor={
										method.name == label.name
											? Colors.orange300
											: '#F8ECDD'
									}
									color={'#F8ECDD'}
									borderColor={
										method.name == label.name
											? '#FFF'
											: '#000'
									}
									borderWidth={1}
								>
									<RadioIcon
										as={CircleIcon}
										bgColor='#FFF'
									/>
								</RadioIndicator>
								<HStack
									justifyContent='space-between'
									w={'100%'}
									alignItems='center'
								>
									<CustomText
										text={label.name}
										type='PRIMARY'
										color={
											method.name == label.name
												? '#FFF'
												: Colors.green300
										}
									/>
									<Box
										mr={30}
										bgColor={!label.type && '#FFF'}
									>
										<Image
											source={label.icon}
											size='xs'
											alt={label.name}
											objectFit='scale-down'
										/>
									</Box>
								</HStack>
							</HStack>
						</Radio>
					))}
				</RadioGroup>
			</FormControl>
		</>
		// 	)}
		// />
	);
};

export default CustomRadio;
