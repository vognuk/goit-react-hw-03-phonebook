import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Notification from './components/Notification'

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevState) {
    const { contacts: nowContacts } = this.state;
    const { contacts: prevContacts } = prevState;
    if (nowContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nowContacts));
    }
  }

  checkContact = (name, number) => {
    const { contacts } = this.state;
    const checkedContacts = contacts.some((el) => el.name === name);
    if (checkedContacts) {
      return alert('This contact is already in your contacts');
    }
    this.addContact(name, number);
  };

  addContact = (name, number) => {
    const contactData = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.setState((prevState) => ({
      contacts: [contactData, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((el) =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, name, filter, number } = this.state;

    return (
      <div className='container'>
        <Form
          name={name}
          number={number}
          contacts={contacts}
          onChange={this.handleChange}
          onSubmit={this.checkContact}
        ></Form>

        <Filter value={filter} onChange={this.filterContacts} />
        <Contacts
          contacts={this.getVisibleContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
