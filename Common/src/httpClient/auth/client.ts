import { User } from '@common/interfaces';

const getUserDetails = () => new Promise((resolve) => {
	resolve({
		name: 'tee',
		age: 29,
		isAcvtive: true
	});
});

const setUserDetails = (user: User) => {
	const { name, age, isActive } = user;
	console.log(name, age, isActive);
};

export { getUserDetails, setUserDetails };
