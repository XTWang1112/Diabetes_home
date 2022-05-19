const closeWindow = function () {
  document.querySelector('.support-message').classList.add('disappear');
  document.querySelector('.overlay').classList.add('disappear');
};

/////////////////////////
//close message window
document.querySelector('.btn-close').addEventListener('click', closeWindow);
document.querySelector('.btn-send').addEventListener('click', closeWindow);
document.querySelector('.overlay').addEventListener('click', closeWindow);

/////////////////////////
//pop message window
document
  .querySelector('.btn-send-message')
  .addEventListener('click', function () {
    document.querySelector('.support-message').classList.remove('disappear');
    document.querySelector('.overlay').classList.remove('disappear');
  });

/////////////////////////
//patient comment window
const btns = document.querySelectorAll('.btn-view-message');
btns.forEach((btn) => {
  btn.addEventListener('click', function () {
    document
      .querySelector('.patient-message-card')
      .classList.toggle('disappear');
  });
});
