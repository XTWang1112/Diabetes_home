const req = require('express/lib/request');
const res = require('express/lib/response');

const renderAllNotes = async (req, res) => {
  try {
    res.render('All_notes');
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderAllNotes,
};
