import axios from 'axios';

const getFavorites = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `http://127.0.0.1:3001/api/v1/enterprises`,
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};
export default getFavorites;
