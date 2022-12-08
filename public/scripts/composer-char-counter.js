
$(document).ready(function() {
  console.log('ready!');


  $('textarea').on('input', function() {
    let counter = $(this).next().children('output');
    let charCount = 140 - $(this).val().length;

    counter.val(charCount);

    if (charCount < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }

  });

});
