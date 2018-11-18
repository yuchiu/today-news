import React from "react";
import PropTypes from "prop-types";

class SearchResultPanel extends React.Component {
  render() {
    const {
      isLoading,
      searchNewsResult,
      isSearchNotFound,
      searchTerm
    } = this.props;

    return (
      <div className="search-summary">
        <div className="search-summary__hint">
          Searching news related to <b>"{searchTerm}"</b>
        </div>
        {isLoading && <div className="search-summary__loading">Loading...</div>}
        {!isLoading &&
          searchTerm.length &&
          !isSearchNotFound && (
            <div className="search-summary__found">
              Found <b>{searchNewsResult.length}</b> related news
            </div>
          )}
        {isSearchNotFound && (
          <div className="search-summary__unfound">No News was found</div>
        )}
      </div>
    );
  }
}

SearchResultPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchNewsResult: PropTypes.array.isRequired,
  isSearchNotFound: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default SearchResultPanel;
