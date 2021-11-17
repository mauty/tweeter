/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  // Test / driver code (temporary). Eventually will get this from the server.

  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];


  const renderTweets = (tweets) => {
    for (let tweetItem of tweets) {
      $('#tweets-container').append(createTweetElement(tweetItem));
    }
  };


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

  const loadTweets = () => {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };
   
  loadTweets()

  // renderTweets(tweetData);

  $('#compose-tweet').submit( (event) => {
    event.preventDefault();
    const text = $("#tweet-text").val();
    if (text.length > 140) {
      alert('tweet content too long')
    }
    const posting = $.post( "/tweets", {text}, () => {
      posting.then(loadTweets())
      $('#tweet-text').val('');
    });
  })

});