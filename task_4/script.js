let entries = JSON.parse(localStorage.getItem("entries")) || [];

const balanceElement = document.getElementById("net-balance");
const incomeElement = document.getElementById("total-income");
const expensesElement = document.getElementById("total-expenses");
const entriesList = document.getElementById("entries");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addEntryButton = document.getElementById("add-entry");
const resetButton = document.getElementById("reset");
const filters = document.querySelectorAll('input[name="filter"]');

function renderEntries(filter = "all") {
  entriesList.innerHTML = "";

  let filteredEntries = entries.filter(
    (entry) => filter === "all" || entry.type === filter
  );

  filteredEntries.forEach((entry, index) => {
    const entryItem = document.createElement("li");
    entryItem.classList.add("entry");
    entryItem.innerHTML = `
      ${entry.description} - ${entry.amount} (${entry.type})
      <button onclick="editEntry(${index})">Edit</button>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesList.appendChild(entryItem);
  });

  updateTotals();
}

function updateTotals() {
  let totalIncome = entries.reduce(
    (acc, entry) =>
      entry.type === "income" ? acc + parseFloat(entry.amount) : acc,
    0
  );
  let totalExpenses = entries.reduce(
    (acc, entry) =>
      entry.type === "expense" ? acc + parseFloat(entry.amount) : acc,
    0
  );
  let netBalance = totalIncome - totalExpenses;

  balanceElement.textContent = netBalance;
  incomeElement.textContent = totalIncome;
  expensesElement.textContent = totalExpenses;
}

function addEntry() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const type = typeSelect.value;

  if (description && amount && !isNaN(amount)) {
    entries.push({ description, amount, type });
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
    descriptionInput.value = "";
    amountInput.value = "";
  }
}

function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeSelect.value = entry.type;

  entries.splice(index, 1);
  renderEntries();
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
}

function resetEntries() {
  entries = [];
  localStorage.removeItem("entries");
  renderEntries();
}

addEntryButton.addEventListener("click", addEntry);
resetButton.addEventListener("click", resetEntries);
filters.forEach((filter) =>
  filter.addEventListener("change", () => renderEntries(filter.value))
);

document.addEventListener("DOMContentLoaded", () => renderEntries());
