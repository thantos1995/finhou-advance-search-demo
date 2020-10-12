import { useState } from 'react';
import httpClient from '../normalFunction/axios-case-converter-client';
import { getEstateSearchApiUrl } from '../config/config';

export default function useGetRegionInfo(searchInput) {
  const [regionInfo, setRegionInfo] = useState({ data: {}, error: false });

  const searchRegion = async () => {
    if (!searchInput) {
      console.log('searchInput is empty');
      return;
    }

    try {
      const response = await httpClient.get(getEstateSearchApiUrl.searchGetApi,
        {
          params: {
            text: searchInput.searchText,
          },
        });

      if (response.status !== 200) {
        throw new Error(`error getting region info ${response.statusText}`);
      }

      let newData = {};
      if (response.data.jsonBoundary) {
        newData = { ...response.data, jsonBoundary: JSON.parse(response.data.jsonBoundary) };
      } else {
        newData = response.data;
      }

      setRegionInfo({ ...regionInfo, data: newData });
    } catch (err) {
      setRegionInfo({ ...regionInfo, error: true });
    }
  };

  return [regionInfo, searchRegion];
}
