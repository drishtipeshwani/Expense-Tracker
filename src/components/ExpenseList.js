import React from 'react';

const ExpenseList = (props) => {

    return <div className='expense-list'>
        <ul className='list-group'>
            {props.expenseList.map((expense) => (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {expense.item}
                    <span className="badge bg-info badge-pill">Rs. {expense.amount}</span>
                </li>
            ))}
        </ul>
    </div>;
};

export default ExpenseList;
