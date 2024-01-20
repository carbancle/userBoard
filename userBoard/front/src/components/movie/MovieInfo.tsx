import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../css/Movie.module.scss';

type movies = {
  id: number,
  coverImg: string,
  title: string,
  summary: string,
  genres: string[]
}

const MovieInfo = ({ id, coverImg, title, summary, genres }: movies) => {
  return (
    <div className={`col-6 ${styles.col}`}>
      <Link to={`/movie/${id}`}>
        <div className={styles.card}>
          <img className={styles.img} src={coverImg} alt="" />
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
          <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
          <hr />
          <ul className={styles.genres}>
            {genres.map((g: any) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  )
}

export default MovieInfo