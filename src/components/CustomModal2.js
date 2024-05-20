import {
	Modal,
	Center,
	Button,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	Heading,
	ModalCloseButton,
	Icon,	
	CloseIcon,
	ModalBody,
	Text,
	ModalFooter,
	ButtonText,
	HStack,
	VStack,
	Divider,
} from '@gluestack-ui/themed';
import CustomText from './CustomText';
import { Colors } from '../themes';
import { useData } from '../../DataContext';
import moment from 'moment';

const CustomModal2 = ({ showModal, setShowModal, curData }) => {
	const { sales } = useData();
	let total = 0;
	return (
		// <Center h={300}>
		<>
			{curData && (
				<Modal
					isOpen={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<ModalBackdrop />
					<ModalContent>
						<ModalHeader>
							<CustomText
								text={'TRANSACTION DETAILS'}
								type='PRIMARY'
								color={Colors.green300}
								size={18}
							/>
							<ModalCloseButton>
								<Icon as={CloseIcon} />
							</ModalCloseButton>
						</ModalHeader>
						<ModalBody>
							<VStack gap={5}>
								<HStack justifyContent='space-between'>
									<CustomText
										text={'Reference Number'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`${curData.receipt_no}`}
										type='PRIMARY'
										color={Colors.green300}
										font='Rubik-Regular'
									/>
								</HStack>
								<HStack justifyContent='space-between'>
									<CustomText
										text={'Date & Time'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`${moment(curData.date).format(
											'MMM DD, YYYY, hh:mm A'
										)}`}
										type='PRIMARY'
										color={Colors.green300}
										font='Rubik-Regular'
									/>
								</HStack>
								<HStack justifyContent='space-between'>
									<CustomText
										text={`Item/s:`}
										type='PRIMARY'
										color={Colors.green300}
									/>
								</HStack>
								{sales.map((item, key) => {
									if (item.receipt_no == curData.receipt_no) {
										total += Number(item.total);
										return (
											<>
												<HStack
													justifyContent='space-between'
													ml={20}
												>
													<CustomText
														text={`${item.qty} ${item.description}`}
														type='PRIMARY'
														color={Colors.green300}
														font='Rubik-Regular'
													/>
													<CustomText
														text={Number(
															item.total.toLocaleString(
																'en-US'
															)
														).toFixed(2)}
														type='PRIMARY'
														color={Colors.green300}
														font='Rubik-Regular'
													/>
												</HStack>

												<Divider />
											</>
										);
									}
								})}
								<HStack
									justifyContent='space-between'
									mt={10}
								>
									<CustomText
										text={'Total Amount'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`₱ ${Number(
											total.toLocaleString('en-US')
										).toFixed(2)}`}
										type='PRIMARY'
										color={Colors.green300}
										font='Rubik-Regular'
									/>
								</HStack>
							</VStack>
						</ModalBody>
						<ModalFooter>
							<Button
								size='sm'
								bgColor={Colors.green300}
								borderWidth='$0'
								onPress={() => {
									setShowModal(false);
								}}
								w={'100%'}
							>
								<CustomText
									text={'Okay'}
									type='PRIMARY'
									color={Colors.white200}
								/>
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>

		// </Center>
	);
};

export default CustomModal2;
