import { createSelector } from "reselect";

/* state selectors */
export const getRawSearchNewsResult = state =>
  state.searchReducer.searchNewsResult;

export const getSearchIsLoading = state => state.searchReducer.isLoading;

/* derived selectors */
export const getIsSearchNotFound = createSelector(
  getRawSearchNewsResult,
  getSearchIsLoading,
  (searchNewsResult, isLoading) => {
    let isSearchNotFound;
    if (!searchNewsResult.length && !isLoading) return true;
    return false;
  }
);

export const getSearchNewsResult = createSelector(
  getRawSearchNewsResult,
  searchNewsResult =>
    searchNewsResult.map(resultItem => {
      const newResultItem = { ...resultItem._source };
      delete newResultItem._index;
      delete newResultItem._source;
      delete newResultItem._type;
      delete newResultItem._score;
      delete newResultItem._id;
      return newResultItem;
    })
);
