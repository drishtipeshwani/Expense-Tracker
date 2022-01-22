import React, { useEffect } from 'react';
import Header from './components/Header';
import Record from './components/Record';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

function Home() {

    let { userId, accessTokenPayload } = useSessionContext(); //Getting user details from session context
    const [budget, setBudget] = React.useState(0);  //budget for the user
    const [expenseList, setExpenseList] = React.useState([]); //list of expenses for the user
    const [totalExpense, setTotalExpense] = React.useState(0); //total expense for the user
    const [remainingAmount, setRemainingAmount] = React.useState(0); //Remaining amount for the user

    useEffect(() => {
        getDataForUser();
    }, []);

    //To get the Budget and list of expenses for a particular user
    function getDataForUser() {
        fetch(`http://localhost:3001/data`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                setBudget(parseInt(data[0].budget));
                let list = []
                let totalAmount = 0;
                data.map((row) => {
                    if (row.item && row.amount) {
                        let expense = { 'item': row.item, 'amount': parseInt(row.amount) }
                        totalAmount += parseInt(row.amount);
                        list.push(expense);
                    }
                })
                setExpenseList(list);
                setTotalExpense(totalAmount);
                setRemainingAmount(data[0].budget - totalAmount);
            })
    }

    return (
        <div className='container'>
            <Header getDataForUser={getDataForUser} user={userId} budget={budget} />
            <div className='row mt-3'>
                <div className='col-sm'>
                    <Record class={"alert alert-secondary"} title={"Budget"} amount={budget} />
                </div>
                <div className='col-sm'>
                    <Record class={"alert alert-success"} title={"Remaining"} amount={remainingAmount} />
                </div>
                <div className='col-sm'>
                    <Record class={"alert alert-primary"} title={"Spent so far"} amount={totalExpense} />
                </div>
            </div>
            <h3 className='mt-3'>Expenses</h3>
            <div className='row mt-3'>
                <div className='col-sm'>
                    <ExpenseList expenseList={expenseList} />
                </div>
            </div>
            <h3 className='mt-3'>Add Expense</h3>
            <div className='row mt-3'>
                <div className='col-sm'>
                    <AddExpenseForm getDataForUser={getDataForUser} user={userId} budget={budget} />
                </div>
            </div>
        </div>
    )
}

export default Home;
