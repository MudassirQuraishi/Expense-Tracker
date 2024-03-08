import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseGraph from '../../../components/chart/Chart';
import ExpenseForm from '../../../components/expenseForm/ExpenseFrom';
import ExpenseCard from '../../../components/expenseCards/ExpenseCard';
import { expenseActions } from '../../../utilities/redux-store/slices/expenseSlice';
import RecentCards from '../../../components/recentCards/RecentCards';


import classes from './Expenses.module.css';


const Expense = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.authToken);

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

        setExpenseId(e.target.id)
        setIsOpen(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/get-expenses',
                        {
                            headers: { Authorization: token }
                        }
                    )
                    dispatch(expenseActions.setExpenses(response.data.expenseData))

                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        fetchData()
    }, [token, dispatch])

    const organisedExpenses = useSelector(state => state.expense.organisedExpenses);

    const topFiveExpenses = useSelector(state => state.expense.topFiveExpenses);
    if (!organisedExpenses || !topFiveExpenses) {
        return;
    }

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
                    <RecentCards openExpenseHandler={openExpenseHanlder} />
                </div>
            </div>
        </div>
    </>
}
export default Expense