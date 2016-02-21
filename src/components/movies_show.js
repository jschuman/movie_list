import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchMovie } from '../actions/index';

class MoviesShow extends Component {

  constructor(props) {
    super(props);
    props.fetchMovie(this.props.params.id);
  }

  renderIMDBRating(rating){
    let className = 'success';
    if (rating < 5){
      className = 'danger';
    } else if (rating < 8) {
      className = 'primary';
    }

    return <span id='imdb_rating'>IMDB Rating: <span className={`label label-${className}`}>{rating}</span></span>;
  }

  render() {
    const { movie } = this.props;
    if (!movie) {
      return <div>Loading...</div>
    }

    const posterImg = (movie.Poster !== 'N/A' ? <img src={movie.Poster} /> : '');

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <h3>{posterImg}{movie.Title}</h3>
        <h6>{movie.Actors}</h6>
        <p>{movie.Year}</p>
        <p>MPAA Rating: {movie.Rated}</p>
        <p>{movie.Plot}</p>
        {this.renderIMDBRating(movie.imdbRating)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { movie: state.movies.movie };
}
export default connect(mapStateToProps, { fetchMovie })(MoviesShow);
