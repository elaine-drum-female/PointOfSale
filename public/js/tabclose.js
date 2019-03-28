//
// Let the dust settle before getting started.
//
$(document).ready(function() {

  // Create callback for click on the left button
  $("#close-top-button-return").click(function(event) {
    location.href = "/main";
  });

  // Create callback for click on the done button
  $("#close-top-button-done").click(function(event) {
    location.href = "/";
  });

  // Create callback for click on the close button
  $("#close-top-button-print").click(function(event) {
      $("#myModal").modal("show");
  });
});