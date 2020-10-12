import React, { useState, useEffect } from 'react';
import useGetRegionInfo from '../customHook/useGetRegionInfo';
import getEstateList from '../normalFunction/getEstateListOfRegion';
// Component
import SearchEstateList from './SearchEstateList.jsx';
import SearchHeader from './searchHeader.jsx';
import SearchMap from './searchMap.jsx';
import { googleMapApiKey } from '../config/config';
/**
 * Component cha của app tìm kiếm nâng cao.
 */
export default function App() {
  /** state cho controlled form tìm kiếm */
  const [searchInput, updateSearchInput] = useState({
    searchText: '',
  });

  const [regionInfo, searchRegionInfo] = useGetRegionInfo(searchInput);
  const [estateInfoList, setEstateInfoList] = useState([]);
  const [coordList, setCoordList] = useState([]);

  const handleSearchTextChange = (e, { newValue }) => {
    updateSearchInput({ ...searchInput, searchText: newValue });
  };

  const handleSearchFormChange = {
    handleSearchTextChange,
  };

  useEffect(() => {
    setCoordList([]);
    setEstateInfoList([]);
    (async () => {
      const estateList = await getEstateList(regionInfo.data.wktBoundary);
      const estateInfoes = [];
      const estateCoords = estateList.map(
        (value) => ({ ...value, isHightlight: false }),
      );

      if (estateList.length > 0) {
        const setCoordHightlight = (i, value) => {
          // if (coordList[i].isHightlight === value) {
          //   return;
          // }

          setCoordList((coord) => {
            if (coord[i].isHightlight === value) {
              return coord;
            }
            const updatedcoordItem = { ...coord[i], isHightlight: value };
            const updatedEstateCoords = [
              ...estateCoords.slice(0, i),
              updatedcoordItem,
              ...estateCoords.slice(i + 1),
            ];
            return updatedEstateCoords;
          });
        };

        estateList.forEach((value, index) => {
          value.property.forEach((propertyId) => {
            estateInfoes.push(
              {
                id: propertyId,
                onMouseIn: () => { setCoordHightlight(index, true); },
                onMouseOut: () => { setCoordHightlight(index, false); },
              },
            );
          });
        });

        // console.log(estateCoords);
        // console.log(estateInfoes);

        setCoordList(estateCoords);
        setEstateInfoList(estateInfoes);
      }
    })();
  }, [regionInfo]);

  return (
    <div className="py-2 h-100">
      <div className="card bg-light h-100">
        {/* <div className="card-header">Tìm kiếm nâng cao</div> */}
        <div className="card-body h-100 d-flex flex-column">
          <div className="row">
            <SearchHeader
              formInput={searchInput}
              handleChange={handleSearchFormChange}
              searchSubmitHandle={searchRegionInfo}
            />
          </div>
          <div className="row border flex-grow-1 no-gutters overflow-hidden">
            <div className="col-7 h-100">
              <SearchMap
                coordList={coordList}
                regionBoundary={regionInfo.data.jsonBoundary}
                regionPath={regionInfo.data.path}
                apiKey={googleMapApiKey}
              />
            </div>
            <div className="col-5 h-100 border-left">
              <SearchEstateList estateList={estateInfoList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
