import React from 'react'
import s from './Contacts.module.css'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const Contacts = ({ contacts, onDelete, children }) => {
  return (
    <div>
      <ul className={s.list}>
        {contacts.map((el) => (
          <li className={s.item} key={uuidv4()}>
            {`${el.name}: ${el.number}`}
            <button
              className={s.button}
              onClick={() => {
                onDelete(el.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

Contacts.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contacts;
