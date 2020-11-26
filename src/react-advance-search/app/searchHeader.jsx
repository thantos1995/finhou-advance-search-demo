import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputWithSuggest from '../reusableComponent/inputSuggest/inputWithSuggest.jsx';

export default function SearchHeader(props) {
  const { formInput, handleChange, searchSubmitHandle } = props;

  return (
    <>
      <div className="form-group mx-1">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
          {/* <input
            type="text"
            className="form-control"
            value={formInput.searchText}
            name="searchText"
            onChange={handleChange}
          /> */}
          <InputWithSuggest
            type="text"
            className="form-control"
            value={formInput.searchText}
            onChange={handleChange.handleSearchTextChange}
            name="searchText"
          />
        </div>
      </div>
      <div className="form-group mx-1">
        <button type="button" className="btn btn-primary" onClick={searchSubmitHandle}>Tìm kiếm</button>
      </div>
    </>
  );
}

SearchHeader.propTypes = {
  formInput: PropTypes.shape({
    searchText: PropTypes.string,
  }),
  handleChange: PropTypes.objectOf(PropTypes.func),
  searchSubmitHandle: PropTypes.func,
};

SearchHeader.defaultProps = {
  handleChange: () => {},
  searchSubmitHandle: () => { console.log('submit'); },
  formInput: {
    searchText: '',
  },
};
