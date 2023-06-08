const logMessage = (info: string) => console.log(info);

const isEvenNumber = (value: number) => new Promise((resolve) => {
	resolve(value % 2 === 0);
});

export {
	logMessage,
	isEvenNumber
};
