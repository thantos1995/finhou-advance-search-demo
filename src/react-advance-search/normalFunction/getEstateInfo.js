import httpClient from './axios-case-converter-client';
import { getEstateSearchApiUrl } from '../config/config';

export default async (estateCodeList, pageSize = 10, pageNumber = 0) => {
  try {
    if (estateCodeList.length < 1) {
      // throw new Error('boundary string is not valid');
      return [];
    }

    const requestBody = {
      PropertyIdList: estateCodeList,
      PageSize: pageSize,
      PageNumber: pageNumber,
    };

    const response = await httpClient.post(getEstateSearchApiUrl.estateInfoList, requestBody);

    if (response.status !== 200) {
      throw new Error('error getting estate info list');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
