const renderChangePassword = async (req, res) => {
  try {
    res.render('change_password', {
      layout: 'patient_template',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  renderChangePassword,
};
