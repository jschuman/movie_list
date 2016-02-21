import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchMovies } from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event){
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event){
    event.preventDefault();

    // go search movie data
    this.props.searchMovies(this.state.term);

  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for your favorite movies"
          className="form-control search-input"
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary search-btn">Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchMovies }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
