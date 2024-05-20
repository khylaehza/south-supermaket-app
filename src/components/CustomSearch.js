import {
	Input,
	InputSlot,
	InputIcon,
	InputField,
	FormControl,
	FormControlLabel,
	HStack,
} from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { Colors } from '../themes';
const CustomSearch = ({ control, name, placeholder, w = '100%' }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<>
					<FormControl>
						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<Input
								size='md'
								w={w}
								bgColor='#FFF'
								h={50}
								borderColor={Colors.green300}
							>
								<InputSlot pl='$3'>
									<Ionicons
										name='search-outline'
										size={24}
										color={Colors.green300}
									/>
								</InputSlot>
								<InputField
									fontFamily='Rubik-Regular'
									fontSize={15}
									color={'#000'}
									value={value ? value : ''}
									onChangeText={onChange}
									placeholder={placeholder}
								/>
							</Input>
						</HStack>
					</FormControl>
				</>
			)}
		/>
	);
};

export default CustomSearch;
