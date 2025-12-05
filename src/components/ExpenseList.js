import React from 'react';
import '../styles/ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="expense-list-container">
      <h2>Recent Expenses</h2>
      <div className="expense-list">
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses recorded yet</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-details">
                <span className="expense-description">{expense.description}</span>
                <span className={`expense-category category-${expense.category.toLowerCase()}`}>
                  {expense.category}
                </span>
              </div>
              <div className="expense-amount-section">
                <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                <span className="expense-date">{expense.date}</span>
                <button onClick={() => onDeleteExpense(expense.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
