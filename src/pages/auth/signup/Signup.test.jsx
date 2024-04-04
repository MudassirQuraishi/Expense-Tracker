// import { describe, expect, it, beforeAll, test, expectTypeOf } from "vitest";
// import Signup from "./Signup";
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import axios from "axios";

// import store from '../../../utilities/redux-store/store';

// const BEFORE_ALL_TIMEOUT = 3000;
// describe("Signup", () => {
//     it("renders email input field", () => {
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Signup />
//                 </Router>
//             </Provider>
//         );
//         expect(screen.getByTestId("email-test")).toBeInTheDocument();
//     });

//     it("renders password input field", () => {
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Signup />
//                 </Router>
//             </Provider>
//         );
//         expect(screen.getByTestId("password-test")).toBeInTheDocument();
//     });

//     it("renders confirm password input field", () => {
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Signup />
//                 </Router>
//             </Provider>
//         );
//         expect(screen.getByTestId("confirm-password-test")).toBeInTheDocument();
//     });
//     it("validates user entered email", () => {
//         render(<Provider store={store}>
//             <Router>
//                 <Signup />
//             </Router>
//         </Provider>);

//         const emailInput = screen.getByTestId("email-test");
//         fireEvent.change(emailInput, { target: { value: "test@example.com" } });

//         expect(emailInput.value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
//         expect(emailInput).toHaveValue("test@example.com")
//     });
//     it("validates user entered password", () => {
//         render(<Provider store={store}>
//             <Router>
//                 <Signup />
//             </Router>
//         </Provider>);

//         const passwordInput = screen.getByTestId("password-test");
//         fireEvent.change(passwordInput, { target: { value: "Password123!" } });

//         expect(passwordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
//         expect(passwordInput).toHaveValue("Password123!");

//     });
//     it("confirms user entered password", () => {
//         render(<Provider store={store}>
//             <Router>
//                 <Signup />
//             </Router>
//         </Provider>);

//         const passwordInput = screen.getByTestId("password-test");
//         const confirmPasswordInput = screen.getByTestId("confirm-password-test");
//         fireEvent.change(passwordInput, { target: { value: "Password123!" } });
//         fireEvent.change(confirmPasswordInput, { target: { value: "Password123!" } });

//         expect(passwordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
//         expect(confirmPasswordInput.value).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
//         expect(passwordInput).toHaveValue("Password123!");
//         expect(confirmPasswordInput).toHaveValue(passwordInput.value);
//     });


// });

// describe('Signup Api Mock', () => {
//     let response;
//     let body;
//     const signinData = {
//         email: 'mudassir.quraishi14@outlook.com',
//         password: 'Aeb872yk4!'
//     }

//     beforeAll(async () => {
//         try {
//             response = await axios.post('http://localhost:8080/auth/signup', signinData)
//             body = response.data
//         }
//         catch (error) {
//             response = error.response
//         }

//     }, BEFORE_ALL_TIMEOUT);
//     test('Should have response status 409', () => {
//         expect(response.status).toBe(409);
//     });

// })