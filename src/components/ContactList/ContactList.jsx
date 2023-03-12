import { Wrap } from './ContactList.styled';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getFilter, getItem } from 'redux/contactSlice';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Wrap>
        <List
          sx={{
            width: 400,
            maxWidth: 460,
            bgcolor: 'background.paper',
          }}
        >
          {list.map(contact => (
            <ListItem alignItems="flex-start" key={contact.id}>
              <ListItemAvatar>
                <Avatar
                  alt={contact.name}
                  src="https://cdn-icons-png.flaticon.com/512/5480/5480725.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {contact.number}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Button
                sx={{
                  top: '10px',
                }}
                name={contact.id}
                onClick={e => dispatch(deleteContact(e.target.name))}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Wrap>
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
