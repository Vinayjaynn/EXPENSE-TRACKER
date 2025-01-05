import React from "react";

function ExpenseList({
  expenses,
  onEditExpense,
  onUpdateExpense,
  onCancelEdit,
  onDeleteExpense,
  editExpenseId,
  editedExpense,
  setEditedExpense,
}) {
  return (
    <div className="space-y-4 w-full max-w-6xl mt-8">
      {expenses.length === 0 ? (
        <p className="text-center">No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
            {editExpenseId === expense.id ? (  // Check if the expense is being edited
              <div className="w-full">
                <div className="flex flex-col mb-4">
                  <input
                    type="text"
                    value={editedExpense.description}
                    onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                    className="p-2 border-2 border-gray-300 rounded-lg mb-2 text-black"
                  />
                  <input
                    type="number"
                    min="0"
                    value={editedExpense.amount}
                    onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                    className="p-2 border-2 border-gray-300 rounded-lg mb-2 text-black"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={onUpdateExpense}
                    className="py-1 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="py-1 px-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-lg font-semibold">{expense.description}</p>
                  <p className="text-sm text-gray-500">₹{expense.amount}</p>
                </div>
                <div>
                  <button
                    onClick={() => onEditExpense(expense)}
                    className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;