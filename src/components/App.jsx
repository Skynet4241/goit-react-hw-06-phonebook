import React from 'react';
import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import {
  SectionWrap,
  Heading,
  ContactsTitle,
} from './ContactForm/ContactForm.styled';
import { Filter } from './Filter/Filter';

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem('contactlist'));
    return contactsFromLS.length !== 0
      ? contactsFromLS
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactlist', JSON.stringify(contacts));
  }, [contacts]);

  const submitHandler = e => {
    e.preventDefault();

    const { name, number } = e.target.elements;
    const newName = e.target.elements.name.value;
    const contactsList = [...contacts];
    const newContact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    if (contactsList.find(contact => newName === contact.name)) {
      alert(`${newName} is already in contacts.`);
      return;
    } else {
      contactsList.push({ ...newContact });
    }
    setContacts(contactsList);
  };

  const removeContactItem = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const filterHandler = e => {
    setFilter(e.target.value);
  };

  const getFilterContactsName = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <>
      <SectionWrap>
        <Heading>Phonebook</Heading>
        <ContactForm onSubmitHandler={submitHandler} />
      </SectionWrap>
      <SectionWrap>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter filter={filter} filterHandler={filterHandler} />
        <ContactList
          contacts={getFilterContactsName()}
          removeHandler={removeContactItem}
        />
      </SectionWrap>
    </>
  );
};
