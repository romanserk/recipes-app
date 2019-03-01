import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

/* exmple title : 
 * 'pasta with tomato and spinach'
 * 
 * reduce iteration example:
 * acc:0 / cur = pasta / curr.length = 5 / acc + curr.length = 5
 * newTitle = ['pasta']
 * acc:5 / cur = with / curr.length = 4 / acc + curr.length = 9
 * newTitle = ['pasta','with']
 * acc:9 / cur = tomato / curr.length = 6 / acc + curr.length = 15
 * newTitle = ['pasta','with','tomato']
 * acc:15 / cur = and / curr.length = 3 / acc + curr.length = 18
 * 18 is > then limit = 17 so next words do not includs into the newTitle
 */

const limitRecipeTile = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTile(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
};