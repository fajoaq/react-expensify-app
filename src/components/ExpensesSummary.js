import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, visibleExpenseCount, expensesTotal }) => {
  const expenseWord = visibleExpenseCount === 1 ? 'expense' : 'expenses' ;
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{visibleExpenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span>
        </h1>
        { 
          (expenseCount > visibleExpenseCount) && 
          <h3 className="page-header__error">
            { `${expenseCount - visibleExpenseCount} hidden ${expenseWord}` }
          </h3> 
        }
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const expenseCount = state.expenses.length;
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount,
    visibleExpenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
