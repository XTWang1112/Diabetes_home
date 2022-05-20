const req = require('express/lib/request');
const res = require('express/lib/response');

const recordModel = require('../models/record');

const renderAllComments = async (req, res) => {
  try {
    const allComments = await recordModel.aggregate([
      {
        $lookup: {
          from: 'patients',
          localField: 'patientObjectID',
          foreignField: '_id',
          as: 'patient',
        },
      },
      {
        $sort: { time: -1 },
      },
    ]);
    console.log(allComments);
    res.render('all_comments', {
      allComments,
    });
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
