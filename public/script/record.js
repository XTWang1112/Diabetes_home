//////////////////////////////////////////////
//blood_glucose message window
//pop window
document.querySelector('.btn--done').addEventListener('click', function () {
  if (document.getElementById('data').value.length !== 0) {
    // document.querySelector(".record-success").classList.remove("hidden");
    alert('You have successfully record your data, keep going! 💪');
    location.href = '/patient';
  }
});
