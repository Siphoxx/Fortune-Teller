let motherName = document.getElementById("mothername");
let streetName = document.getElementById("streetname");
let colour = document.getElementById("colour");
let age = document.getElementById("age");
let anyNumber = document.getElementById("anynumber");
const fortuneOutput = document.getElementById("fortune-result");

const fortuneButton = document.getElementById("fortune-button");

const unfilled = document.getElementById("unfilled");
const errorList = document.getElementById("listofErrors");

// When the fortune button is clicked, run this function
fortuneButton.addEventListener("click", function () {
  // Clear previous messages first to avoid displaying old content
  unfilled.innerHTML = "";
  fortuneOutput.innerHTML = "";
  errorList.innerHTML = "";

  // Create an empty array to collect all validation errors
  const errorArray = [];

  // BULK VALIDATION: Check each field and collect errors instead of returning early
  //Early Return pattern - check for empty fields
  if (
    motherName.value === "" ||
    streetName.value === "" ||
    colour.value === "" ||
    age.value === "" ||
    anyNumber.value === ""
  ) {
    // unfilled.innerHTML = "Plz fill in all fields";
    errorArray.push("Plz fill in all fields");
    // return; //stop if fields are empty
  }

  // Convert input values to numbers for validation
  const ageValue = parseInt(age.value);
  const numValue = parseInt(anyNumber.value);

  //Check the parsed values, not the original inputs
  if (isNaN(numValue)) {
    errorArray.push("Please pick number between 1 and 10 field.");
  }

  if (isNaN(ageValue)) {
    errorArray.push("Please fill in age as a number.");
  }

  // Validate that the number is within the allowed range (1-10)
  if (numValue < 1 || numValue > 10) {
    errorArray.push("Please enter number between 1 and 10");
  }

  // Validate that mother's name contains only letters (no numbers or symbols)
  if (!/^[A-Za-z]+$/.test(motherName.value)) {
    errorArray.push("mother’s first name should be letters only");
  }

  // Validate that street name contains only letters
  if (!/^[A-Za-z]+$/.test(streetName.value)) {
    errorArray.push("street name Please enter letters only");
  }

  // Validate that color contains only letters
  if (!/^[A-Za-z]+$/.test(colour.value)) {
    errorArray.push("Color should letters only");
  }

  // CALCULATE FORTUNE: Only calculate if we might show the fortune
  let marriedYears = Math.round(ageValue / numValue);
  let numberofChildren = Math.round(ageValue / numValue);

  // Create the fortune display HTML with gradient text effect
  const fortuneString = `<div class="min-h-[200px] flex items-center justify-center p-4">
   <p class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent p-4 rounded-lg text-center mt-4"> 
In ${numValue} years you are going to meet your best friend named
${motherName.value} ${streetName.value}<br> You will get married in
 ${marriedYears} years and have ${numberofChildren} children<br>
At ${ageValue - numValue} years you are going to dye your hair ${colour.value}
</p>
  </div>`;

  // DECISION POINT: Check if we have any validation errors

  if (errorArray.length > 0) {
    errorList.innerHTML =
      '<div class="flex flex-col items-center justify-center p-2">' +
      '<ul class="list-disc text-white text-lg font-medium space-y-2">' +
      errorArray.map((error) => `<li>${error}</li>`).join("") +
      "</ul>" +
      "</div>";
  } else {
    // If no errors, display the fortune
    fortuneOutput.innerHTML = fortuneString;
  }

  // Clear the form fields after processing (whether success or error)

  motherName.value = "";
  streetName.value = "";
  colour.value = "";
  age.value = "";
  anyNumber.value = "";
});
