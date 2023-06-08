import axios from 'axios';
import { ConfigurationInterface } from '@common/interfaces';

const getConfig = async (): Promise<ConfigurationInterface | null> => {
	try {
		const response = await axios.get('https://api.github.com/users/mapbox');
		return response.data;
	} catch (err) { console.log(err); }
	return null;
};

export default getConfig;
