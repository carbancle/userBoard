import React, { useEffect, useState } from 'react'
import MovieInfo from './MovieInfo';

// type Movies = {
//   id: number,
//   coverImg: string,
//   title: string,
//   summary: string,
//   genres: string
// }

const MovieList = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);

  // async await 를 사용하는 api 호출 함수
  const getMovies = async () => {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
    const json = await response.json();
    /* 
      위 response, json 을 다음과 같이 축약해서 표현할 수도 있음
      const json = await (
        await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
      ).json();
    */

    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, [])

  // 일반적인 api 호출 함수
  // useEffect(() => {
  //   fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMovies(json.data.movies)
  //       setLoading(false);
  //     });
  // }, [])

  console.log(movies);

  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <div className='container'>
          <div className="row">
            {movies.map((movie) => (
              <MovieInfo
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieList;