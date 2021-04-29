const axios = require('axios');

const getGames = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.rawg.io/api/games?key=25b4d5b424a243bdb3d34fcc2ec2807d',
  };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  try {
    const res = await axios.request(options);
    console.log(res.data.results.length);
  } catch (error) {
    console.log(error);
  }
};

exports.getGames = getGames;
