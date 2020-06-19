import $ from "jquery";
import "./css/style.css";

let data_array = [];
// let mode = true;

$(document).ready(() => {
  $.ajax(
    "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
  ).then(function (data) {
    let promises = [];
    for (let i in data) {
      promises.push(
      new Promise((resolve, reject) => {
      $.ajax("https://api.github.com/users/" + data[i].login)
        .then(function (user_data) {
          data_array.push({
            login: data[i].login,
            contributions: data[i].contributions,
            avatar_url: data[i].avatar_url,
            company: user_data.company,
            location: user_data.location,
            email: user_data.email,
          });
          // if (mode === true) {
            $(".box-user").append(makeForm(data_array[data_array.length - 1]));
          // }
          resolve();
        })
        .fail(function (error) {
          reject(error);
          // mode = false;
          // $(".box-user").text("Error : " + error);
        });
      })
      );
    }
    Promise.all(promises)
      .then(() => {
        // console.log("hello");
        // $(".box-user").empty();
        // $(".box-user").append(makeForm(data_array[data_array.length - 1]));
      })
      .catch(function (result) {
        // console.log("Error : " + result.company);
        $(".box-user").text("Error : " + result);
        $(".user-info").empty();
      });
  })
  .fail(() => {
    $(".box-user").text("Error : " + result);
    $(".user-info").empty();
  })
});

$("#name").click(function () {
  $(".box-user").empty();
  sort_by_name();
});
$("#contributions").click(function () {
  $(".box-user").empty();
  sort_by_contributions();
});

$("#all").click(function () {
  $(".box-user").empty();
  sort_by_name();
});

$("#bronze").click(function () {
  $(".box-user").empty();
  for (let i in data_array) {
    if (data_array[i].contributions < 10) {
      $(".box-user").append(makeForm(data_array[i]));
    }
  }
});

$("#silver").click(function () {
  $(".box-user").empty();
  for (let i in data_array) {
    if (data_array[i].contributions < 20 && data_array[i].contributions >= 10) {
      $(".box-user").append(makeForm(data_array[i]));
    }
  }
});

$("#gold").click(function () {
  $(".box-user").empty();
  for (let i in data_array) {
    if (data_array[i].contributions >= 20) {
      $(".box-user").append(makeForm(data_array[i]));
    }
  }
});

const sort_by_name = () => {
  data_array.sort((a, b) =>
    a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
  );
  for (let i in data_array) {
    $(".box-user").append(makeForm(data_array[i]));
  }
};

const sort_by_contributions = () => {
  data_array.sort((a, b) => (a.contributions < b.contributions ? 1 : -1));
  for (let i in data_array) {
    $(".box-user").append(makeForm(data_array[i]));
  }
};

const makeForm = (data) => {
  let status;
  if (data.contributions < 10) {
    status = "bronze";
  } else if (data.contributions < 20) {
    status = "silver";
  } else {
    status = "gold";
  }

  if (data.location === null) {
    data.location = "";
  }
  if (data.company === null) {
    data.company = "";
  }
  if (data.email === null) {
    data.email = "";
  }

  // console.log(data.location);
  return `<div class="info-block">
      <div class="user-block">
        <img class="user-block__img" src=${data.avatar_url}>
        <div class="user-block__user-name">${data.login}</div>
        <div class="user-block__status ${status}">$</div>
      </div>
      <div class="info">
        <div class="info__text">location</div>
        <input class="info__data" id="location" value="${data.location}" type="text">
        <div class="info__text">company</div>
        <input class="info__data" id="company" value="${data.company}" type="text">
        <div class="info__text">email</div>
        <input class="info__data" id="email" value="${data.email}" type="text">
      </div>
    </div>`;
};
