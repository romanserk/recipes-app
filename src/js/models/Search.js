import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // recive API without domain
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        // the API key from www.food2fork.com
        const key = 'cb83c520e8a0a51cbce156c79205a1b7';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
        
    }
}





