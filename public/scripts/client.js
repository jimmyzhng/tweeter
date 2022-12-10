// Preventing XSS with Escaping
const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Takes in a tweet object and responsible for returning a tweet <article> element
const createTweetElement = function(tweetData) {
  return `<article class="tweet">
  <article class="tweet-header">

    <div class="tweet-pfp">
      <img id="pfp" src="${tweetData.user.avatars}" />
      <span class="full-name">${tweetData.user.name}</span>
    </div>

    <span class="username">${tweetData.user.handle}</span>
  </article>

  <span class="tweet-text">
  ${escapeText(tweetData.content.text)}
  </span>

  <article class="tweet-footer">
    <span class="days-ago"> ${timeago.format(tweetData.created_at)} </span>
    <div class="like-repost">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>

  </article>
</article>`;
};


const renderTweets = function(tweets) {
  $('.tweets').empty();
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $('.tweets').prepend(newTweet);
  }
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    });

};

// Test / driver code (temporary)
$(document).ready(function() {
  console.log('READY!');

  $('form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $('#error').css('display', 'none');

    // Check if tweet works
    const tweet = formData.slice(5);

    if (!tweet) {
      $('#error')
        .html('<i class="fa-solid fa-circle-exclamation"> </i> Error! No tweet found.')
        .hide();

      return $('#error').slideDown('fast', () => console.log('success'));
    }

    if (tweet.length > 140) {
      $('#error')
        .html('<i class="fa-solid fa-circle-exclamation"> </i> Error! That tweet is too long.')
        .hide();

      return $('#error').slideDown('fast', () => console.log('Sucess. no tweet found'));
    }

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: formData,
      success: (event) => {
        loadTweets();
      }
    })
      .then(() => { $('#tweet-textbox').val(''); });

  });
  loadTweets();
});

