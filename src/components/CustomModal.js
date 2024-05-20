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
} from '@gluestack-ui/themed';
import CustomText from './CustomText';
import { Colors } from '../themes';
const CustomModal = ({ showModal, setShowModal, curData }) => {
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
										text={'Date & Time'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`${curData.date}, ${curData.time}`}
										type='PRIMARY'
										color={Colors.green300}
										font='Rubik-Regular'
									/>
								</HStack>
								<HStack justifyContent='space-between'>
									<CustomText
										text={'Amount'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`₱ ${Number(
											curData.amount.toLocaleString(
												'en-US'
											)
										).toFixed(2)}`}
										type='PRIMARY'
										color={Colors.green300}
										font='Rubik-Regular'
									/>
								</HStack>
								<HStack justifyContent='space-between'>
									<CustomText
										text={'Reference Number'}
										type='PRIMARY'
										color={Colors.green300}
									/>
									<CustomText
										text={`${curData.ref}`}
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

export default CustomModal;
