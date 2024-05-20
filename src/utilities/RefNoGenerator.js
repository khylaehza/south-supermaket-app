const RefNoGenerator = () => {
	const timestamp = new Date().getTime();
	const randomDigits = Math.floor(100000 + Math.random() * 900000);

	const referenceNumber = Number(`${timestamp}${randomDigits}`.slice(-8));

	return referenceNumber;
};

export { RefNoGenerator };
