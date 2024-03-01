'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';

const BASE_URI = 'https://pixabay.com/api/';
const KEY = '42459298-1821cc9c9c9d24f5ec127ca7c';

const fetchImages = async (userInput, page = 1, perPage = 15) => {
    const searchLink = `${BASE_URI}?key=${KEY}&q=${userInput}&image-type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
        const response = await axios.get(searchLink);
        console.log(response);
        if (!response.data.hits || response.data.hits.length === 0) {
            iziToast.show({
                message: "Sorry, there are no images matching your search query. Please try again!",
                messageColor: '#FAFAFB',
                backgroundColor: '#EF4040',
                iconColor: '#FAFAFB',
                position: "topRight",
                theme: 'dark',
            });
        }
        return response.data.hits;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Image error!');
    }

};

export default fetchImages;
