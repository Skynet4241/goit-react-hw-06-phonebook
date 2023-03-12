import {
  ContactsForm,
  ContactFormLabel,
  ContactFormInput,
  ContactFormBtn,
} from './ContactForm.styled';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newContact } from 'redux/contactSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit=(e) =>{
    e.preventDefault();
    const {name, number} = e.target.elements;

    dispatch(newContact({id: nanoid(), name: name.value, number: number.value}))
    setName('')
    setNumber('')
    
  }

  return(<>
  <ContactsForm onSubmit={handleFormSubmit}>
    <ContactFormLabel htmlFor="name">Name</ContactFormLabel>
    <ContactFormInput 
      type="text"
      id="name"
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />
    <ContactFormLabel htmlFor="number">Number</ContactFormLabel>
    <ContactFormInput 
      type="tel"
      id="number"
      name="number"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
    />
    <ContactFormBtn>Add contact</ContactFormBtn>
  </ContactsForm>
  </>)
  }
;

