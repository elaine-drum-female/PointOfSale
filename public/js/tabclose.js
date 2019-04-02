//
// Let the dust settle before getting started.
//
// Calculate Tax
// https://www.calculatorsoup.com/calculators/financial/sales-tax-calculator.php
//

$(document).ready(function() {
  // Local storage
  var posSystem = JSON.parse(localStorage.getItem("posSystem"));

  // Tax rate
  const taxRate = 8.25;

  // Sub Total
  var subTotal = 0;

  // Total Tax
  var totalTax = 0;

  // Amount Due
  var amountDue = 0;

  // Get current tab index
  var currentTab = posSystem.openTabs.find(function(element) {
    return element.id === posSystem.currentTabID;
  });

  // Get current tab info
  getCurrentTab(currentTab);

  // Function to get current tab
  function getCurrentTab(tab) {

    $.ajax("/api/gettab/"+ tab.id, {
      type: "GET",
      success: function(resp) {
        console.log(resp);

        // Display tab orders
        displayTabOrders(resp);
      },
      error: function(req, status, err) {
        console.log("Something went wrong: ", status, err);
      }
    });
  }

  // Function to display tab orders
  function displayTabOrders(currentTab) {
    var totalPrice = 0;
    var mainDiv = $(".close-page-left");
    $(mainDiv).empty();
   
    if (currentTab.items_ordered.length > 0) {
      var currentItems = currentTab.items_ordered.split(";");
      console.log(currentItems);
      for (var i = 0; i < currentItems.length; i++) {
        var itemObj = currentItems[i].split(":");
        var itemDiv = $("<div class='close-item-detail cfix'>");
        var leftSpan = $("<span class='close-left-side'>");
        var rightSpan = $("<span class='close-right-side'>");        
        let price = parseInt(itemObj[1]);
        $(leftSpan).text(itemObj[0]);
        $(rightSpan).text(price.toFixed(2));
        $(itemDiv).append(leftSpan);
        $(itemDiv).append(rightSpan);
        $(mainDiv).append(itemDiv);
      }
    }
   
    // Display tab totals
    totalPrice += parseInt(currentTab.total);
    displayTabTotals(mainDiv, totalPrice);

  }
  
  // Function to display tab totals
  function displayTabTotals(mainDiv, totalPrice) {
    subTotal = totalPrice.toFixed(2);
    amountDue = parseFloat(totalPrice);

    itemDiv = $("<br><div class='main-item-detail cfix id='tab-subtotal-div'>");
    leftSpan = $("<span class='close-left-side'>");
    rightSpan = $("<span class='close-right-side' id='tab-subTotal'>");
    $(leftSpan).text("Subtotal");
    $(rightSpan).text(subTotal);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    totalTax = calculateSalesTax(totalPrice);
    amountDue += parseFloat(totalTax);
    amountDue = amountDue.toFixed(2);

    itemDiv = $("<div class='main-item-detail cfix'>");
    leftSpan = $("<span class='close-left-side'>");
    rightSpan = $("<span class='close-right-side' id='tab-total'>");
    $(leftSpan).text("Sales Tax");
    $(rightSpan).text(totalTax);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    itemDiv = $("<br><div class='main-item-detail cfix'>");
    leftSpan = $("<span class='close-left-side'>");
    rightSpan = $("<span class='close-right-side' id='tab-total'>");
    $(leftSpan).text("Total");
    $(rightSpan).text(amountDue);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    itemDiv = $("<div class='main-item-detail cfix'>");
    leftSpan = $("<span class='close-left-side'>");
    rightSpan = $("<span class='close-right-side' id='tab-balance-due'>");
    $(leftSpan).text("Balance Due");
    $(rightSpan).text(amountDue);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);
  }

  function calculateSalesTax(subTotal) {
    var salesTax = subTotal * taxRate / 100;
    return salesTax.toFixed(2);
  }

  // Create callback for click on the left button
  $("#close-top-button-return").click(function(event) {
    location.href = "/main";
  });

  // Create callback for click on the done button
  $("#close-top-button-done").click(function(event) {
    location.href = "/";
  });

  // Create callback for click on a payment button
  $(".close-right-button").click(function(event) {
    $("#close-middle-button-close-tab").show();
  });

  // Create callback for click on the close tab button
  $("#close-middle-button-close-tab").click(function(event) {
    
    var tabUpdate = {
      open : false,
      updatedAt: new Date()
    };

    // Close out tab
    $.ajax("/api/closetab/"+ currentTab.id, {
      type: "PUT",
      data: tabUpdate,
      success: function(resp) {
        console.log(resp);
        location.href = "/tablist";
      },
      error: function(req, status, err) {
        $("#message-area").text("Something went wrong: ", status, err);
      }
    });
  });

  // Create callback for click on the close button
  $("#close-top-button-print").click(function(event) {
      // Create title
      $("#tab-title").text("Receipt for " + currentTab.tab_name);

      // Set Table id
      $("#tab-table-id").text(posSystem.currentTabID);
      // Set server
      $("#tab-server-name").text(posSystem.serverName);
      // Set Tab id
      $("#tab-id").text(posSystem.currentTabID);
      // Set current time
      var currentTime = moment();
      $("#tab-date").text(currentTime.format("MM-DD-YYYY hh:mm:ss a"));

      // Set tab item details
      var mainDiv = $(".tab-items");
      $(mainDiv).empty();     
      if (currentTab.items_ordered.length > 0) {
        var currentItems = currentTab.items_ordered.split(";");
        console.log(currentItems);
        for (var i = 0; i < currentItems.length; i++) {
          var itemObj = currentItems[i].split(":");
          var itemDiv = $("<div class='item-detail cfix'>");
          var leftSpan = $("<span class='close-left-side'>");
          var rightSpan = $("<span class='close-right-side'>");        
          let price = parseInt(itemObj[1]);
          $(leftSpan).text(itemObj[0]);
          $(rightSpan).text("$" + price.toFixed(2));
          $(itemDiv).append(leftSpan);
          $(itemDiv).append(rightSpan);
          $(mainDiv).append(itemDiv);
        }
      }      

      // Set totals
      $("#tab-subtotal-amount").text("$" + subTotal);
      $("#tab-total-tax").text("$" + totalTax);
      $("#tab-amount-due").text("$" + amountDue);

      // Show receipt dialog
      $("#myModal").modal("show");
  });
});