import React, { useEffect } from 'react';
import { ThirdPartyEmailPasswordAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import Header from './components/Header';
import Record from './components/Record';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import Session from 'supertokens-auth-react/recipe/session';

function Home() {

    const [user, setUser] = React.useState(null); //userID
    const [budget, setBudget] = React.useState(0);  //budget for the user
    const [expenseList, setExpenseList] = React.useState([]); //list of expenses for the user

    useEffect(() => {
        //get userId from session
        const getUser = async () => {
            if (await Session.doesSessionExist()) {
                let userId = await Session.getUserId();
                setUser(userId);
                console.log(userId);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        getDataForUser();
    }, [user])

    //To get the Budget and list of expenses for a particular user
    function getDataForUser() {
        fetch(`http://localhost:3001/data`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data.rows[0]);
                //setBudget(data.budget);
                //setExpenseList(data.expenses);
            })
    }

    function handleBudgetChange(budget) {

        fetch('http://localhost:3001/update-budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ budget }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getDataForUser();
            });
    }



    return (
        <ThirdPartyEmailPasswordAuth>  {/*Wrapping the component to make sure that only Signed In User can access this page*/}
            <div className='container'>
                <Header handleBudgetChange={handleBudgetChange} />
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Record class={"alert alert-secondary"} title={"Budget"} amount={budget} />
                    </div>
                    <div className='col-sm'>
                        <Record class={"alert alert-success"} title={"Remaining"} amount={budget} />
                    </div>
                    <div className='col-sm'>
                        <Record class={"alert alert-primary"} title={"Spent so far"} amount={budget} />
                    </div>
                </div>
                <h3 className='mt-3'>Expenses</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Add Expense</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <AddExpenseForm />
                    </div>
                </div>
            </div>
        </ThirdPartyEmailPasswordAuth>
    )
}

export default Home;
