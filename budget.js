/* www.youtube.com/CodeExplained */

//elements

const balanceEl = document.querySelector(".balance .value")
const incomeTotalEl = document.querySelector(".outcome-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#outcome .list");
const allList = document.querySelector("#all .list");

// buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

// variables
let ENTRY_LIST = [];
let balance = 0
let income = 0
let outcome = 0
const DELETE = 'delete'
const EDIT = 'edit'
let sign  = (income >= outcome) ? '$' : '-$'

// event listeners
expenseBtn.addEventListener("click", function () {
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl]);
  });
  incomeBtn.addEventListener("click", function () {
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl]);
  });
  allBtn.addEventListener("click", function () {
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
    show(allEl);
    hide([incomeEl, expenseEl]);
  });


  addIncome.addEventListener("click", function () {
    if (!incomeTitle.value || incomeAmount.value) return;
    let income = {
      type: "income",
      title: incomeTitle.value,
      amount: parseFloat(incomeAmount.value),
    };
    ENTRY_LIST.push(income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);
  });
  
  addExpense.addEventListener("click", function () {
    if (!expenseTitle.value || expenseAmount.value) return;
    let expense = {
      type: "expense",
      title: expenseTitle.value,
      amount: parseFloat(expenseAmount.value),
    };
    ENTRY_LIST.push(expense);
    updateUI();
    clearInput([expenseTitle, expenseAmount]);
  });


  // functions

function show(element) {
  element.classList.remove("hide");
}
function hide(elementsArray) {
    elementsArray.forEach((element) => {
      element.classList.add("hide");
    });
  }
function active(element) {
    element.classList.add("active");
  }
  function inactive(elementsArray) {
    elementsArray.forEach((element) => {
      element.classList.remove("active");
    });
  }

  function clearInput(inputsArray) {
    inputsArray.forEach((input) => {
      input.value = "";
    });
  }



  function calculateTotal(type, ENTRY_LIST) {
    let sum = 0;
    ENTRY_LIST.forEach((entry) => {
      if (entry.type == type) {
        sum += entry.amount;
      }
    });
    return sum;
  }

  ENTRY_LIST.forEach( (entry, index) => {
      if(entry.type == 'expense'){
          showEntry(expenseList, entry.type, entry.title, entry.amount, index)
      }else if( entry.type == 'income'){
          showEntry(incomeList, entry.type, entry.title, entry.amount, index)
      }
      showEntry(allList, entry.type, entry.title, entry.amount, index)
  })

    // show entry
function showEntry(list, type, amount, id) {
    const entry = `<li id="${id}" class="${type}">
                      <div class="entry">${title} : $${amount}</div>
                      <div id="edit"></div>
                      <div id="delete"></div>
                  </li>`;
  
    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
  }

  function clearElement(elements){
      elements.forEach( element => {
          element.innerHTML =  ''
      })
  }


  // calculates
income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("expense", ENTRY_LIST);
balance = calculateBalance(income, outcome);

function calculateBalance(income, outcome) {
  return income - outcome;
}