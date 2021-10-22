import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Common/Navbar/Navbar";
import Intro from "./Screens/Intro/Intro";
import Signin from "./Screens/Signin/Signin";
import Verification from "./Screens/Verification/Verification";
import Customize from "./Screens/Customize/Customize";
import Authentication from "./Screens/Authentication/Authentication";

const isAuth = false;
const isVerified = true;

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <GuestRoute path="/" exact={true}>
                        <Intro/>
                    </GuestRoute>
                    <GuestRoute path="/verification">
                        <Verification />
                    </GuestRoute>
                    <AuthenticationRoute path = "/customize">
                        <Customize/>
                    </AuthenticationRoute>
                    <AuthenticationRoute path = "/authentication">
                        <Authentication/>
                    </AuthenticationRoute>
                    <ProtectedRoute path = "/rooms">

                    </ProtectedRoute>
                    <GuestRoute path="/signin">
                        <Signin />
                    </GuestRoute>
                </Switch>
            </BrowserRouter>
        </>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/rooms",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

const AuthenticationRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isVerified ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};


export default App;
