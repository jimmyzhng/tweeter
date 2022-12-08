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
  ${tweetData.content.text}
  </span>

  <article class="tweet-footer">
    <span class="days-ago"> ${tweetData.created_at} </span>
    <div class="like-repost">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </article>
</article>`;
};

const renderTweets = function(tweets) {
  let renderedTweets = tweets.map(tweet => createTweetElement(tweet));
  $('#tweets-container').append(renderedTweets);
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
  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();
    let formData = $(this).serialize();
    console.log(formData);

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: () => {
        console.log('Success!');
      }
    });

  });
});

