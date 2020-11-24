import React from 'react'
import Fave from './Fave'
import FilmPoster from './FilmPoster'

function FilmRow(props){

    const title = props.film.title
    const year = new Date(props.film.release_date).getFullYear()
    return (
        <div className="film-row" onClick={() => props.handleDetailsClick(props.film)}>
            <FilmPoster film={props.film} />
            <div className="film-summary">
                <h1>{title}</h1>
                <p>{year}</p>
            </div>
            <Fave onFaveToggle={props.onFaveToggle} isFave={props.isFave}/>
        </div>
    )

}

export default FilmRow
