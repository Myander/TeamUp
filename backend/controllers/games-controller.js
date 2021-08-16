const axios = require('axios');

const getGames = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.rawg.io/api/games?page_size=25&key=25b4d5b424a243bdb3d34fcc2ec2807d',
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
    const result = await axios.request(options);
    console.log(result.data.results.length);
    res.status(200).json({ games: result.data });
  } catch (error) {
    console.log(error);
  }
};

exports.getGames = getGames;
