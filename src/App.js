import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, { Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

SuperTokens.init({
  appInfo: {
    appName: "Expense Tracker",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Google.init()
        ]
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
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
