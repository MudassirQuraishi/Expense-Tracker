import { useState } from 'react';
import classes from './Expenses.module.css'

import { MdMapsHomeWork } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import ExpenseGraph from '../../../components/chart/Chart';
import ExpenseForm from '../../../components/expenseForm/ExpenseFrom';
import { useExpenseHook } from '../../../utilities/customHooks/customHooks';
import ExpenseCard from '../../../components/expenseCards/ExpenseCard';
// import { useUserContext } from '../../../utilities/customHooks/UserContextHook';
const Expense = () => {
    const { organisedExpenses, topFiveExpenses } = useExpenseHook();
    const [expenseId, setExpenseId] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const closeHandler = () => {
        setIsFormOpen(false)
    }
    const expenseCloseHandler = () => {
        setIsOpen(false)
    }
    const openExpenseHanlder = (e) => {
        console.log(e.target)
        setExpenseId(e.target.id)
        setIsOpen(true)
    }




    if (!organisedExpenses || !topFiveExpenses) {
        return null;
    }





    const categories = Object.keys(organisedExpenses);

    const expenseCards = categories.map((category) => {
        const categoryExpenses = organisedExpenses[category];


        const totalPrice = categoryExpenses.reduce((total, expense) => total + expense.amount, 0);

        const categoryExpenseItems = categoryExpenses.map((expense) => (
            <>

                <div className={classes["expense-data"]} key={expense._id} id={expense._id} onClick={openExpenseHanlder}>
                    <div className={classes["expense-data-container-1"]}>
                        <p>{expense.item}</p>
                    </div>
                    <div className={classes["expense-data-container-2"]}>
                        <p>{expense.amount}</p>
                        <small>{expense.date}</small>
                    </div>
                </div>
            </>
        ));

        return (
            <div key={category} className={classes["expense-cards"]}>
                <div className={classes["type-container"]}>
                    <div className={classes["logo-container"]}>
                        <MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} />
                    </div>
                    <div className={classes["text-container"]}>
                        <div className={classes["data-container-1"]}>
                            <p>{category}</p>
                            <h5>${totalPrice}</h5>
                        </div>
                        <div className={classes["data-container-2"]}>
                            <div><p>15%</p><FaArrowUp color='red' /></div>
                            <p>Compared to last month</p>
                        </div>
                    </div>
                </div>
                <div className={classes["recent-container"]}>
                    {categoryExpenseItems}
                </div>

            </div>
        );
    });
    const expenseList = topFiveExpenses.map((expense) => {
        return <>
            <ul className={classes["expense-links"]} key={expense._id}>
                <li className={classes["expense-list"]}>{expense.item}</li>
                <li className={classes["expense-list"]}> {expense.location} </li>
                <li className={classes["expense-list"]}> {expense.date} </li>
                <li className={classes["expense-list"]}>{expense.paymentType} </li>
                <li className={classes["expense-list"]}>{expense.amount}</li>
            </ul> <hr />
        </>



    })
    return <>
        {isFormOpen && <ExpenseForm closeHandler={closeHandler} />}
        {isOpen && <ExpenseCard closeHandler={expenseCloseHandler} expenseId={expenseId} />}
        <div className={classes.container}>
            <div className={classes["expense-dashboard"]}>
                <div className={classes["title-container"]}> <p>Your Previous Expenses</p></div>
                <div className={classes["expense-container"]}>

                    <div className={classes["expense-header"]}>
                        <ul className={classes["header-links"]}>
                            <li className={classes["header-link"]}>Item</li>
                            <li className={classes["header-link"]}>Shop Name</li>
                            <li className={classes["header-link"]}>Date</li>
                            <li className={classes["header-link"]}>Payment Mode</li>
                            <li className={classes["header-link"]}>Amount</li>
                        </ul>
                        <hr />
                    </div>
                    <div className={classes["expense-links-container"]}>
                        {expenseList}
                    </div>
                    <div className={classes["expense-actions"]}>
                        <button>See All</button>
                        <button onClick={() => setIsFormOpen(true)}>Add Expense</button>
                    </div>
                </div>
            </div>

            <div className={classes["top-container"]}>
                <div className={classes["title-container"]}> <p>Expenses Comparison</p>  </div>
                <div className={classes["graph-container"]}>
                    <ExpenseGraph />
                </div>
            </div>
            <div className={classes["bottom-container"]}>
                <div className={classes["title-container"]}> <p>Expense Breakdown</p> </div>
                <div className={classes["card-container"]}>
                    {expenseCards}
                </div>
            </div>
        </div>
    </>
}
export default Expense