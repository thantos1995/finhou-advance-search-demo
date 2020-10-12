import React from 'react';
import PropTypes from 'prop-types';
import { PropertyRentStatus, PropertyPreRentStatus } from '../../config/config';

export default function RentingStatus(props) {
  const { rentStatus, preRentStatus } = props;
  let rentStatusString = '';
  let backGroundClass = '';

  switch (rentStatus) {
    case PropertyRentStatus.DangThietLapDeChoThue: {
      rentStatusString = 'Đang thiết lập';
      backGroundClass = 'bg-info';
      break;
    }
    case PropertyRentStatus.ChoThue: {
      rentStatusString = 'Cho thuê ngay';
      backGroundClass = 'bg-success';
      break;
    }
    case PropertyRentStatus.DangCoNguoiYeuCauThue: {
      rentStatusString = 'Đang giao dịch';
      backGroundClass = 'bg-info';
      break;
    }
    case PropertyRentStatus.DaChoThue: {
      switch (preRentStatus) {
        case PropertyPreRentStatus.KhongChoThueTruoc: {
          rentStatusString = 'Đã cho thuê';
          backGroundClass = 'bg-info';
          break;
        }
        case PropertyPreRentStatus.ChoThueTruoc: {
          rentStatusString = 'Cho thuê trước';
          backGroundClass = 'bg-green';
          break;
        }
        case PropertyPreRentStatus.DangCoNguoiYeuCauThueTruoc: {
          rentStatusString = 'Đang gd thuê trước';
          backGroundClass = 'bg-warning';
          break;
        }
        case PropertyPreRentStatus.DaChoThueTruoc: {
          rentStatusString = 'Đã có đặt trước';
          backGroundClass = 'bg-info';
          break;
        }
        default: {
          rentStatusString = 'Đã có người thuê';
          backGroundClass = 'bg-info';
          break;
        }
      }
      break;
    }
    default: {
      rentStatusString = 'Tạm ngưng';
      backGroundClass = 'bg-info';
      break;
    }
  }

  return <div className={`${backGroundClass} arrow-ribbon`} style={{ zIndex: 100 }}>{rentStatusString}</div>;
}

RentingStatus.propTypes = {
  rentStatus: PropTypes.number,
  preRentStatus: PropTypes.number,
};

RentingStatus.defaultProps = {
  rentStatus: -1,
  preRentStatus: -1,
};
