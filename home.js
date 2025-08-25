const validPin = 1234;

function getInputValueNumber(id) {
  return parseInt(document.getElementById(id).value);
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

function getInnerText() {
  return parseInt(document.getElementById("current-balance").innerText);
}
function setInnerText(currentNewBalance) {
  document.getElementById("current-balance").innerText = currentNewBalance;
}

function handleToggle(id) {
  const forms = document.getElementsByClassName("form");
  for (const form of forms) {
    form.style.display = "none";
  }

  document.getElementById(id).style.display = "block";
}

function handleToggleDiv(id) {
  const btns = document.getElementsByClassName("form-btn");

  for (const btn of btns) {
    btn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]");
    btn.classList.add("border-[#08080819]");
  }

  document.getElementById(id).classList.remove("border-[#08080819]");

  document
    .getElementById(id)
    .classList.add("border-[#0874f2]", "bg-[#0874f20d]");
}

function getItem() {
  return JSON.parse(localStorage.getItem("dataStorage")) || [];
}

function setItem(storeData) {
  localStorage.setItem("dataStorage", JSON.stringify(storeData));
}

function latestPaymentForm(j = 5) {
  let transactionData = getItem();
  const latestPaymentDiv = document.getElementById("latest-payment-container");
  latestPaymentDiv.innerText = "";
  let i = 0;
  if (transactionData.length !== 0) {
    for (const data of transactionData) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div id="latest-payment-container">
          <div
            class="bg-white rounded-lg p-3 flex justify-between items-center my-3 hover:shadow-lg transition delay duration-300 ease-in-out hover:-translate-y-1"
          >
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#f4f5f7]">
                <img src=${data.logo} alt="wallet" class="mx-auto" />
              </div>
              <div class="ml-3">
                <h1>${data.name}</h1>
                <p>${data.time}</p>
              </div>
            </div>
            <span class="delete-btn"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
        </div>
      `;
      if (i == j) {
        break;
      }
      i++;

      latestPaymentDiv.appendChild(div);
    }
  }
}

// add_money
document
  .getElementById("add-money-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const bank = document.getElementById("bank");
    const accountNumber = getInputValue("account-number");
    const amount = getInputValueNumber("add-amount");
    const pin = getInputValueNumber("pin-number");
    const balance = getInnerText();

    if (amount <= 0) {
      alert("Invalid amount");
      return;
    }

    if (accountNumber.length !== 11) {
      alert("please provide valid account number");
      return;
    }
    if (pin !== validPin) {
      alert("please provide valid pin");
      return;
    }

    const currentNewBalance = balance + amount;
    setInnerText(currentNewBalance);

    const data = {
      name: "Add money",
      time: new Date().toLocaleString(),
      logo: "./assets/wallet1.png",
    };

    let transactionData = getItem();
    transactionData.unshift(data);
    setItem(transactionData);
    handleToggle("latest-transaction-form");
    latestPaymentForm();
  });

//   cash_out_feature
document.getElementById("cash-out-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const amount = getInputValueNumber("withdraw-amount");

  const availableBalance = getInnerText();
  const pin = getInputValueNumber("number-pin");

  const agentNumber = getInputValue("agent-number");

  if (amount > availableBalance || amount <= 0) {
    alert("Invalid Amount");
    return;
  }

  if (pin !== validPin) {
    alert("please provide valid pin");
    return;
  }

  if (agentNumber.length !== 11) {
    alert("Please provide proper agent number");
    return;
  }
  const currentNewBalance = availableBalance - amount;
  setInnerText(currentNewBalance);

  const data = {
    name: "Cash Out",
    time: new Date().toLocaleString(),
    logo: "./assets/send1.png",
  };

  let transactionData = getItem();
  transactionData.unshift(data);
  setItem(transactionData);
  handleToggle("latest-transaction-form");
  latestPaymentForm();
});

//Transfer Money

document.getElementById("send-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const userNumber = getInputValue("user-number");
  const sendId = getInputValueNumber("send-pin");
  const sendAmount = getInputValueNumber("send-amount");
  const currentBalance = getInnerText();

  if (userNumber.length !== 11) {
    return alert("Enter a valid number");
  }
  if (sendId !== validPin) {
    return alert("Enter a valid pin");
  }
  if (currentBalance < sendAmount) {
    return alert("not have sufficient balance");
  }

  const newCurrentBalance = currentBalance - sendAmount;
  setInnerText(newCurrentBalance);

  const data = {
    name: "Send Money",
    time: new Date().toLocaleString(),
    logo: "./assets/money1.png",
  };

  let transactionData = getItem();
  transactionData.unshift(data);
  setItem(transactionData);
  handleToggle("latest-transaction-form");
  latestPaymentForm();
});

//get Bonus
document
  .getElementById("get-bonus-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const couponPin = getInputValueNumber("coupon-pin");

    if (couponPin !== validPin) {
      return alert("enter a valid coupon number");
    }

    const currentBalance = getInnerText();
    const newCurrentBalance = currentBalance + 100;
    setInnerText(newCurrentBalance);

    const data = {
      name: "Bonus",
      time: new Date().toLocaleString(),
      logo: "./assets/bonus1.png",
    };

    let transactionData = getItem();
    transactionData.unshift(data);
    setItem(transactionData);
    handleToggle("latest-transaction-form");
    latestPaymentForm();
  });

//Pay Bill

document.getElementById("pay-bill-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const paymentNumber = getInputValue("biller-account-number");
  const paymentAmount = getInputValueNumber("pay-amount");
  const payBillPin = getInputValueNumber("pay-bill-pin");
  const currentBalance = getInnerText();

  if (payBillPin !== validPin) {
    return alert("enter a valid pin");
  }

  if (paymentNumber.length !== 11) {
    return alert("enter a valid number");
  }

  if (currentBalance < paymentAmount) {
    return alert("insufficient balance");
  }

  const newCurrentBalance = currentBalance - paymentAmount;
  setInnerText(newCurrentBalance);

  const data = {
    name: "Pay Bill",
    time: new Date().toLocaleString(),
    logo: "./assets/purse1.png",
  };

  let transactionData = getItem();
  transactionData.unshift(data);
  setItem(transactionData);
  handleToggle("latest-transaction-form");
  latestPaymentForm();
});

//Transaction

document
  .getElementById("transaction-money-div")
  .addEventListener("click", function () {
    const transactionDiv = document.getElementById("transaction-container");

    transactionDiv.innerText = "";
    let transactionData = getItem();

    if (transactionData.length !== 0) {
      for (const data of transactionData) {
        const div = document.createElement("div");

        div.innerHTML = `
      <div id="transaction-container">
          <div
            class="bg-white rounded-lg p-3 flex justify-between items-center my-3 hover:shadow-lg transition delay duration-300 ease-in-out hover:-translate-y-1"
          >
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-[#f4f5f7]">
                <img src=${data.logo} alt="wallet" class="mx-auto" />
              </div>
              <div class="ml-3">
                <h1>${data.name}</h1>
                <p>${data.time}</p>
              </div>
            </div>
            <span class="delete-btn"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
        </div>
      `;

        transactionDiv.appendChild(div);
      }
    }
  });

//latest payment
latestPaymentForm();

// nav logo
document.getElementById("logo-btn").addEventListener("click", function () {
  handleToggle("latest-transaction-form");
  latestPaymentForm();
});

// log out button

document.getElementById("logout-btn").addEventListener("click", function () {
  window.location.href = "./index.html";
});

// view btn
document.getElementById("view-btn").addEventListener("click", function () {
  let viewBtnInnerText = document.getElementById("view-btn");
  if (viewBtnInnerText.innerText === "View All") {
    const transactionData = getItem();
    const len = transactionData.length;
    latestPaymentForm(len);
    viewBtnInnerText.innerText = "Hide";
  } else {
    latestPaymentForm();
    viewBtnInnerText.innerText = "View All";
  }
});

//delete button
document.getElementsByClassName("delete-btn");

//   toggling feature

document.getElementById("add-money-div").addEventListener("click", function () {
  handleToggle("add-money-form");
  handleToggleDiv("add-money-div");
});

document.getElementById("cash-out-div").addEventListener("click", function () {
  handleToggle("cash-out-form");
  handleToggleDiv("cash-out-div");
});

document
  .getElementById("transfer-money-div")
  .addEventListener("click", function () {
    handleToggle("transfer-money-form");
    handleToggleDiv("transfer-money-div");
  });

document
  .getElementById("bonus-money-div")
  .addEventListener("click", function () {
    handleToggle("bonus-money-form");
    handleToggleDiv("bonus-money-div");
  });

document.getElementById("pay-money-div").addEventListener("click", function () {
  handleToggle("pay-money-form");
  handleToggleDiv("pay-money-div");
});

document
  .getElementById("transaction-money-div")
  .addEventListener("click", function () {
    handleToggle("transaction-money-form");
    handleToggleDiv("transaction-money-div");
  });

// localStorage.setItem("userName", "rakibul islam");
// localStorage.setItem("pin", "1234");

// const userName = localStorage.getItem("userName");
// const pi = localStorage.getItem("pin");
// console.log(userName, pi);

// localStorage.removeItem("userName");
