
$(document).ready(function() {
  console.log('ready!');


  $('textarea').on('input', function() {
    let counter = $('.counter');
    let charCount = 140 - $(this).val().length;

    counter.val(charCount);

    if (charCount < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }

  });

  $('article.tweet')
    .mouseover(function() {
      $(this).css('box-shadow', '5px 5px 5px #747487');
    })
    .mouseleave(function() {
      $(this).css('box-shadow', '0px 0px 0px black');
    });

  $('i.fa-solid')
    .mouseover(function() {
      $(this).css('color', '#D69400');
    }).mouseleave(function() {
      $(this).css('color', '#4056a1');
    });

});
