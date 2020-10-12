export default () => {};
export const enviroment = {
  dev: 'development',
  prod: 'production',
};

export const googleMapApiKey = 'AIzaSyDcN-KoDMOW2iEcIQohgRhKJZUG_whO8d4';

export const getEstateSearchApiUrl = (() => {
  if (process.env.NODE_ENV === enviroment.dev) {
    return {
      searchSuggestApiUrl: 'http://localhost:4768/api/advance-search/suggest',
      searchGetApi: 'http://localhost:4768/api/advance-search/search',
      estateInfoList: 'http://localhost:4768/api/advance-search/estate-info',
      estateCoord: 'http://localhost:4768/api/advance-search/estate/coord',
      estateList: 'http://localhost:4768/api/advance-search/estate-list',
    };
  }
  return {
    searchSuggestApiUrl: '/api/advance-search/suggest',
    searchGetApi: '/api/advance-search/search',
    estateInfoList: '/api/advance-search/estate-info',
    estateCoord: '/api/advance-search/estate/coord',
    estateList: '/api/advance-search/estate-list',
  };
})();

export const PropertyRentStatus = Object.freeze(
  {
    DangThietLapDeChoThue: 0,
    ChoThue: 1,
    DangCoNguoiYeuCauThue: 2,
    DaChoThue: 3,
  },
);

export const PropertyPreRentStatus = Object.freeze(
  {
    KhongChoThueTruoc: 0,
    ChoThueTruoc: 1,
    DangCoNguoiYeuCauThueTruoc: 2,
    DaChoThueTruoc: 3,
  },
);
