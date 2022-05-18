const closeWindow = function () {
  document.querySelector('.nick_div').classList.add('disappear');
};

/////////////////////////
//close window
document.querySelector('.btn-close').addEventListener('click', closeWindow);
document.querySelector('.btn-send').addEventListener('click', closeWindow);

/////////////////////////
//pop window
document
  .querySelector('.btn-change-nick-name')
  .addEventListener('click', function () {
    document.querySelector('.nick_div').classList.remove('disappear');
  });
