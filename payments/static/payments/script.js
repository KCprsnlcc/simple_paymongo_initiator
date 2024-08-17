// Get the modal
var modal = document.getElementById("payment-modal");

// Get the button that opens the modal
var btn = document.getElementById("open-modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Handle the form submission
document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show the loader
    loader.style.display = "block";

    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Hide the loader
        loader.style.display = "none";

        // Display PayMongo payment modal or success notification
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.next_action
        ) {
          window.location.href = data.data.attributes.next_action.redirect.url;
        } else {
          // Show success dialog notification instead of alert
          dialogNotification.style.display = "block";
          setTimeout(function () {
            dialogNotification.style.display = "none";
          }, 3000); // Hide after 3 seconds
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Hide the loader
        loader.style.display = "none";
        alert("Payment initiation failed.");
      });
  });

// Get the modal
var modal = document.getElementById("payment-modal");

// Get the button that opens the modal
var btn = document.getElementById("open-modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the loader and dialog notification
var loader = document.getElementById("loader");
var dialogNotification = document.getElementById("dialog-notification");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle the form submission
document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show the loader
    loader.style.display = "block";

    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Hide the loader
        loader.style.display = "none";

        // Display PayMongo payment modal or success notification
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.next_action
        ) {
          window.location.href = data.data.attributes.next_action.redirect.url;
        } else {
          // Show success dialog notification
          dialogNotification.style.display = "block";
          setTimeout(function () {
            dialogNotification.style.display = "none";
          }, 3000); // Hide after 3 seconds
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Hide the loader
        loader.style.display = "none";
        alert("Payment initiation failed.");
      });
  });
