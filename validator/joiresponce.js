module.exports.serverError = (req, res, error) => {

    let response = {
      status: 500,
      error: error
    };

    return res.send(response);
  };


module.exports.clientError = (req, res, error) => {
    let response = {
      status: 400,
      error: error.details[0].message
    };

    return res.send(response);
  };