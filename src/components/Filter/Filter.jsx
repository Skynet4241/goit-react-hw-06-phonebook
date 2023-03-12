import { FilterField, FilterLabel } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact, getFilter } from 'redux/contactSlice';
import { TextField } from '@mui/material';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <>
      <FilterField>
        <FilterLabel htmlFor="filter">Find contacts by Name</FilterLabel>
        <TextField
          id="standard-search"
          label="Enter filter"
          type="text"
          variant="standard"
          onChange={e =>
            dispatch(filterContact(e.target.value.toLocaleLowerCase()))
          }
          value={filter}
        />
      </FilterField>
    </>
  );
};
