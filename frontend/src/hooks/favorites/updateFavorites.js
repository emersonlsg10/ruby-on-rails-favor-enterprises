import axios from 'axios';

const updateFavorites = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.put(
        `http://127.0.0.1:3001/api/v1/enterprises/${data.id}`, data
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};
export default updateFavorites;
