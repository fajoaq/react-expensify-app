import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseModal from './ExpenseModal';

export class EditExpensePage extends React.Component {
  state = {
    initiateRemove: false
  };

  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  //display modal
  onInitiateRemove = () => {
    this.setState(() => ({ initiateRemove: true }));
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  handleClearRemove = () => {
    this.setState(() => ({ initiateRemove: false }));
  };
  render() {
    return (
      <div>
        <ExpenseModal
          contentLabel={ this.props.expense.description }
          initiateRemove={ this.state.initiateRemove }
          handleClearRemove={ this.handleClearRemove }
          onRemove={ this.onRemove}
        />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <div className="button--flex-end">
            <button id="remove" className="button button--secondary" onClick={ this.onInitiateRemove }>Delete</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
