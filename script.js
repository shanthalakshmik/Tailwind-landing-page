const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transactionList");
const totalIncomeElem = document.getElementById("totalIncome");
const totalExpenseElem = document.getElementById("totalExpense");
const balanceElem = document.getElementById("balance");

let transactions = [];

transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description === "" || isNaN(amount)) {
        alert("Please provide a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateTransactions();
    clearForm();
});

function updateTransactions() {
    transactionList.innerHTML = "";
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-50 p-2 border rounded";
        
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}</span>
            <div>
                <button onclick="editTransaction(${transaction.id})" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onclick="deleteTransaction(${transaction.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
        `;

        transactionList.appendChild(li);

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    totalIncomeElem.textContent = `₹${totalIncome}`;
    totalExpenseElem.textContent = `₹${totalExpense}`;
    balanceElem.textContent = `₹${totalIncome - totalExpense}`;
}

function clearForm() {
    descriptionInput.value = "";
    amountInput.value = "";
    typeInput.value = "income";
}

function editTransaction(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
        descriptionInput.value = transaction.description;
        amountInput.value = transaction.amount;
        typeInput.value = transaction.type;

        transactions = transactions.filter((t) => t.id !== id);
        updateTransactions();
    }
}

function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    updateTransactions();
}












