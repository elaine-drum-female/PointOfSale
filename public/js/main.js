//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Create callback for click on the new tab button
  $("#top-button-new-order").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Load the new tab page
    location.href = "/newtab";
  });

  // Create callback for click on the left button
  $("#top-button-left").click(function(event) {
    location.href = "/tablist";
  });

  // Create callback for click on the done button
  $("#top-button-done").click(function(event) {
    location.href = "/";
  });

  // Create callback for click on the close button
  $("#bottom-button-close").click(function(event) {
    location.href = "/tabclose";
  });
});
