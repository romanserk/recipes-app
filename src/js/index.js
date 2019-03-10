import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};


/**
 * SEARCH CONTROLLER
 */
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
        try {
            // 4. search for recipes
            await state.search.getResults();

            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('somethig went wrong with the search...');
            clearLoader();
        }

    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// on click recipes list shows next/prev page ( next 10 pecipes)
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // base 10: 0 - 9
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // get the id from the url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // prepare UI for changes

        // create new recipe object
        state.recipe = new Recipe(id);
        try { // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe

            console.log(state.recipe);
        } catch (error) {
            alert('Error prossesing recipe!')
        }
    }


}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));