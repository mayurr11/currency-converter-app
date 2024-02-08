// Define the base URL for the currency API
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

// Selecting necessary elements from the DOM
const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const countryChangeBtn = document.querySelector("#swipeCountry");

// Populating dropdowns with country codes and names
for (let select of dropDown) {
  // Loop through each dropdown
  for (let currencyCode in countryList) {
    // Loop through each currency code in the countryList
    let countryInfo = countryList[currencyCode];
    let newOption = document.createElement("option");
    let displayText = `${currencyCode} - ${countryInfo.name}`;
    
    // Set option text and value
    newOption.innerText = displayText;
    newOption.value = currencyCode;
    
    // Select default options
    if (select.name === "from" && currencyCode === "INR") {
      newOption.selected = true;
    } else if (select.name === "to" && currencyCode === "USD") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  
  // Add event listener to dropdowns for flag update
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update flag based on selected currency
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode].code;
  
  // Construct flag image URL
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  
  // Select flag image and update source
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listener for conversion button click
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  
  // Select amount input element
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  
  // Check if amount is empty or less than 1
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }

  // Construct URL for currency conversion API
  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

  // Fetch data from currency conversion API
  let res = await fetch(URL);
  let data = await res.json();

  // Extract conversion rate
  let rate = data[toCurrency.value.toLowerCase()];

  // Calculate final amount
  let FinalAmount = amountVal * rate;

  // Display conversion result
  msg.innerText = `${amountVal} ${fromCurrency.value} = ${FinalAmount.toFixed(
    2
  )} ${toCurrency.value} `;
  msg.style.color = "dark blue";
});
