const error = (err, req, res, next) => {
  console.log(`${err}`.red);

  res.status(500).json({
    message: 'Something went wrong, try again later'
  });
};

module.exports = error;
