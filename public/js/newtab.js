//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Local storage
  var posSystem = JSON.parse(localStorage.getItem("posSystem"));

  // Tab object
  var tabObject = {};

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
    // Format tab name
    var tab = tabName.join("").trim();

    // Ensure we have a tab name
    if (tab.length === 0) {
      $("#message-area").text("Please enter a tab name.");
      return;
    }

    // New tab object
    var newTab = {
      tab_name: tab,
      items_ordered: "",
      sub_total: 0,
      tip: 0,
      total: 0,
      open: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create a new tab
    $.ajax("/api/newtab", {
      type: "POST",
      data: newTab,
      success: function(resp) {
        console.log(resp);
        tabObject.tabId = resp.tabId;
        tabObject.tabName = resp.tabName;
        tabObject.items = [];
        posSystem.openTabs.push(tabObject);
        localStorage.setItem("posSystem", JSON.stringify(posSystem));
        location.href = "/tablist";
      },
      error: function(req, status, err) {
        $("#message-area").text("Something went wrong: ", status, err);
      }
    });
  });
});
