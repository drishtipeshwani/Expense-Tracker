const express = require("express");
let supertokens = require("supertokens-node");
let cors = require("cors");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { Google } = ThirdPartyEmailPassword;
let { middleware } = require("supertokens-node/framework/express");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");


supertokens.init({
    framework: "express",
    supertokens: {
        // try.supertokens.io is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.io), or self host a core.
        connectionURI: "https://try.supertokens.io",
        // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
    },
    appInfo: {
        appName: "Expense Tracker",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testsing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                Google({
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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"
                })
            ]
        }),
        Session.init() // initializes session features
    ]
});

const PORT = 3001;

const app = express();

const database = require("./database");

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware()); // middleware adds the signin and signup api endpoints to the express app

let { errorHandler } = require("supertokens-node/framework/express");

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get("/get-user-info", verifySession(), async (req, res) => {
    const userId = req.session.userId;
    // let userInfo = await ThirdPartyEmailPassword.getUserById(userId);
})

app.get(`/data`, verifySession(), async (req, res) => {
    const userId = req.session.userId;
    database.getList(userId)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/update-budget', (req, res) => {
    database.updateBudget(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/create-item', (req, res) => {
    database.createItem(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})



app.use(errorHandler())