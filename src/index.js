import $ from "jquery";
import "./css/style.css";

let data_array = [];

$(document).ready(function () {
  $.ajax(
    "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
  )
    .then(function (data) {
      for (let i in data) {
        data_array.push({
          login: data[i].login,
          contributions: data[i].contributions,
          avatar_url: data[i].avatar_url,
          company: "",
          location: "",
          email: "",
        });
      }
    })
    .then(function () {
      for (let i in data_array) {
        $.ajax("https://api.github.com/users/" + data_array[i].login)
          .then(function (data) {
            data_array[i].company = data.company;
            data_array[i].location = data.location;
            data_array[i].email = data.email;
          })
          .fail(function (result) {
            console.log(result);
          });
      }
      sort_by_name(data_array);
    })
    .fail(function (result) {
      $(".box-user").text("Error : " + result);
    });

  console.log(data_array);
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
      $(".box-user").append(makeForm(data_array[i].avatar_url));
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
  return `<div class="info-block">
      <div class="user-block">
        <img class="user-block__img" src=${data.avatar_url}>
        <div class="user-block__user-name">${data.login}</div>
        <div class="user-block__status ${status}">$</div>
      </div>
      <div class="info">
        <input class="info-block" type="text">${data.location}</input>
      </div>
    </div>`;
};
