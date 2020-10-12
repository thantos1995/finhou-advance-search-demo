import React from 'react';
import PropTypes from 'prop-types';
import RentingStatus from './rentingStatus.jsx';

const itemStyle = {
  height: '450px',
};

export default function EstateItem(props) {
  const { content, onMouseIn, onMouseOut } = props;

  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  let priceString = '';

  if (Number.isNaN(content.rentingPrice) || content.rentingPrice <= 0) {
    priceString = 'Chưa có giá';
  } else {
    priceString = (
      <>
        {formatter.format(content.rentingPrice)}
        {' '}
        <span className="fs-12  font-weight-normal"> / tháng</span>
      </>
    );
  }

  return (
    <div
      className="w-100"
      onMouseOver={onMouseIn}
      onFocus={onMouseIn}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
    >
      <div className="card overflow-hidden" style={itemStyle}>
        <RentingStatus rentStatus={content.rentingStatus} preRentStatus={content.preRentStatus} />
        <div className="item-card9-img">
          <div className="item-card9-imgs" style={{ height: '100%' }}>
            <a href={content.propertyUrl} target="_blank" rel="noreferrer">
              <img
                src={content.imageSrc ? content.imageSrc : 'https://via.placeholder.com/600x360'}
                alt={content.imageAlt ? content.imgAlt : 'không có hình ảnh'}
                className="cover-image d-block w-100"
                data-holder-rendered="true"
              />
            </a>
          </div>
          <div className="item-tags">
            <div className="bg-success tag-option">{content.propertyTypeName}</div>
          </div>
          {/* {{html PropertyCode}} */}
        </div>
        <div className="card-body">
          <div className="item-card9">
            <div className="item-card2-text">
              <a href={content.propertyUrl} className="text-dark" target="_blank" rel="noreferrer">
                <h4 className="" style={{ minHeight: '38px' }}>
                  {content.title}
                </h4>
              </a>
              <p className="mb-2">
                <i className="fa fa-map-marker text-danger mr-1" />
                {' '}
                {content.address}
                {' '}
              </p>
              <h5 className="font-weight-bold mb-3">
                {priceString}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EstateItem.propTypes = {
  onMouseIn: PropTypes.func,
  onMouseOut: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.object,
};

EstateItem.defaultProps = {
  onMouseIn: () => {},
  onMouseOut: () => {},
  content: {},
};
