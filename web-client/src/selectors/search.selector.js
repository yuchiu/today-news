/* state selectors */
const getSearchNewsResult = state => state.searchReducer.searchNewsResult;

const getSearchIsLoading = state => state.searchReducer.isLoading;

export { getSearchNewsResult, getSearchIsLoading };
