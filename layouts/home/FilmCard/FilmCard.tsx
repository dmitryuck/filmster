import Film from '../../../server/interfaces/Film';
import styles from './FilmCard.scss';


interface Props {
  data: Film;
}

const FilmCard = (props: Props) => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.filmPoster} src={props.data.Poster} />
      <div className={styles.infoContainer}>
        <div>{props.data.Title}</div>
        <div>{props.data.Year}</div>
      </div>
    </div>
  );
}

export default FilmCard;