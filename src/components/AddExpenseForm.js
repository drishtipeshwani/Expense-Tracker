import React from 'react';

const AddExpenseForm = (props) => {

    const [item, setItem] = React.useState('');
    const [amount, setAmount] = React.useState(0);

    const handleChanges = () => {
        fetch('http://localhost:3001/create-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: props.user, budget: props.budget, item: item, amount: amount, }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                props.getDataForUser();
            });
    }

    return (
        <form>
            <div className='row'>
                <div className='col-sm'>
                    <label for='name'>Name</label>
                    <input
                        required='required'
                        type='text'
                        className='form-control'
                        id='name'
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    ></input>
                </div>
                <div className='col-sm'>
                    <label for='cost'>Cost</label>
                    <input
                        required='required'
                        type='text'
                        className='form-control'
                        id='cost'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    ></input>
                </div>

            </div>
            <div className='row'>
                <div className='col-sm'>
                    <button type='submit' className='btn btn-primary mt-3' onClick={() => { handleChanges() }}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddExpenseForm;