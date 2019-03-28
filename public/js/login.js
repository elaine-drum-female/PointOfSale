//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Variable to hold the employee id
  var empId = "";

  // Create callback for click on a number button
  $(".button-number").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Build employee id
    empId += $(this).text();
    console.log("button-number: empId=" + empId);
  });

  // Create callback for click on the clear button
  $("#button-clear").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    // Clear employee id
    empId = "";
    console.log("button-clear: empId=" + empId);
  });

  // Create callback for click on the exit button
  $("#button-exit").click(function(event) {
    // Clear message area
    $("#message-area").text("");
    console.log("button-exit: clicked.");
    // Load the splash page
    location.href = "/";
  });

  // Create callback for click on the ok button
  $("#button-ok").click(function(event) {
    // Clear message area
    $("#message-area").text("");

    console.log("button-ok: empId=" + empId);

    // Make sure we a have an employee number
    if (empId.length === 0) {
      $("#message-area").text("Please enter your employee id.");
      return;
    }

    //
    // Ajax call to authenticate the employeee
    //

    // Clear employee id
    empId = "";
    location.href = "/tablist";
  });
});
