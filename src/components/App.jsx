import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

import {
  SectionWrap,
  Heading,
  ContactsTitle,
} from './ContactForm/ContactForm.styled';
import { Filter } from './Filter/Filter';

export const App = () => {

   return (
    <>
      <SectionWrap>
        <Heading>Phonebook</Heading>
        <ContactForm />
      </SectionWrap>
      <SectionWrap>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        <ContactList />
      </SectionWrap>
    </>
  );
};
