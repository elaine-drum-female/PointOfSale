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
      // Create title
      $("#tab-title").text("Receipt for Mike");

      // Set Table id
      $("#tab-table-id").text("1002");
      // Set server
      $("#tab-server-name").text("Rachel");
      // Set Tab id
      $("#tab-id").text("0518631");
      // Set current time
      var currentTime = moment();
      $("#tab-date").text(currentTime.format("MM-DD-YYYY hh:mm:ss a"));

      // Set tab item details in div tab-items

      // Calcuate and set sub total

      // Calculate and set tax
      //https://www.calculatorsoup.com/calculators/financial/sales-tax-calculator.php

      // Calcuate and set Amount due

      // Show receipt dialog
      $("#myModal").modal("show");
  });
});