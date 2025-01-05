import { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(500); // Default income
  const [tempIncome, setTempIncome] = useState(income); // To store the previous income value before editing
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({ description: "", amount: "" });

  const [toastShown, setToastShown] = useState(false); // Toast state for savings warning

  const addExpenseHandler = () => {
    if (description && amount > 0) {
      const newExpense = {
        id: new Date().toISOString(),
        description,
        amount: parseFloat(amount),
      };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setDescription(""); // Clear description input
      setAmount(""); // Clear amount input
    } else {
      toast.error("Please enter a positive amount for the expense.");
    }
  };

  const deleteExpenseHandler = (expenseId) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== expenseId));
  };

  const updateIncomeHandler = (newIncome) => {
    const parsedIncome = parseFloat(newIncome);
    if (parsedIncome > 0) {
      setIncome(parsedIncome);
      setIsEditingIncome(false);
    } else {
      toast.error("Please enter a positive income amount.");
    }
  };

  const cancelIncomeEditHandler = () => {
    setIncome(tempIncome); // Revert to previous income value
    setIsEditingIncome(false);
  };

  const editIncomeHandler = () => {
    setTempIncome(income);
    setIsEditingIncome(true);
  };

  const editExpenseHandler = (expense) => {
    setEditExpenseId(expense.id);
    setEditedExpense({ description: expense.description, amount: expense.amount });
  };

  const updateExpenseHandler = () => {
    if (editedExpense.amount > 0) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editExpenseId ? { ...expense, description: editedExpense.description, amount: parseFloat(editedExpense.amount) } : expense
        )
      );
      setEditExpenseId(null);
      setEditedExpense({ description: "", amount: "" });
    } else {
      toast.error("Please enter a positive amount for the expense.");
    }
  };

  const cancelExpenseEditHandler = () => {
    setEditExpenseId(null);
    setEditedExpense({ description: "", amount: "" });
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  // Savings are updated only after income is saved
  const savings = isEditingIncome ? tempIncome - totalExpenses : income - totalExpenses;

  // Show warning when savings are negative
  useEffect(() => {
    if (savings < 0 && !toastShown) {
      toast.warning("You have spent more than your available savings!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setToastShown(true); // Mark that the toast has been shown
    } else if (savings >= 0) {
      // Reset the toastShown flag when savings are back above zero
      setToastShown(false);
    }
  }, [savings, toastShown]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col">
      <div className="flex-grow py-10">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Personal Finance Tracker</h1>
        <div className="w-full max-w-6xl grid grid-cols-3 gap-8 mb-8 mx-auto">
          {/* Income Section */}
          <div className={`p-6 rounded-lg shadow-xl text-white ${isEditingIncome ? "bg-yellow-500" : "bg-green-500"}`}>
            <h2 className="text-2xl font-semibold">Income</h2>
            {!isEditingIncome ? (
              <div className="text-xl font-bold">
                ₹{income}
                <button
                  onClick={editIncomeHandler}
                  className="ml-4 text-blue-300 hover:text-blue-500"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  min="0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="p-2 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full text-black"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => updateIncomeHandler(income)}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelIncomeEditHandler}
                    className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Expense Section */}
          <div className="bg-yellow-500 p-6 rounded-lg shadow-xl text-white">
            <h2 className="text-2xl font-semibold">Add Expense</h2>
            <div>
              <input
                type="text"
                placeholder="Expense Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 mt-2 border-2 border-gray-300 rounded-lg mb-2 w-full text-black"
              />
              <input
                type="number"
                min="0"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 mt-2 border-2 border-gray-300 rounded-lg mb-2 w-full text-black"
              />
              <button
                onClick={addExpenseHandler}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Savings Section */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-xl text-white">
            <h2 className="text-2xl font-semibold">Savings</h2>
            <div className={`text-xl font-bold ${savings < 0 ? "text-red-400" : "text-white"}`}>
              ₹{savings}
            </div>
            {savings < 0 && (
              <p className="text-red-300 mt-2">You have exceeded your savings!</p>
            )}
          </div>
        </div>

        {/* Expense List Section */}
        <div className="w-full max-w-6xl mb-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center">Expenses</h2>
          <ExpenseList
            expenses={expenses}
            onEditExpense={editExpenseHandler}
            onUpdateExpense={updateExpenseHandler}
            onCancelEdit={cancelExpenseEditHandler}
            onDeleteExpense={deleteExpenseHandler}
            editExpenseId={editExpenseId}
            editedExpense={editedExpense}
            setEditedExpense={setEditedExpense}
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  py-4 text-center text-white">
        <p className="text-sm">
          &copy; 2025 Personal Finance Tracker | All Rights Reserved
        </p>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;