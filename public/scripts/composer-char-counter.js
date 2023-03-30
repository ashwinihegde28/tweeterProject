$(document).ready(function () {
  //$(this).next().find('.counter') -- other way to serch the id, just for reference
  const counter = $(".counter");
  $("#tweet-text").on("input", function (event) {
    // post error when we type error msg must be hidden.
    $(".tweet-error-section").slideUp();
    const count = $(this).val().length;
    const remChar = 140 - count;
    if (remChar < 0) {
      console.log(`Char exceeded limit by ${Math.abs(remChar)}`);
      counter.addClass("counter-negative");
    } else {
      counter.removeClass("counter-negative");
    }
    //To display the remaining characters
    counter.text(remChar);
  });
});
