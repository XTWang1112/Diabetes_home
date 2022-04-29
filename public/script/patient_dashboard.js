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
  if (date < new Date()) return false;
  else return true;
};

//////////////////////////////////////////////
//close comment
document
  .querySelector(".cross-button-icon")
  .addEventListener("click", function () {
    document.querySelector(".comments-div").classList.add("diappear");
  });

if (
  document.querySelector(".blood-glucos-data").textContent == "no data today"
) {
  console.log("hi");
  document.querySelector(".finish").style.display = "none";
  document.querySelector(".blood-glucos-data").style.fontSize = "3.2rem";
}
