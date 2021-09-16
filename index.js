const initialPriceRef = document.querySelector("#initial-price-input");
const stockQuantityRef = document.querySelector("#stock-quantity-input");
const currentPriceRef = document.querySelector("#current-price-input");
const submitBtnRef = document.querySelector("#submit-btn");
const outputRef = document.querySelector("#output-container");
const errorMessage = document.querySelector("#error-message");

submitBtnRef.addEventListener("click", (e) => {
  e.preventDefault();
  let initialPrice = Number(initialPriceRef.value);
  let quantity = Number(stockQuantityRef.value);
  let currentPrice = Number(currentPriceRef.value);

  // user input validations for "empty inputs or not" and "positive input numbers or not"
  if (
    initialPriceRef.value !== "" &&
    stockQuantityRef.value !== "" &&
    currentPriceRef.value !== ""
  ) {
    if (
      Math.sign(initialPrice) === 1 &&
      Math.sign(quantity) === 1 &&
      Math.sign(currentPrice) === 1
    ) {
      calculateProfitLoss(initialPrice, quantity, currentPrice);
    } else if (
      Math.sign(initialPrice) === -1 ||
      Math.sign(quantity) === -1 ||
      Math.sign(currentPrice) === -1
    ) {
      // hides whatever output is being displayed and shows spinner
      hideMessage();

      // hides spinner after few seconds of interval and displays the message sent to the function
      showErrorMessage(
        "Inputs can't be negatives. Please enter positive numbers in all fields."
      );
    } else if (
      Math.sign(initialPrice) === 0 ||
      Math.sign(quantity) === 0 ||
      Math.sign(currentPrice) === 0
    ) {
      hideMessage();
      showErrorMessage(
        "Inputs can't be zeroes. Please enter positive numbers in all fields."
      );
    }
  } else if (
    initialPriceRef.value === "" &&
    stockQuantityRef.value === "" &&
    currentPriceRef.value === ""
  ) {
    hideMessage();
    showErrorMessage(
      "Enter all the three inputs given above. None should be empty."
    );
  } else if (
    initialPriceRef.value === "" ||
    stockQuantityRef.value === "" ||
    currentPriceRef.value === ""
  ) {
    hideMessage();
    showErrorMessage(
      "At least one out of three inputs is missing. Please enter all amounts."
    );
  }
});

const calculateProfitLoss = (initialPrice, quantity, currentPrice) => {
  console.log(initialPrice, quantity, currentPrice);
  if (initialPrice > currentPrice) {
    let loss = (initialPrice - currentPrice) * quantity;
    let lossPercent = (loss / initialPrice) * 100;
    showMessage(
      `Sorry, Your loss percentage is ${lossPercent.toFixed(
        2
      )} % and lost ₹${loss}`
    );
    errorMessage.style.display = "none";
  } else if (initialPrice < currentPrice) {
    let profit = (currentPrice - initialPrice) * quantity;
    let profitPercent = (profit / initialPrice) * 100;
    showMessage(
      `Hurray!! You profit percentage is ${profitPercent.toFixed(
        2
      )} % and made ₹${profit}`
    );
    errorMessage.style.display = "none";
  } else {
    showMessage("You have neither made profit nor Loss :)");
    errorMessage.style.display = "none";
  }

  //
};

const showMessage = (msg) => {
  outputRef.style.display = "inline-block";
  outputRef.innerText = msg;
};

const hideMessage = (msg) => {
  outputRef.style.display = "none";
};

const showErrorMessage = (msg) => {
  errorMessage.style.display = "block";
  errorMessage.innerText = msg;
};
