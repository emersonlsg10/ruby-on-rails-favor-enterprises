import axios from 'axios';

const token = 'VDqfisFJS9-8yiLluw3fvII-lILi7WjHNjDGAg9jMbU';

const callBuildings = (page = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `https://www.orulo.com.br/api/v2/buildings?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};
export default callBuildings;
