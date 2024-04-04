import { describe, expect, it } from "vitest";
import Login from "./Login";
import { render, screen, fireEvent } from '@testing-library/react'
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
    it("validates user entered email", () => {
        render(<Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>);

        const emailInput = screen.getByTestId("email-test-login");
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        expect(emailInput.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(emailInput).toHaveValue("test@example.com")
    });
    it("validates user entered password", () => {
        render(<Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>);

        const passwordInput = screen.getByTestId("password-test-login");
        fireEvent.change(passwordInput, { target: { value: "Password123!" } });

        expect(passwordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        expect(passwordInput).toHaveValue("Password123!");
    });



})