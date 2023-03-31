/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(() => {
  //onload of the form hide the error segment
  $(".tweet-error-section").hide();

  const $errorMessage = $(".error-message");

  // handling new tweet form submit
  $("form").submit(function (event) {
    // On click of submit button prevent page refreshing
    event.preventDefault();
    $(".tweet-error-section").slideUp();
    const inputText = $("#tweet-text").val();

    if (!inputText) {
      $(".tweet-error").text("Tweet cannot be empty!");
      $(".tweet-error-section").slideDown();
      return;
    }

    //input characters cannot exceed 140
    if (inputText.length > 140) {
      $(".tweet-error").text("Tweet cannot exceed 140 characters!");
      $(".tweet-error-section").slideDown();

      $errorMessage.slideDown(300);
      return;
    }

    
    $.ajax({
      method: "Post",
      url: "/tweets",
      type: "application/json",
      data: { text: inputText },
      success: function (data) {
        // Create a new tweet element with the data returned from the server
        const $tweet = loadTweets();

        // Append the new tweet to the top of the tweet list
        $("#tweet-section").prepend($tweet);

        // Reset the form to clear the previously entered data and also set the word count to 140
        $(event.target).trigger("reset");
        $(event.target).find(".counter").text("140");
      },
      //If Error
      error: function (err) {
        console.error(err);
      },
    });
  });
  loadTweets();
});

const renderTweets = function (tweets) {
  // loops through tweets (array of objects)
  for (tweet of tweets) {
    // calls createTweetElement for each tweet and append it to teetContainer and return it
    $("#tweet-section").prepend(createTweetElement(tweet));
  }
  return;
};

const createTweetElement = function (tweet) {
  const { user } = tweet;
  let $tweet = $(`
    <article class="tweet">
      <header class="containers">
        <span>
          <img src=${user.avatars} class="avatar"></img> ${user.name}
        </span>
        <span>${user.handle}</span>
      </header>
    
      <p class="tweet-description">${escape(tweet.content.text)}
      </p>
      <footer class="bottom-container containers">
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="bottom-icons fa-sharp fa-solid">
          <i class=" fa-flag"></i>
          <i class="fa-retweet"></i>
          <i class="fa-heart"></i>
        </div>
      </footer>
    </article>`);

  return $tweet;
};

// client-side JavaScript will use AJAX to fetch (GET) data from the server
const loadTweets = function () {
  $.ajax({
    method: "Get",
    url: "http://localhost:8080/tweets",
    type: "application/json",
    success: renderTweets,
    error: function (err) {
      console.error(err);
    },
  });
};
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
