import httpClient from './axios-case-converter-client';
import { getEstateSearchApiUrl } from '../config/config';

export default async (wktBoudnary) => {
  try {
    if (!wktBoudnary) {
      // throw new Error('boundary string is not valid');
      return [];
    }

    const requestBody = `"${wktBoudnary}"`;

    const response = await httpClient.post(getEstateSearchApiUrl.estateList, requestBody);

    if (response.status !== 200) {
      throw new Error('error getting estate coords list');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
