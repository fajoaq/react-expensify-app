import uuid from 'uuid';
import database from '../firebase/firebase';
import expenses from '../selectors/expenses';

///Standard actions////
//components call action generator (like this file)
//action generator returns object (to the dispatch call)
//component dispatches object (to the action reducers) 
//redux store changes

//////Asynchronous actions////
//components call action generator (like this file)
//action generator returns a FUNCTION (to the dispatch call)
//component dispatches FUNCTION
//FUNCTION runs (has the ability to dispatch other actions and whatever it wants)

//
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

//START REMOVE_EXPENSE
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

//START EDIT_EXPENSE
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//START SET_EXPENSES
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
     return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((expense) => {
        expenses.push({
          id: expense.key,
          ...expense.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

