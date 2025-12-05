import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import Summary from './components/Summary';
import ExpenseChart from './components/ExpenseChart';
import './styles/App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [summaryPeriod, setSummaryPeriod] = useState('month');

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
    setFilteredExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    if (selectedCategory === 'all') {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(expenses.filter(exp => exp.category === selectedCategory));
    }
  }, [expenses, selectedCategory]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your spending, stay on budget</p>
      </header>
      
      <div className="app-container">
        <div className="left-section">
          <ExpenseForm onAddExpense={addExpense} />
          
          <div className="summary-section">
            <div className="period-toggle">
              <button onClick={() => setSummaryPeriod('week')} className={summaryPeriod === 'week' ? 'active' : ''}>
                Weekly
              </button>
              <button onClick={() => setSummaryPeriod('month')} className={summaryPeriod === 'month' ? 'active' : ''}>
                Monthly
              </button>
            </div>
            <Summary expenses={expenses} period={summaryPeriod} />
          </div>
        </div>

        <div className="right-section">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onFilterChange={handleFilterChange}
          />
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>

      {expenses.length > 0 && <ExpenseChart expenses={expenses} />}
    </div>
  );
}

export default App;
