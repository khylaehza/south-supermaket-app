import {
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionTrigger,
	AccordionContent,
	Box,
	Image,
	HStack,
} from '@gluestack-ui/themed';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../themes';
import CustomText from './CustomText';

const CustomMenu = ({ method, setMethod, setValue, value, accords }) => {
	return (
		<Accordion
			// m='$5'
			width='100%'
			// maxWidth={640}
			gap={10}
			bgColor='#F8ECDD'
			rounded={10}
		>
			{accords?.map((item, key) => (
				<AccordionItem
					value={item.value}
					key={key}
					bgColor='#F8ECDD'
					gap={5}
					width='100%'
					rounded={10}
				>
					<AccordionHeader
						borderWidth={item.value == value ? 1 : 0.5}
						bgColor={'#F8ECDD'}
						rounded={10}
						hardShadow={3}
						shadowColor={Colors.green300}
						p={8}
					>
						<AccordionTrigger
							onPressIn={() => {
								setValue(item.value);

								if (item.value == 'Wallet Balance') {
									setMethod({ name: 'Wallet Balance' });
								} else if (item.value == 'Paypal') {
									setMethod({ name: 'Paypal' });
								} else if (item.value == 'E-Wallets') {
									setMethod({ name: '' });
								}
							}}
						>
							{({ isExpanded }) => {
								return (
									<HStack
										alignItems='center'
										justifyContent='center'
										gap={20}
									>
										<Image
											source={item.icon}
											size='xs'
											alt={item.name}
										/>
										<CustomText
											text={item.name}
											type='PRIMARY'
											color={Colors.green300}
										/>

										{item.sub && (
											<>
												{isExpanded ? (
													<Entypo
														name='chevron-small-up'
														size={24}
														color='black'
														style={{
															left: 250,
															position:
																'absolute',
														}}
													/>
												) : (
													<Entypo
														name='chevron-small-down'
														size={24}
														color='black'
														style={{
															left: 250,
															position:
																'absolute',
														}}
													/>
												)}
											</>
										)}
									</HStack>
								);
							}}
						</AccordionTrigger>
					</AccordionHeader>

					{item.sub && (
						<AccordionContent>
							<Box
								w={'100%'}
								borderWidth={0.2}
								rounded={3}
							>
								{item.context}
							</Box>
						</AccordionContent>
					)}
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default CustomMenu;
