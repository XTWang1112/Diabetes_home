//////////////////////////////////////////////
//make movile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//////////////////////////////////////////////
//patient dashboard date time
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var year = new Date().getFullYear();
var month = new Date().getMonth();
var date = new Date().getDate();
var day = new Date().getDay();

const dt = document.querySelector(".record-date");
dt.textContent = days[day] + " " + date + " " + months[month] + " " + year;

const compareDateTime = function (date) {
  if (date < new Date()) console.log(`${date} is past`);
  else console.log(`${date} is not past`);
};

compareDateTime(new Date(2021, 3, 24));
