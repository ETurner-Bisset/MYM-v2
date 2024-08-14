import { IoSearchSharp } from 'react-icons/io5';
import Button from '../UI/Button';
import classes from './Form.module.css';

const SearchForm = () => {
  return (
    <form className={classes.search}>
      <label htmlFor="search">Search Medications: </label>
      <div>
        <input type="text" id="search" required />
        <Button title="Search" className="icon">
          <IoSearchSharp />
        </Button>
      </div>
    </form>
  );
};
export default SearchForm;
