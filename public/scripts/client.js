/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// Fake data taken from initial-tweets.json
$(document).ready(() => {
  //onload of the form hide the error segment
  $(".tweet-error-section").hide();

  const $errorMessage = $(".error-message");

  const renderTweets = function (tweets) {
    // loops through tweets (array of objects)
    for (tweet of tweets) {
      // calls createTweetElement for each tweet and append it to teetContainer and return it
      $("#tweet-section").append(createTweetElement(tweet));
    }

    // takes return value and appends it to the tweets container
    return;
  };

  const createTweetElement = function (tweet) {
    const user = tweet.user;
    let $tweet = $(`
    <article class="tweet">
      <header class="containers">
        <span>
          <img src=${user.avatars} class="avatar"></img> ${user.name}
        </span>
        <span>${user.handle}</span>
      </header>
    
      <p class="tweet-description">${tweet.content.text}
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

  // handling new tweet form submit
  $("form").submit(function (event) {
    // On click of submit button prevent page refreshing
    event.preventDefault();
    $(".tweet-error-section").hide();
    inputText = $("#tweet-text").val();

    if (!inputText) {
      $(".tweet-error-section").show();
      $(".tweet-error").text("Tweet cannot be empty!");
    }

    //input characters must cannot exceed 140
    if (inputText.length > 140) {
      $(".tweet-error-section").show();
      $(".tweet-error").text("Tweet cannot exceed 140 characters!");
    }

    event.preventDefault();
    const dataObj = {
      text: $(this).find("textarea").val(),
    };
    // method = post
    $.ajax({
      method: "Post",
      url: "/tweets",
      type: "application/json",
      data: dataObj,
    });
  });
  // client-side JavaScript will use AJAX to fetch (GET) data from the server
  const loadTweets = function () {
    $.ajax({
      method: "Get",
      url: "http://localhost:8080/tweets",
      type: "application/json",
      success: renderTweets,
      error: (jqXHR, textStatus, errorThrown) => {
        console.log("Error =>", { jqXHR, textStatus, errorThrown });
      },
    });
  };

  loadTweets();
});
