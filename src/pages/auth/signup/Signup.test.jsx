import { describe, expect, it, } from "vitest";
import Signup from "./Signup";
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../utilities/redux-store/store'

describe("Signup", () => {
    it("renders email input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("email-test")).toBeInTheDocument();
    })
    it("renders password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("password-test")).toBeInTheDocument();
    })
    it("renders password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("confirm-password-test")).toBeInTheDocument();
    })
})