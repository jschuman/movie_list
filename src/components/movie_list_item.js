import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class MovieListItem extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onMovieClick() {
    this.context.router.push(`/movies/${this.props.imdbID}`);
  }

  render() {
    const posterImg = (this.props.Poster !== 'N/A' ? <img src={this.props.Poster} /> : '');

    return (
      <tr onClick={this.onMovieClick.bind(this)}>
        <td className='movie-Poster'>{posterImg}</td>
        <td className='movie-Title'>{this.props.Title}</td>
        <td className='movie-Year'>{this.props.Year}</td>
      </tr>
    );
  }
}
