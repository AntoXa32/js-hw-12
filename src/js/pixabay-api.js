import axios from 'axios';

const API_KEY = '43780784-35e4285ec8f2021d0fe97b31d';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;
export const PER_PAGE = 15;

export const fetchPhotosByQuery = async (q = 'photo', newsPage) => {
  const searchParams = {
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: newsPage,
    per_page: PER_PAGE,
  };
  return axios.get('', { params: { ...searchParams } });
};
