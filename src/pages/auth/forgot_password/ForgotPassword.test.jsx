// import { describe, expect, it } from "vitest";
// import ForgotPassword from "./ForgotPassword";
// import { Provider } from 'react-redux';
// import store from '../../../utilities/redux-store/store'
// import { render, screen } from "@testing-library/react";
// describe("Forgot Password", () => {
//     it("renders email input field", () => {
//         render(<Provider store={store}>
//             <ForgotPassword />
//         </Provider>)
//         const emailInput = screen.getByRole("input");
//         expect(emailInput).toBeInTheDocument()
//     })
// })
import { describe, expect, it } from "vitest";
import ForgotPassword from "./ForgotPassword";
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../utilities/redux-store/store'

describe("Login", () => {
    it("renders password input field", () => {
        render(
            <Provider store={store}>
                <Router>
                    <ForgotPassword />
                </Router>
            </Provider>
        );
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    })
    it("validates user entered email", () => {
        render(<Provider store={store}>
            <Router>
                <ForgotPassword />
            </Router>
        </Provider>);

        const emailInput = screen.getByRole("textbox");
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });

        expect(emailInput.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(emailInput).toHaveValue("test@example.com")
    });


})