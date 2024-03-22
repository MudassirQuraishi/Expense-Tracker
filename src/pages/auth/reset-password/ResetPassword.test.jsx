import { describe, expect, it } from "vitest";
import ResetPassword from "./ResetPassword";
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../utilities/redux-store/store'

describe("Login", () => {
    it("renders password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("password-test-reset")).toBeInTheDocument();
    })
    it("renders confirm password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("confirm-password-test-reset")).toBeInTheDocument();
    });

    it("validates user entered password", () => {
        render(<Provider store={store}>
            <Router>
                <ResetPassword />
            </Router>
        </Provider>);

        const passwordInput = screen.getByTestId("password-test-reset");
        fireEvent.change(passwordInput, { target: { value: "Password123!" } });

        expect(passwordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        expect(passwordInput).toHaveValue("Password123!");

    });
    it("confirms user entered password", () => {
        render(<Provider store={store}>
            <Router>
                <ResetPassword />
            </Router>
        </Provider>);

        const passwordInput = screen.getByTestId("password-test-reset");
        const confirmPasswordInput = screen.getByTestId("confirm-password-test-reset");
        fireEvent.change(passwordInput, { target: { value: "Password123!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "Password123!" } });

        expect(passwordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        expect(confirmPasswordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        expect(passwordInput).toHaveValue("Password123!");
        expect(confirmPasswordInput).toHaveValue(passwordInput.value);
    });

})