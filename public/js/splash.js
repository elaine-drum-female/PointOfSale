//
// Let the dust settle before getting started.
//
$(document).ready(function() {
  // Create callback for click on the document
  $(document).click(handleSplashClick);

  // Function for click on the document
  function handleSplashClick() {
    console.log("handleSplashClick: entered.");
    // Load the login page
    location.href = "login";
  }
});
