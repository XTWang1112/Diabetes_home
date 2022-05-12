const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAllComments = async (req, res) => {
  res.render('All_comments');
};

module.exports = {
  renderAllComments,
};
