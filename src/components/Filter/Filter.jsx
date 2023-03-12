import { FilterField, FilterLabel, FilterInput } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact, getFilter } from 'redux/contactSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <>
      <FilterField>
        <FilterLabel htmlFor="filter">Find contacts by Name</FilterLabel>
        <FilterInput
          type="text"
          id="filter"
          name="name"
          placeholder="Enter filter"
          onChange={e =>
            dispatch(filterContact(e.target.value.toLocaleLowerCase()))
          }
          value={filter}
        ></FilterInput>
      </FilterField>
    </>
  );
};
