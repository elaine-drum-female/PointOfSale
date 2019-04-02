//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Local storage
  if (localStorage.getItem("posSystem")) {
    var posSystem = JSON.parse(localStorage.getItem("posSystem"));
  } else {
    var posSystem = {};
  }

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
    // Ajax call to authenticate the employee
    //
    var employee = {
      username: "XXXX", // User name not required - Validation is only on the employee id
      password: empId
    };

    $.ajax("/api/auth", {
      type: "POST",
      data: employee,
      success: function(resp) {
        console.log(resp);

        // Clear employee id
        empId = "";

        // Display message returned
        $("#message-area").text(resp.message);

        // Redirect to the tab list page
        if (resp.rc === 0) {
          posSystem.serverName = resp.serverName;
          posSystem.serverID = resp.serverID;
          posSystem.currentTabID = 0;
          posSystem.openTabs = [];
          localStorage.setItem("posSystem", JSON.stringify(posSystem));
          location.href = "/tablist";
        }
      },
      error: function(req, status, err) {
        $("#message-area").text("Something went wrong: ", status, err);
      }
    });
  });
});
