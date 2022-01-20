import React, { useEffect } from 'react';
import { signOut, redirectToAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import '../App.css'

function Header(props) {

    const [localBudget, setlocalBudget] = React.useState(0);

    const handleSignOut = async () => {
        await signOut();
        redirectToAuth();
    }

    return (
        <div>
            <div className='header'>
                <h1 className='mt-3'>Personal Expense Tracker</h1>
                <button type="button" class="btn btn-dark mt-3" onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className='input-ctn'>
                <input placeholder='Budget' value={localBudget} onChange={(e) => setlocalBudget(e.target.value)}></input>
                <button type="button" class="btn btn-dark mt-3" onClick={props.handleBudgetChange(localBudget)}>Save Budget</button>
            </div>
        </div>
    )
}

export default Header;
