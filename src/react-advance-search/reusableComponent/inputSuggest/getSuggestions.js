import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { getEstateSearchApiUrl } from '../../config/config';

const client = applyCaseMiddleware(axios.create({ timeout: 30000 }));

export default async (input) => {
  try {
    const response = await client.get(getEstateSearchApiUrl.searchSuggestApiUrl,
      {
        params: {
          text: input,
        },
      });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
