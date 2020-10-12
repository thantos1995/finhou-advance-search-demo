import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import estateRequestSuggestion from './getSuggestions';
import './autoSuggest.css';

const getSuggestionDefault = async (input, requestFunction = estateRequestSuggestion) => {
  const inputValue = input.trim().toLowerCase();
  return requestFunction(inputValue);
};

const renderDefault = (suggestion) => (
  <span>
    {suggestion}
  </span>
);

const getSuggestionValueDefault = (suggestion) => suggestion;

export default function InputWithSuggest(props) {
  const {
    getSuggestion,
    render,
    getSuggestionValue,
    ...inputprops
  } = props;

  const [suggestions, setSuggestion] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestion(await getSuggestion(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={render}
      inputProps={inputprops}
    />
  );
}

InputWithSuggest.propTypes = {
  getSuggestion: PropTypes.func,
  render: PropTypes.func,
  getSuggestionValue: PropTypes.func,
  inputprops: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
  }),
};

InputWithSuggest.defaultProps = {
  getSuggestion: getSuggestionDefault,
  render: renderDefault,
  getSuggestionValue: getSuggestionValueDefault,
  inputprops: {
    value: '',
    onChange: () => {},
    className: '',
    placeholder: '',
    type: '',
    name: '',
  },
};
