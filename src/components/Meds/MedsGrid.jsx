import MedsItem from './MedsItem';
import classes from './MedsGrid.module.css';

const MedsGrid = ({ meds }) => {
  return (
    <ul className={classes.grid}>
      {meds.map((med) => (
        <MedsItem key={med.id} name={med.name} href={`/meds/${med.slug}`} />
      ))}
    </ul>
  );
};

export default MedsGrid;
