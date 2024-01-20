import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../css/MovieOne.module.scss'

const MovieOne = () => {
  // movie 값을 any가 아닌 추론을 통해 type을 확인할 수 있는지..
  // 아래 코드는 에러 발생 movie 값은 MovieType 또는 undefined 일 수 있습니다.
  // interface MovieType {
  //   <T>(arr: T): T
  // }
  // const [movie, setMovie] = useState<MovieType>();

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);

  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <div className='container'>
          <section className="row">
            <article className={`${styles.col} "col"`}>
              <div className={styles.img}>
                <img style={{ minWidth: 300 }} src={movie.medium_cover_image} alt={movie.title} />
              </div>
              <div className={styles.title}><h1>{movie.title}</h1></div>
              <div className={styles.details}>
                <div className={styles.rating}><span>RATING:</span> {movie.rating}</div>
                <div className={styles.runtime}><span>RUNTIME:</span> {movie.runtime}</div>
                <div className={styles.genres}>{movie.genres.map((genre: string) => <p>{genre}</p>)}</div>
              </div>
            </article>
            <article className={`${styles.col} "col"`}>
              <div className={styles.description}>{movie.description_full}</div>
            </article>
          </section>
        </div>
      )}
    </div>
  )
}

export default MovieOne