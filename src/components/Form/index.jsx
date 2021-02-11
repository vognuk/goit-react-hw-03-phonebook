import React, { Component } from 'react'
import s from './Form.module.css'
import PropTypes from 'prop-types'

class Form extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { name, number } = this.state;
    e.preventDefault();
    this.props.onSubmit(name, number);
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { addContact } = this.props;
    const { name, number } = this.state;
    return (
      <div>
        <h1 className={s.title}>Phonebook</h1>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              type='text'
              name='name'
              placeholder='Enter the name'
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label className={s.label}>
            Number
            <input
              className={s.input}
              type='number'
              name='number'
              placeholder='Enter the phone number'
              value={number}
              onChange={this.handleChange}
            />
          </label>
          <button className={s.button} onSubmit={addContact} disabled={false}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
