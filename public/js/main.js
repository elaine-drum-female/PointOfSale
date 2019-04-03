//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Local storage
  var posSystem = JSON.parse(localStorage.getItem("posSystem"));

  // Tax rate
  const taxRate = 8.25;

  // Drink items
  var drinkItems = [];

  // Food items
  var foodItems = [];  

  // Get current tab index
  var currentTab = posSystem.openTabs.find(function(element) {
    return element.id === posSystem.currentTabID;
  });

  // Get current tab info
  getCurrentTab(currentTab);

  // Function to display tab orders
  function displayTabOrders(currentTab) {
    var mainDiv = $(".main-page-left");
    $(mainDiv).empty();
   
    if (currentTab.items_ordered.length > 0) {
      var currentItems = currentTab.items_ordered.split(";");
      for (var i = 0; i < currentItems.length; i++) {
        var itemObj = currentItems[i].split(":");
        var itemDiv = $("<div class='main-item-detail cfix'>");
        var leftSpan = $("<span class='main-left-side'>");
        var rightSpan = $("<span class='main-right-side'>");        
        let price = parseInt(itemObj[1]);
        $(leftSpan).text(itemObj[0]);
        $(rightSpan).text(price.toFixed(2));
        $(itemDiv).append(leftSpan);
        $(itemDiv).append(rightSpan);
        $(mainDiv).append(itemDiv);
      }
    }

  }
  
  // Function to display tab totals
  function displayTabTotals() {
    let mainDiv = $(".main-page-left");
    let subTotal = currentTab.total.toFixed(2);
    let total = parseFloat(currentTab.total);

    itemDiv = $("<br><div class='main-item-detail cfix id='tab-subtotal-div'>");
    leftSpan = $("<span class='main-left-side'>");
    rightSpan = $("<span class='main-right-side' id='tab-subTotal'>");
    $(leftSpan).text("Subtotal");
    $(rightSpan).text(subTotal);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    let salesTax = calculateSalesTax(currentTab.total);
    total = total + parseFloat(salesTax);

    itemDiv = $("<div class='main-item-detail cfix'>");
    leftSpan = $("<span class='main-left-side'>");
    rightSpan = $("<span class='main-right-side' id='tab-total'>");
    $(leftSpan).text("Sales Tax");
    $(rightSpan).text(salesTax);
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    itemDiv = $("<br><div class='main-item-detail cfix'>");
    leftSpan = $("<span class='main-left-side'>");
    rightSpan = $("<span class='main-right-side' id='tab-total'>");
    $(leftSpan).text("Total");
    $(rightSpan).text(total.toFixed(2));
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);

    itemDiv = $("<div class='main-item-detail cfix'>");
    leftSpan = $("<span class='main-left-side'>");
    rightSpan = $("<span class='main-right-side' id='tab-balance-due'>");
    $(leftSpan).text("Balance Due");
    $(rightSpan).text(total.toFixed(2));
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).append(itemDiv);
  }

  function calculateSalesTax(subTotal) {
    var salesTax = subTotal * taxRate / 100;
    return salesTax.toFixed(2);
  }

  // Function to get current tab
  function getCurrentTab(tab) {

    $.ajax("/api/gettab/"+ tab.id, {
      type: "GET",
      success: function(resp) {
        console.log(resp);

        // Display tab orders
        displayTabOrders(resp);

        // Display tab totals
        displayTabTotals();

        // Get drink Items
        getDrinkItems();
      },
      error: function(req, status, err) {
        console.log("Something went wrong: ", status, err);
      }
    });
  }

  // Get the current list of drink items
  function getDrinkItems() {
    console.log("getDrinkItems:entered!!!");
    $.ajax("/api/drinks", {
      type: "GET",
      success: function(resp) {
        console.log(resp);
        drinkItems = [];
        var mainDiv = $(".main-page-right");
        for (var i = 0; i < resp.length; i++) {
          var button = $("<button class='btn btn-success main-right-drink-button'>");
          $(button).text(resp[i].drink_name);
          $(button).attr("data-drink-id", resp[i].id);
          $(mainDiv).append(button);
          drinkItems.push(resp[i]);
        }
        // Set click handler for the drink buttons
        $(".main-right-drink-button").mousedown(drinkButtonClicked);

        // Get food items
        getFoodItems();
      },
      error: function(req, status, err) {
        console.log("Something went wrong: ", status, err);
      }
    });
  }

  // Get the current list of food items
  function getFoodItems() {
    $.ajax("/api/food", {
      type: "GET",
      success: function(resp) {
        console.log(resp);
        foodItems = [];
        var mainDiv = $(".main-page-right");
        for (var i = 0; i < resp.length; i++) {
          var button = $("<button class='btn btn-secondary main-right-food-button'>");
          $(button).text(resp[i].food_name);
          $(button).attr("data-food-id", resp[i].id);
          $(mainDiv).append(button);
          foodItems.push(resp[i]);
        }
        // Set click handler for the good buttons
        $(".main-right-food-button").mousedown(foodButtonClicked);
      },
      error: function(req, status, err) {
       console.log("Something went wrong: ", status, err);
      }
    });
  }

  // Function to update a tab
  function updateTab(tab, redirect) {
    
    var tabUpdate = {
      items_ordered : tab.items_ordered,
      sub_total : tab.sub_total,
      total: tab.total,
      updatedAt: new Date()
    };

    $.ajax("/api/updatetab/"+ tab.id, {
      type: "PUT",
      data: tabUpdate,
      success: function(resp) {
        console.log(resp);        
        location.href = redirect;
      },
      error: function(req, status, err) {
        $("#message-area").text("Something went wrong: ", status, err);
      }
    });
  }

  // Call back function when a drink button is clicked
  function drinkButtonClicked(event) {
    var drinkId = parseInt($(this).data("drink-id")) - 1;
    var drink = drinkItems[parseInt(drinkId)];
    var mainDiv = $(".main-page-left"); 
    displayTabOrders(currentTab);

    if (currentTab.items_ordered.length > 0)
    currentTab.items_ordered += ";";
      currentTab.items_ordered += (drink.drink_name + ":" + drink.price);
    currentTab.total += parseInt(drink.price);
    currentTab.sub_total = currentTab.total;

    var itemDiv = $("<div class='main-item-detail cfix'>");
    var leftSpan = $("<span class='main-left-side'>");
    var rightSpan = $("<span class='main-right-side'>");
    $(leftSpan).text(drink.drink_name);
    $(rightSpan).text(drink.price.toFixed(2));
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).prepend(itemDiv);    
        
    // Display tab totals
    displayTabTotals();

    // Update local storage
    localStorage.setItem("posSystem", JSON.stringify(posSystem));
  }

  // Call back function when a food button is clicked
  function foodButtonClicked(event) {
    var foodId = parseInt($(this).data("food-id")) - 1;
    var food = foodItems[parseInt(foodId)];
    var mainDiv = $(".main-page-left"); 
    displayTabOrders(currentTab);

    if (currentTab.items_ordered.length > 0)
    currentTab.items_ordered += ";";
      currentTab.items_ordered += (food.food_name + ":" + food.price);
    currentTab.total += parseInt(food.price);
    currentTab.sub_total = currentTab.total;

    var itemDiv = $("<div class='main-item-detail cfix'>");
    var leftSpan = $("<span class='main-left-side'>");
    var rightSpan = $("<span class='main-right-side'>");
    $(leftSpan).text(food.food_name);
    $(rightSpan).text(food.price.toFixed(2));
    $(itemDiv).append(leftSpan);
    $(itemDiv).append(rightSpan);
    $(mainDiv).prepend(itemDiv);    
        
    // Display tab totals
    displayTabTotals();

    // Update local storage
    localStorage.setItem("posSystem", JSON.stringify(posSystem));
  }
  
  // Create callback for click on the new tab button
  $("#top-button-new-order").click(function(event) {
    updateTab(currentTab, "/newtab" );
  });

  // Create callback for click on the left button
  $("#top-button-left").click(function(event) {
    updateTab(currentTab, "/tablist" );
  });

  // Create callback for click on the done button
  $("#top-button-done").click(function(event) {
    updateTab(currentTab, "/");
  });

  // Create callback for click on the close button
  $("#bottom-button-close").click(function(event) {
    updateTab(currentTab, "/tabclose");
  });
});
