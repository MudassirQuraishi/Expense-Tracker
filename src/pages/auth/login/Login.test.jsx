import { describe, expect, it } from "vitest";
import Login from "./Login";
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../utilities/redux-store/store'

describe("Login", () => {
    it("renders email input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("email-test-login")).toBeInTheDocument();
    })
    it("renders password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("password-test-login")).toBeInTheDocument();
    })

})