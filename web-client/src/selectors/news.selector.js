/* state selectors */
const getNewsList = state => state.newsReducer.newsList;

const getOffsetIndex = state => state.newsReducer.offsetIndex;

const getNewsIsLoading = state => state.newsReducer.isLoading;

export { getNewsList, getOffsetIndex, getNewsIsLoading };
