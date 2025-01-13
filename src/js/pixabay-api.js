import axios from 'axios';

const API_KEY = '43780784-35e4285ec8f2021d0fe97b31d';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchPhotosByQuery = async (q = 'photo') => {
  const searchParams = {
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  };
  return axios.get('', { params: { ...searchParams } });
};
