import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const imagesGallery = document.querySelector('.gallery');

const gallery = galleryItems.map(item => {
  const galleryList = document.createElement('li');
  const link = document.createElement('a');
  const image = document.createElement('img');

  galleryList.classList.add('gallery__item');
  link.classList.add('gallery__link');
  image.classList.add('gallery__image');

  link.href = item.original;
  image.src = item.preview;
  image.dataset.source = item.original;
  image.alt = item.description;
  image.title = item.description;

  link.appendChild(image);
  galleryList.appendChild(link);
  return galleryList;
});

imagesGallery.append(...gallery);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
