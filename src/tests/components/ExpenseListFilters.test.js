import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { filters, altFilters } from '../fixtures/filters'
import { ExpenseListFilters } from '../../components/ExpenseListFilters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={ filters }
            setTextFilter = { setTextFilter }
            sortByDate = { sortByDate }
            sortByAmount = { sortByAmount }
            setStartDate = { setStartDate }
            setEndDate = { setEndDate }
        />
    );
});

test("Should render ExpenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseListFilters with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("Should handle text change", () => {
    const value = 'new text'
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("Should sort by date", () => {
    wrapper.setProps({
        filters: altFilters
    });

    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test("Should sort by amount", () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test("Should handle date focus changes", () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});