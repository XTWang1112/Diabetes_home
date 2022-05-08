const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAllNotes = async (req, res) => {
  res.render('All_notes');
};

module.exports = {
  renderAllNotes,
};
