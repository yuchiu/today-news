/* state selectors */
const getSearchNewsResult = state => state.newsReducer.searchNewsResult;

const getSearchIsLoading = state => state.searchReducer.isLoading;

export { getSearchNewsResult, getSearchIsLoading };
