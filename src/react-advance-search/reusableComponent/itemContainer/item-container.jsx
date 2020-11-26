/* eslint-disable no-loop-func */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { paginateArrayHelper } from '../../normalFunction/paginate';

export default function ItemContainer(props) {
  let itemKey = 0;
  const { columns, componentList } = props;

  const content = [];
  const rowsNumber = (componentList.length + columns - 1) / columns;

  for (let i = 0; i < rowsNumber; i += 1) {
    const columnContent = paginateArrayHelper(componentList, columns, i);
    const rowItem = (
      <div key={`row-${content.length + 1}`} className="row">
        {columnContent.map((value) => <div key={itemKey += 1} className={`col-${12 / columns}`}>{value}</div>)}
      </div>
    );
    content.push(rowItem);
  }

  return (<>{content}</>);
}

ItemContainer.defaultProps = {
  componentList: [],
};

ItemContainer.propTypes = {
  columns: PropTypes.number.isRequired,
  componentList: PropTypes.arrayOf(PropTypes.element),
};
