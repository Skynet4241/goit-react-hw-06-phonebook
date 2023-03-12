import {
  ContactFormList,
  ContactFormItem,
  ContactFormText,
  ContactFormDeleteBtn,
} from './ContactList.styled';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getFilter, getItem } from 'redux/contactSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getItem);
  const filter = useSelector(getFilter);

  const list =
    filter !== ''
      ? contactsList.filter(item =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contactsList;

  return (
    <>
      <ContactFormList>
        {list.map(contact => (
          <ContactFormItem key={contact.id}>
            <ContactFormText>
              {contact.name}: {contact.number}
            </ContactFormText>
            <ContactFormDeleteBtn
              name={contact.id}
              onClick={e => dispatch(deleteContact(e.target.name))}
            >
              Delete
            </ContactFormDeleteBtn>
          </ContactFormItem>
        ))}
      </ContactFormList>
    </>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
