import React from "react";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var SearchBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      defaultQuery: "",
      query: "",
      onSearch: function() {},
      onQueryChange: function() {}
    };
  },

  getInitialState() {
    return {
      query: this.props.query || this.props.defaultQuery
    };
  },

  blur() {
    this.refs.searchInput.getDOMNode().blur();
  },

  onSubmit(evt) {
    evt.preventDefault();
    this.blur();
    this.props.onSearch(this.state.query);
  },

  clearSearch() {
    this.setState(
      { query: this.props.defaultQuery },
      () => this.props.onSearch(this.state.query)
    );
  },

  onQueryFocus() {
    this.setState({
      dropdownVisible: true
    });
  },

  onQueryBlur() {
    this.setState({ dropdownVisible: false });
  },

  onQueryChange(evt) {
    this.setState({ query: evt.target.value });
  },

  render() {
    return (
      <div className="search">
        <form className="form-horizontal" ref="searchForm" onSubmit={this.onSubmit}>
          <div>
            <input type="text" className="search-input form-control"
              placeholder={this.props.placeholder}
              name="query"
              ref="searchInput"
              autoComplete="off"
              value={this.state.query}
              onBlur={this.onQueryBlur}
              onChange={this.onQueryChange}
              />
            <span className="icon-search" />
            {this.state.query !== this.props.defaultQuery &&
              <div>
                <a className="search-clear-form" onClick={this.clearSearch}>
                  <span className="icon-circle-cross" />
                </a>
              </div>
            }
          </div>
        </form>
      </div>
    );
  }
});

export default SearchBar;
