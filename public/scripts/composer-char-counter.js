const log = console.log

$(document).ready(function() {
  $('#tweet-text').on("input", function(){
    let currentLength = $(this).val().length;
    let charsRemaining = 0;
    charsRemaining = 140 - currentLength;
    if( currentLength > 140 ) {
        $('output').val(charsRemaining).addClass('red');

    } else {
        $('output').val(charsRemaining).removeClass('red');
    }
  });
});