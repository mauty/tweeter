/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  // Create HTML for new Tweet
  const createTweetElement = (data) => {
    const tweetMarkup = `
    <article class="tweet">
      <header>
        <img src="${data.user.avatars}">
        <h2>${data.user.name}</h2>
        <h3>${data.user.handle}</h3>
      </header>
      <p>${data.content.text}</p>
      <hr>
      <footer>
        <div class="time">${timeago.format(data.created_at)}</div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </footer>
    </article>
    `;
    return tweetMarkup;
  };

  // Iterate to render all tweets
  const renderTweets = (tweets) => {
    for (let tweetItem of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweetItem));
    }
  };

  // Get tweets from database
  const loadTweets = () => {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };
  
  // Helper escape function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Sets error message to be hidden initially
  $('#error').hide();

  // Loads Initial Tweets
  loadTweets();
  
  // Click handler to focus text box
  $('#new-tweet-button').on('click', (event) => {
    event.preventDefault();
    $('#tweet-text').focus();
  });

  // Submit handler to check for errors and post tweet data
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    if (tweetText.length > 140) {
      $('#error').show();
      $('#error-message').text("Please make your tweet shorter or our servers will explode. You've been warned.");
      return;
    }
    if (tweetText.length === 0) {
      $('#error').show();
      $('#error-message').text("Really? You've got nothing to say? Come on, get writing...");
      return;
    }
    // Escape text before posting
    const text = `<p>${escape(tweetText)}</p>`;
    const posting = $.post("/tweets", {text}, () => {
      posting.then(loadTweets());
      // Resets text input box
      $('#tweet-text').val('');
      $('.counter').val('140');
      $('#error').hide();
      return;
    });
  });

});