document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response data to complete the payment
        alert("Payment initiated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Payment initiation failed.");
      });
  });
