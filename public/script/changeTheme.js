function renderCurrrentColor() {
  let arr = document.cookie.split("=");
  currentColor = arr[arr.length - 1];
  if (currentColor === "green") {
    document.documentElement.style.setProperty('--light_color', '#7dbc57');
    document.documentElement.style.setProperty('--dark_color', '#2d5215');
    document.documentElement.style.setProperty('--bg_color', '#eaf4e4');
  } else if (currentColor === "blue") {
    document.documentElement.style.setProperty('--light_color', '#5e8db7');
    document.documentElement.style.setProperty('--dark_color', '#202b5a');
    document.documentElement.style.setProperty('--bg_color', '#CBE2F8');
  } else {
    document.documentElement.style.setProperty('--light_color', '#7dbc57');
    document.documentElement.style.setProperty('--dark_color', '#2d5215');
    document.documentElement.style.setProperty('--bg_color', '#eaf4e4');
  }
}
renderCurrrentColor();

function changeTheme(id) {
  // setting ajax request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', "/patient/"+ id + "/changeTheme");
  // Set the request header so that the requestor can read urlencoded data
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send("colorchange=blue"); 
  let themeColor; 
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        themeColor = xhr.response;
        var now=new Date();
        now.setDate(now.getDate()+1);
        document.cookie = "currentColor="+themeColor+";expires="+now.toString()+";path=/";
        if (themeColor === "green") {
          document.documentElement.style.setProperty('--light_color', '#7dbc57');
          document.documentElement.style.setProperty('--dark_color', '#2d5215');
          document.documentElement.style.setProperty('--bg_color', '#eaf4e4');
          document.documentElement.style.setProperty('--first_color', '#7BBA55');
          document.documentElement.style.setProperty('--second_color', '#85C75D');
          document.documentElement.style.setProperty('--third_color', '#9FD472');
          document.documentElement.style.setProperty('--bar_color', '#C3DCB3');
        } else if (themeColor === "blue") {
          document.documentElement.style.setProperty('--light_color', '#5e8db7');
          document.documentElement.style.setProperty('--dark_color', '#202b5a');
          document.documentElement.style.setProperty('--bg_color', '#CBE2F8');
          document.documentElement.style.setProperty('--first_color', '#2264B1');
          document.documentElement.style.setProperty('--second_color', '#5384BE');
          document.documentElement.style.setProperty('--third_color', '#668EBC');
          document.documentElement.style.setProperty('--bar_color', '#A2C7ED');
        } else {
            console.log("not change the theme.")
        }

      }
    }
  }
}