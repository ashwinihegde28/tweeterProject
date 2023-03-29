/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => {
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
        <span>${tweet.created_at}</span>
        <div class="bottom-icons fa-sharp fa-solid">
          <i class=" fa-flag"></i>
          <i class="fa-retweet"></i>
          <i class="fa-heart"></i>
        </div>
      </footer>
    </article>`);

    return $tweet;
  };

  console.log(renderTweets(data));
});
