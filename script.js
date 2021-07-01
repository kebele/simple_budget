const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".outcome-total");
const chartEl = document.querySelector(".chart");

const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

let ENTRY_LIST = [];

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

function active(element) {
  element.classList.add("active");
}
function show(element) {
  element.classList.remove("hide");
}
function hide(elementsArray) {
  elementsArray.forEach((element) => {
    element.classList.add("hide");
  });
}
function inactive(elementsArray) {
  elementsArray.forEach((element) => {
    element.classList.remove("active ");
  });
}

addIncome.addEventListener("click", function () {
  if (!incomeTitle.value || incomeAmount.value) return;
  let income = {
    type: "income",
    title: incomeTitle.nodeValue,
    amount: parseFloat(incomeAmount.value),
  };
  ENTRY_LIST.push(income);
  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

addExpense.addEventListener("click", function () {
  let expense = {
    type: "expense",
    title: expense.title.value,
    amount: parseFloat(expenseAmount.value),
  };
  ENTRY_LIST.push(expense);
  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

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

// calculates
income = calculateTotal("income", ENTRY_LIST);
outcome = calculateTotal("expense", ENTRY_LIST);
balance = calculateBalance(income, outcome);

function calculateBalance(income, outcome) {
  return income - outcome;
}

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

function clearInput(inputsArray) {
    inputsArray.forEach((input) => {
      input.value = "";
    });
  }

// update chart
const canvas = document.createElement("canvas");

canvas.height = 50;
canvas.width = 50;

chartEl.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

const R = 20;


function drawCircle(color, ratio, anticlockwise) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    cvs.width / 2,
    cvs.height / 2,
    R,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  ctx.stroke();
}

function updateChart(income, outcome){
    ctx.clearRect(0,0,cvs.width, cvs,height)
    let ratio = income/(income +outcome)
    drawCircle('#FFFFFF', -ratio, true)
    drawCircle('#F0624D', 1 - ratio, false)
}

//delete and edit

//delete
// Array.splice(index, how many)
// list = [a,b,c,d]
// list.splice(1,2) => list = [a,d]

//delete
function deleteEntry(ENTRY){
    ENTRY_LIST.splice(ENTRY.id,1)
    updateUI()
}

//edit
function editEntry(ENTRY){
    if(entry.type == 'income'){
        incomeAmount.value = entry.amount
        incomeTitle.value = entry.title
    }else if(entry.type == 'expense'){
        expenseAmount.value = entry.amount
        expenseTitle.value = entry.title
    }

    deleteEntry(ENTRY)
}

function deleteOrEdit(event){
    const targetBtn = event.target
    const ENTRY = targetBtn.parentNode
    if(targetBtn.id == 'delete'){
        deleteEntry(ENTRY)
    }else if(targetBtn.id == 'edit'){
        editEntry(ENTRY)
    }
}

// localStorage

// localStorage.setıtem('key', VALUE)
// localStorage.getItem('key')
// localStorage da JSON format tutulur
// JSON.stringify() gönderirken
// JSON.parse()

localStorage.setItem('entry_list', JSON.stringify('ENTRY_LIST'))

ENTRY_LIST = JSON.parse(localStorage.getItem('entry_list'))
updateUI()

