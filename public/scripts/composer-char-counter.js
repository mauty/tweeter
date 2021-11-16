const log = console.log

$(document).ready(function() {
  // console.log('hello')
  // const tweetText = $('#tweet-text')
  // log(tweetText[0]);
  // const counter = $('.counter')
  // let counterNum = counter.val()
  // log(counterNum)
  // tweetText.on('keypress', () => {
  //   counterNum = counterNum - 1;
  //   log(counterNum)
  

  $('#tweet-text').on("input", function(){
    let maxlength = $(this).attr("maxlength");
    let currentLength = $(this).val().length;
    log(currentLength)
    let charsRemaining = 0;
    charsRemaining = 140 - currentLength;
    if( currentLength >= 140 ) {
        $('output').val(charsRemaining).addClass('red');

    } else {
        $('output').val(charsRemaining).removeClass('red');
    }

});


});