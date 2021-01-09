const API_KEY = '19813878-66abafb147b791a25f56ab6fb';
const BASE_URL = 'https://pixabay.com/api';
// const options = { headers: { Authorization: API_KEY, }, };

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            });
    }
    
    incrementPage() {
            this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}