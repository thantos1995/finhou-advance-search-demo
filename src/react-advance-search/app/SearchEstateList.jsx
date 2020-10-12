import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ItemContainer from '../reusableComponent/itemContainer/item-container.jsx';
import EstateItem from '../reusableComponent/EstateItem/EstateItem.jsx';
import getEstateInfo from '../normalFunction/getEstateInfo';
import OverlaySpinner from '../reusableComponent/overlaySpinner/overlaySpinner.jsx';

const paginateStyle = {
  width: '100%',
  height: '50px',
};

export default function SearchEstateList(props) {
  const { estateList, pageSize, columns } = props;
  const [estateItemList, setEstateList] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [showLoader, setShowLoader] = useState(false);

  function getEstateList(data) {
    let pageNumber = 0;
    if (estateList.length < 1) {
      setEstateList([]);
      return;
    }

    if (data) {
      pageNumber = data.selected;
    }

    (async () => {
      setShowLoader(true);
      const propertyIdList = estateList.map((value) => value.id);
      const estateInfoList = await getEstateInfo(propertyIdList, pageSize, pageNumber);
      const estateItemLists = estateInfoList.map((value) => {
        const estateBinding = estateList.find(
          (element) => parseInt(value.propertyId, 10) === element.id,
        );

        return (
          <EstateItem
            key={estateBinding.id}
            content={value}
            onMouseIn={estateBinding.onMouseIn ? estateBinding.onMouseIn : undefined}
            onMouseOut={estateBinding.onMouseOut ? estateBinding.onMouseOut : undefined}
          />
        );
      });

      setEstateList(estateItemLists);
      setShowLoader(false);
    })();
  }

  useEffect(() => {
    getEstateList();
  }, []);

  useEffect(() => {
    getEstateList();
  }, [estateList]);

  useEffect(() => {
    setPageCount(Math.ceil(estateList.length / pageSize));
  }, [estateList.length, pageSize]);

  return (
    <>
      <OverlaySpinner show={showLoader} />
      <div className="overflow-auto col-12 mh-100">
        <ItemContainer columns={columns} componentList={estateItemList} />
        {pageCount > 1 && estateItemList.length > 0 ? (
          <div className="col-12 my-3" style={paginateStyle}>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={getEstateList}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              containerClassName="pagination justify-content-center"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

SearchEstateList.propTypes = {
  estateList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    onMouseIn: PropTypes.func,
    onMouseOut: PropTypes.func,
  })).isRequired,
  pageSize: PropTypes.number,
  columns: PropTypes.number,
};

SearchEstateList.defaultProps = {
  pageSize: 10,
  columns: 2,
};
