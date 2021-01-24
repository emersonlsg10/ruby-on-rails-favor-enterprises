import axios from 'axios';

const createFavorites = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.post(
        `http://127.0.0.1:3001/api/v1/enterprises`, data
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};
export default createFavorites;
