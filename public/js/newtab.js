//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Array to hold the tabName
  var tabName = [];

  // Create callback for click on a character button
  $(".newtab-button-char").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Build tab name
    tabName.push($(this).text());
    $("#tab-name").text(tabName.join(""));
  });

  // Create callback for click on the space button
  $("#button-space").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Add space to tab name
    tabName.push(" ");
    $("#tab-name").text(tabName.join(""));
  });

  // Create callback for click on the clear button
  $("#button-clear").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Clear tab name
    tabName = [];
    $("#tab-name").text(tabName.join(""));
  });

  // Create callback for click on the back space button
  $("#button-backspace").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Remove last character
    tabName.splice(tabName.length - 1, 1);
    $("#tab-name").text(tabName.join(""));
  });

  // Create callback for click on the back space button
  $("#button-cancel").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    tabName = [];
    $("#tab-name").text(tabName.join(""));
    location.href = "/tablist";
  });

  // Create callback for click on the OK button
  $("#button-ok").click(function(event) {
    // Clear message area
    console.log("Tab name=" + tabName.join(""));

    // Ensure we have a tab name
    if (tabName.join("").trim().length === 0) {
      $("#message-area").text("Please enter a tab name.");
      return;
    }

    location.href = "/tablist";
  });
});
