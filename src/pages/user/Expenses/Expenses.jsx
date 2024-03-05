import { useEffect } from 'react';
import classes from './Expenses.module.css'

import { MdMapsHomeWork } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import ExpenseGraph from '../../../components/chart/Chart';
import ExpenseForm from '../../../components/expenseForm/ExpenseFrom';
import { useState } from 'react';
import axios from 'axios';
// import { useUserContext } from '../../../utilities/customHooks/UserContextHook';
const Expense = () => {
    const [expenses, setExpenses] = useState(null)
    const token = localStorage.getItem('auth-token')
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/get-expenses',
                {
                    headers: { Authorization: token }
                }
            )
            setExpenses(response.data.expenseData)
        }
        fetchData()
    }, [token])
    const [isOpen, setIsOpen] = useState(false)
    const closeHandler = () => {
        setIsOpen(false)
    }
    if (!expenses) {
        return
    }
    const expenseList = expenses.map(expense => {
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
    console.log(expenses)
    return <>
        {isOpen && <ExpenseForm closeHandler={closeHandler} />}
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
                        <button onClick={() => setIsOpen(true)}>Add Expense</button>
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
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>
                    <div className={classes["expense-cards"]}>
                        <div className={classes["type-container"]}>
                            <div className={classes["logo-container"]}> <div><MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} /></div> </div>
                            <div className={classes["text-container"]}>
                                <div className={classes["data-container-1"]}>
                                    <p>Housing</p>
                                    <h4>$250.00</h4>
                                </div>
                                <div className={classes["data-container-2"]}>
                                    <div><p>15%</p><FaArrowUp color='red' /></div>
                                    <p>Compare to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes["recent-container"]}></div>

                    </div>

                </div>
            </div>
        </div>
    </>
}
export default Expense