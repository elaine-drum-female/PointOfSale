//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Local storage
  if (localStorage.getItem("posSystem")) {
    var posSystem = JSON.parse(localStorage.getItem("posSystem"));
  } else {
    var posSystem = {
      serverName: "Mike",
      serverID: 0,
      currentTabID: 0,
      openTabs: []
    };
    localStorage.setItem("posSystem", JSON.stringify(posSystem));
  }

  // Create callback for click on a number button
  $(".button-number").click(function(event) {
    event.preventDefault();
    // Clear message area
    $("#message-area").text("");
    // Build employee id
    $('[name="password"]').val($('[name="password"]').val() + $(this).text())
  });

  // Create callback for click on the clear button
  $("#button-clear").click(function(event) {
    event.preventDefault();
    // Clear message area
    $("#message-area").text("");
    // Clear employee id
    $('[name="password"]').val('');
  });

  // Create callback for click on the exit button
  $("#button-exit").click(function(event) {
    event.preventDefault();
    // Clear message area
    $("#message-area").text("");
    //console.log("button-exit: clicked.");
    // Load the splash page
    location.href = "/";
  });
});
