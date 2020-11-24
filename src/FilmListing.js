import FilmRow from './FilmRow'
import React, { Component } from 'react'

class FilmListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: 'all',
            page: 1
        }
    }
    handleFilterClick = (filter) => {
        this.setState({
            filter: filter
        })
    }
    showLastPage = () => {
        if (this.state.page >= 2){

            this.props.getFilms(this.state.page - 1)
            this.setState({
                page: this.state.page - 1
            })
        }
    }
    showNextPage = () => {
        this.props.getFilms(this.state.page + 1)
        this.setState({
            page: this.state.page + 1
        })
    }
    render() {
        let showFilms = this.props.films
        if (this.state.filter === "faves") {
            showFilms = this.props.faves
        } else {
            showFilms = this.props.films
        }
        const allFilms = showFilms.map((film) => {
            return (
                <FilmRow
                    film={film}
                    key={film.id}
                    onFaveToggle={() => this.props.onFaveToggle(film)}
                    isFave={this.props.faves.includes(film)}
                    handleDetailsClick={this.props.handleDetailsClick}
                />
            )
        })

        return (
            <div className="film-list">
                <h1 className="section-title">FILMS</h1>
                <div className="film-list-filters">
                    <div className={`film-list-filter ${this.state.filter === 'all' ? 'is-active' : ''}`}
                        onClick={() => this.handleFilterClick('all')}>
                        ALL
                        <span className="section-count">{this.props.films.length}</span>
                    </div>
                    <div className={`film-list-filter ${this.state.filter === 'faves' ? 'is-active' : ''}`}
                        onClick={() => this.handleFilterClick('faves')}>
                        FAVES
                    <span className="section-count">{this.props.faves.length}</span>
                    </div>
                </div>
                <div className="pagination">
                    <div onClick={this.showLastPage}>
                        <span className="material-icons">
                            arrow_back_ios
                    </span>
                    </div>
                    <div onClick={this.showNextPage}>
                        <span className="material-icons">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>

                {allFilms}
            </div>
        )
    }
}
export default FilmListing
