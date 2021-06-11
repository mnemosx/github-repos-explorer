/* Remove duplicate values leaving the newest ones.  */
const dedupe = (list) => {
  return list
    .slice()
    .reverse()
    .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);
};

const sort = (list) => list.sort((a, b) => a.time > b.time ? -1 : b.time > a.time ? 1 : 0);

export const updateSearchHistory = (newVal) => {
  let searchHistorySaved = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];

  searchHistorySaved.push({ value: newVal, time: Date.now() });

  /* FIXME: Perhaps duplicate prevention should be handled while pushing new value to array.  */
  let searchHistoryDeduped = dedupe(searchHistorySaved);
  let searchHistorySorted = sort(searchHistoryDeduped);

  // Keep only 15 newest entries
  if (searchHistorySorted.length > 15) {
    searchHistorySorted.pop();
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistorySorted));
};
