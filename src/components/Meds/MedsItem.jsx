import { FiPlusCircle } from 'react-icons/fi';

import NavLink from '../NavLink';
import classes from './MedsGrid.module.css';

const MedsItem = ({ name, href }) => {
  return (
    <li className={classes.item}>
      <NavLink href={href}>
        {name} <FiPlusCircle />
      </NavLink>
    </li>
  );
};

export default MedsItem;
