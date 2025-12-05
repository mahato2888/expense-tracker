import React, { useState } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.category) {
      onAddExpense({
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount)
      });
      setFormData({ description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
