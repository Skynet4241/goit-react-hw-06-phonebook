import {
  ContactsForm,
  ContactFormLabel,
  ContactFormInput,
  ContactFormBtn,
} from './ContactForm.styled';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, newContact } from 'redux/contactSlice';

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', number: '' });
  const contacts = useSelector(getItem);
  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    const addContact = { id: nanoid(), name: name.value, number: number.value };

    if (contacts.some(item => item.name === addContact.name)) {
      alert(`${addContact.name} is already is contacts`);
      return;
    }

    dispatch(newContact(addContact));
    setFormData({ name: '', number: '' });
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ContactsForm onSubmit={handleFormSubmit}>
        <ContactFormLabel htmlFor="name">Name</ContactFormLabel>
        <ContactFormInput
          onChange={handleInputChange}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ContactFormLabel htmlFor="number">Number</ContactFormLabel>
        <ContactFormInput
          onChange={handleInputChange}
          type="tel"
          id="number"
          name="number"
          value={formData.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ContactFormBtn>Add contact</ContactFormBtn>
      </ContactsForm>
    </>
  );
};
