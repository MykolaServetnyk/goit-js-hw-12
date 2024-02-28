'use strict'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const renderPhotoList = (images, galleryEl) => {
    if (images.length > 0) {
        const imageEl = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
            return `<li class="gallery-item">
                         <a class="link" href="${largeImageURL}">
                            <img
                            class="gallery-image"
                            src="${webformatURL}"
                            alt="${tags}"
                            data-source="${largeImageURL}"/>
                        <div class="desc">
                            <p class="likes">Likes ${likes}</p>
                            <p class="views">Views ${views}</p>
                            <p class="comments">Comments ${comments}</p>
                            <p class="downloads">Downloads ${downloads}</p>
                        </div>
                        </a>
                    </li>`;
        }).join('');

        galleryEl.insertAdjacentHTML('beforeend', imageEl);
        const lightbox = new SimpleLightbox('.gallery-item a');

        lightbox.refresh();
    } else {
        console.log('No images found. Please try a different search query.');
    }
}

export default renderPhotoList;



