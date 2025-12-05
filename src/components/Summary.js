import React from 'react';

const Summary = ({ expenses, period }) => {
  const filterByPeriod = () => {
    const now = new Date();
    return expenses.filter(exp => {
      const expDate = new Date(exp.date);
      if (period === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expDate >= weekAgo;
      } else {
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
      }
    });
  };

  const filteredExpenses = filterByPeriod();
  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="summary-container">
      <h3>{period === 'week' ? 'Weekly' : 'Monthly'} Summary</h3>
      <p className="summary-total">Total: ₹{total.toFixed(2)}</p>
      <p className="summary-count">{filteredExpenses.length} transactions</p>
    </div>
  );
};

export default Summary;
