import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortMovies } from '../actions/index';
import MovieListItem from '../components/movie_list_item';

class MovieList extends Component {
  constructor(props){
    super(props);
  }

  onHeaderClick(key, evt){
    this.props.sortMovies(key);
  }

  renderSortIcon(sortKey){
    if (this.props.movies.length > 0 && this.props.sort.key === sortKey){
      let iconName = this.props.sort.order === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc';
      return <i className={`fa ${iconName}`}></i>;
    } else {
      return '';
    }
  }

  renderHeader(name){
    return (
      <th
        className={`header-${name}`}
        onClick={this.onHeaderClick.bind(this, name)}>
        {name}
        {this.renderSortIcon(name)}
      </th>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th />
            {this.renderHeader('Title')}
            {this.renderHeader('Year')}
          </tr>
        </thead>
        <tbody>
          {this.props.movies.map(movie =>
            <MovieListItem key={movie.imdbID} {...movie} />
          )}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ movies, sort }){
  let sortedMovies = movies.all.concat().sort(function(a,b){
    if (sort.order === 'asc'){
      return a[sort.key] > b[sort.key];
    } else {
      return a[sort.key] < b[sort.key];
    }
  });
  return {
    movies: sortedMovies,
    sort: sort };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortMovies }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
