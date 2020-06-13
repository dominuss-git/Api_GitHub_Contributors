import $ from "jquery";
import "./css/style.css";

$(document).ready(function () {
  $.ajax(
    "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
  )
    .then(function (data_array) {
      data_array.sort
      for (let i in data_array) {
        $(".box-user").append(form(data_array[i].avatar_url, data_array[i].login));
      }
    })
    .fail(function (result) {
      console.log(result);
    });
});

const form = (avatar, login) => {
  return (
    `<div class="block">
      <div class="user-block">
        <img class="user-block__img" src=${avatar}>
        <div class="user-block__user-name">${login}</div>
      </div>
    </div>`
  );
};
