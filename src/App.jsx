import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, { Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import {ThirdPartyEmailPasswordAuth} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import wallet from './wallet.png';

SuperTokens.init({
  appInfo: {
    appName: "Expense Tracker",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
    
       override: {
        components: {
            EmailPasswordSignInHeader: ({ DefaultComponent, ...props }) => {
                return (
                  <>
                    <div>
                      <div className="custom-ctn">
                         <img src={wallet} style={{"width":"100px"}} alt='wallet'/>
                        <h1 style={{color: "#24A19C",fontWeight:700}}>Personal Expense Tracker</h1>
                      </div>
                        <DefaultComponent {...props} />
                    </div> 
                    </> 
                );
            },
        },
      signInAndUpFeature: {
        providers: [
          Google.init()
        ]
      }
       }
  }),
    Session.init()
  ]
});

function App() {
  return (
    <Router>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
        <Route path="/" element={
         <ThirdPartyEmailPasswordAuth>  {/*Wrapping the component to make sure that only Signed In User can access this page*/}
             <Home />
         </ThirdPartyEmailPasswordAuth>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;
