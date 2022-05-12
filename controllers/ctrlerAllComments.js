const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAllComments = async (req, res) => {
  try {
    res.render('All_comments');
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderAllComments,
};
