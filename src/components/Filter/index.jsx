import React from 'react';
import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type='text'
        name='filter'
        placeholder='Find contacts by name'
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Filter;
