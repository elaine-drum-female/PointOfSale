//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Local storage
  var posSystem = JSON.parse(localStorage.getItem("posSystem"));

  // Get the current list of open tabs
  $.ajax("/api/gettabs", {
    type: "GET",
    success: function(resp) {
      posSystem.openTabs = [];
      var mainDiv = $(".tablist-page");
      for (var i = 0; i < resp.length; i++) {
        if (resp[i].open === true) {
          var tabDiv = $("<div class='tab-div'>");
          var button = $("<button class='btn btn-default tab-button'>");
          var p = $("<p class='tab-label'>");
          var span = $("<span class='tab-label tab-name'>");
          $(button).text("Bar Left");
          $(button).attr("data-table-number", resp[i].id);
          $(p).text(resp[i].id);
          $(span).text(resp[i].tab_name);
          $(button).append(p);
          $(tabDiv).append(button);
          $(tabDiv).append(span);
          $(mainDiv).append(tabDiv);
          resp[i].items = [];
          console.log(resp[i]);
          posSystem.openTabs.push(resp[i]);
        }
      }
      // Set click handler for the tab buttons
      $(".tab-button").mousedown(tabButtonClicked);
      // Update local storage
      localStorage.setItem("posSystem", JSON.stringify(posSystem));
    },
    error: function(req, status, err) {
      $("#message-area").text("Something went wrong: ", status, err);
    }
  });

  // Call back function when a tab button is clicked
  function tabButtonClicked(event) {
    posSystem.currentTabID = $(this).data("table-number");
    console.log("current tabid=" + posSystem.currentTabID);
    localStorage.setItem("posSystem", JSON.stringify(posSystem));
    location.href = "/main";
  }

  // Create callback for click on the exit button
  $("#button-exit").click(function(event) {
    location.href = "/";
  });

  // Create callback for click on the New Tab button
  $("#button-new-tab").click(function(event) {
    location.href = "/newtab";
  });
});
