import Search from './models/Search';
import * as searchView from './views/searchView'
import {
    elements, renderLoader, clearLoader
} from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {

    // 1. get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. preapere UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. search for recipes
        await state.search.getResults();

        // 5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// on click recipes list shows next/prev page ( next 10 pecipes)
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10); // base 10: 0 - 9
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});