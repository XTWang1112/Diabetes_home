//////////////////////////////////////////////
//patient dashboard date time
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();
const day = new Date().getDay();

const dt = document.querySelector('.record-date');
dt.textContent = days[day] + ' ' + date + ' ' + months[month] + ' ' + year;

//////////////////////////////////////////////
//close comment
document
  .querySelector('.cross-button-icon')
  .addEventListener('click', function () {
    document.querySelector('.comments-div').classList.add('disappear');
  });

//////////////////////////////////////////////
//if finish

const data = document.querySelectorAll('.time-series');
const finish = document.querySelectorAll('.finish');
for (let i = 0; i < 4; i++) {
  if (isNaN(data[i].textContent)) {
    finish[i].classList.add('disappear');
  }
}
