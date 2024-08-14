import { LuBellPlus } from 'react-icons/lu';
import { SlNote } from 'react-icons/sl';
import { IoSearchSharp } from 'react-icons/io5';
import Feature from './Feature';
import classes from './Features.module.css';

const Features = () => {
  return (
    <div className={classes.features}>
      <Feature
        icon={<LuBellPlus />}
        text="Recieve notifications reminding you when to take your medications and order your prescription. Including details about your pharmacy and instructions for taking your medication."
      />
      <Feature
        icon={<SlNote />}
        text="Review, edit and delete details of your medications and reminders."
      />
      <Feature
        icon={<IoSearchSharp />}
        text="Search your medications to find the one you need easily."
      />
    </div>
  );
};

export default Features;
