import $ from "jquery";
import "./css/style.css";

let data_array = [];

$(document).ready(function () {
  $.ajax(
    "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
  )
    .then(function (data) {
      data_array = data;
      console.log(data_array);
      sort_by_name(data_array);
    })
    .fail(function (result) {
      $(".box-user").text("Error : " + result);
    });
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
      $(".box-user").append(
        form(
          data_array[i].avatar_url,
          data_array[i].login,
          data_array[i].contributions
        )
      );
    }
  }
});

$("#silver").click(function () {
  $(".box-user").empty();
  for (let i in data_array) {
    if (data_array[i].contributions < 20 && data_array[i].contributions >= 10) {
      $(".box-user").append(
        form(
          data_array[i].avatar_url,
          data_array[i].login,
          data_array[i].contributions
        )
      );
    }
  }
});

$("#gold").click(function () {
  $(".box-user").empty();
  for (let i in data_array) {
    if (data_array[i].contributions >= 20) {
      $(".box-user").append(
        form(
          data_array[i].avatar_url,
          data_array[i].login,
          data_array[i].contributions
        )
      );
    }
  }
});

const sort_by_name = () => {
  data_array.sort((a, b) =>
    a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
  );
  for (let i in data_array) {
    $(".box-user").append(
      form(
        data_array[i].avatar_url,
        data_array[i].login,
        data_array[i].contributions
      )
    );
  }
};

const sort_by_contributions = () => {
  data_array.sort((a, b) => (a.contributions < b.contributions ? 1 : -1));
  for (let i in data_array) {
    $(".box-user").append(
      form(
        data_array[i].avatar_url,
        data_array[i].login,
        data_array[i].contributions
      )
    );
  }
};

const form = (avatar, login, contributions) => {
  let status;
  if (contributions < 10) {
    status = "bronze";
  } else if (contributions < 20) {
    status = "silver";
  } else {
    status = "gold";
  }
  return `<div class="block">
      <div class="user-block">
        <img class="user-block__img" src=${avatar}>
        <div class="user-block__user-name">${login}</div>
        <div class="user-block__status ${status}">$</div>
      </div>
    </div>`;
};
