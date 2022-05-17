const toDate = function (number) {
  const date = new Date(number * 1);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const dates = document.querySelectorAll('.date');
for (let i = 0; i < dates.length; i++) {
  const inNumber = dates[i].textContent;
  const inString = toDate(inNumber);
  dates[i].textContent = inString;
}
