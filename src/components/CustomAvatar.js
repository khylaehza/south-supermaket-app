import {
	Avatar,
	AvatarBadge,
	AvatarFallbackText,
	AvatarImage,
	HStack,
	VStack,
	Heading,
	Text,
	Image,
} from '@gluestack-ui/themed';
import { Colors } from '../themes';
import CustomText from './CustomText';
import moment from 'moment';
import { useState, useEffect } from 'react';
const CustomAvatar = ({ fname, lname, image }) => {
	const [time, setTime] = useState();

	useEffect(() => {
		const currentTime = moment();
		const morningStart = moment('06:00', 'HH:mm');
		const afternoonStart = moment('12:00', 'HH:mm');
		const eveningStart = moment('18:00', 'HH:mm');

		if (currentTime.isBefore(afternoonStart)) {
			setTime('Good morning, ');
		} else if (currentTime.isBefore(eveningStart)) {
			setTime('Good afternoon, ');
		} else {
			setTime('Good evening, ');
		}
	}, []);

	return (
		<HStack
			space='md'
			mt={10}
		>
			<Avatar
				bgColor={Colors.green300}
				size={'lg'}
			>
				{/* <AvatarFallbackText>{`${fname} ${lname}`}</AvatarFallbackText> */}
				{/* <AvatarImage
					source={{
						uri: image ? image : 'null',
					}}
					alt={'avatar'}
					resizeMode='cover'
					size='500px'
				/> */}

				<Image
					source={
						image
							? {
									uri: image,
								}
							: require('../../assets/imgs/no_profile.png')
					}
					alt={'avatar'}
					resizeMode='cover'
					style={{ borderRadius: 100, width: '100%', height: '100%' }}
					// size='500px'
				/>
			</Avatar>
			<VStack
				justifyContent='center'
				alignContent='flex-start'
			>
				<CustomText
					text={time}
					type='PRIMARY'
					color='#000'
					align={'left'}
					font={'Rubik-Regular'}
				/>
				<CustomText
					text={fname ? fname : 'User'}
					type='PRIMARY'
					color='#000'
					align={'left'}
				/>
			</VStack>
		</HStack>
	);
};

export default CustomAvatar;
