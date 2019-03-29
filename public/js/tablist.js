//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Create callback for click on a tab button
  $(".tab-button").click(function(event) {
    location.href = "/main";
  });

  // Create callback for click on the exit button
  $("#button-exit").click(function(event) {
    location.href = "/";
  });

  // Create callback for click on the New Tab button
  $("#button-new-tab").click(function(event) {
    location.href = "/newtab";
  });
});
