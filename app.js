// ==================== Array за съхранение на разходи ====================
let expenses = [];

// ==================== Елементи от DOM ====================
const expenseForm = document.getElementById('expense-form');
const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const expenseList = document.getElementById('expense-list');
const totalValue = document.getElementById('total-value');
const statsCount = document.getElementById('stats-count');
const statsHighest = document.getElementById('stats-highest');
const statsTotalExpenses = document.getElementById('stats-total-expenses');

// ==================== Функция за добавяне на разход ====================
function addExpense(event) {
  event.preventDefault();

  // Взимам стойностите от формата
  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Валидация
  if (!category || amount <= 0) {
    alert('Моля, попълни всички полета правилно!');
    return;
  }

  // Създавам нов обект за разход
  const expense = {
    id: Date.now(),
    category: category,
    amount: amount,
    date: new Date().toLocaleDateString('bg-BG')
  };

  // Добавям разхода към масива
  expenses.push(expense);

  // Очищавам формата
  expenseForm.reset();
  categoryInput.focus();

  // Актуализирам интерфейса
  updateTotal();
  renderExpenses();
  updateStatistics();
}

// ==================== Функция за обновяване на общата сума ====================
function updateTotal() {
  let total = 0;

  // Събирам всички суми от разходите
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }

  // Актуализирам елемента на страницата
  totalValue.textContent = total.toFixed(2) + ' лв.';
}

// ==================== Функция за рендериране на списъка с разходи ====================
function renderExpenses() {
  // Очищавам списъка
  expenseList.innerHTML = '';

  // Обхождам масива и създавам елементи
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    // Създавам елемент за разход
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      <div class="expense-info">
        <span class="expense-category">${expense.category}</span>
        <span class="expense-date">${expense.date}</span>
      </div>
      <div class="expense-amount">${expense.amount.toFixed(2)} лв.</div>
      <button class="button button-danger" onclick="deleteExpense(${expense.id})">Изтрий</button>
    `;

    // Добавям елемента към списъка
    expenseList.appendChild(li);
  }

  // Показвам съобщение, ако няма разходи
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li class="expense-empty">Няма добавени разходи</li>';
  }
}

// ==================== Функция за актуализиране на статистиката ====================
function updateStatistics() {
  // Брой разходи
  statsCount.textContent = expenses.length;

  // Обща сума
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  statsTotalExpenses.textContent = total.toFixed(2) + ' лв.';

  // Най-голям разход
  if (expenses.length > 0) {
    let highest = expenses[0].amount;
    for (let i = 1; i < expenses.length; i++) {
      if (expenses[i].amount > highest) {
        highest = expenses[i].amount;
      }
    }
    statsHighest.textContent = highest.toFixed(2) + ' лв.';
  } else {
    statsHighest.textContent = '0.00 лв.';
  }
}

// ==================== Функция за изтриване на разход ====================
function deleteExpense(id) {
  // Намирам позицията на разхода в масива
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      // Изтривам разхода
      expenses.splice(i, 1);
      break;
    }
  }

  // Актуализирам интерфейса
  updateTotal();
  renderExpenses();
  updateStatistics();
}

// ==================== Event Listener для форме ====================
expenseForm.addEventListener('submit', addExpense);

// ==================== Инициализация при зареждане ====================
document.addEventListener('DOMContentLoaded', function() {
  renderExpenses();
  updateTotal();
  updateStatistics();
});
