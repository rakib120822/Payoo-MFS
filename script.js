document.getElementById("loginButton").addEventListener("click", function (e) {
  e.preventDefault();
  const mobileNumber = 18838360565;
  const pinNumber = 1234;
  const mobileNumberValue = document.getElementById("mobile-number").value;
  const mobilNumberValueConverted = parseInt(mobileNumberValue);
  const pinNumberValue = document.getElementById("digit-number").value;
  const pinNumberValueConverted = parseInt(pinNumberValue);

  if (
    mobilNumberValueConverted === mobileNumber &&
    pinNumber === pinNumberValueConverted
  ) {
    window.location.href = "./home.html";
  } else {
    alert("Invalid credentials  ");
  }
});
