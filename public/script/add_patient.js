const closeWindow = function () {
  document.querySelector('.account-password').classList.add('disappear');
  document.querySelector('.overlay').classList.add('disappear');
};

/////////////////////////
//close message window
document.querySelector('.btn-close').addEventListener('click', closeWindow);
document.querySelector('.overlay').addEventListener('click', closeWindow);

/////////////////////////
//pop message window
if (document.querySelector('.password').textContent.length > 0) {
  document.querySelector('.account-password').classList.remove('disappear');
  document.querySelector('.overlay').classList.remove('disappear');
}
