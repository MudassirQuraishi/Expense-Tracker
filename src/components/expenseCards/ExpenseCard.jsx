/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
// import { toast } from 'sonner'
import axios from 'axios'

import Modal from '../modal/Modal'
import classes from './ExpenseCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../../utilities/redux-store/slices/expenseSlice'

const ExpenseCard = (props) => {
    const dispatch = useDispatch()
    const [expenseDetails, setExpenseDetails] = useState(null)
    const token = useSelector(state => state.auth.authToken)
    const itemRef = useRef({ current: '' });
    const locationRef = useRef({ current: '' });
    const paymentRef = useRef({ current: '' });
    const priceRef = useRef({ current: '' });
    const dateRef = useRef({ current: '' });
    const categoryRef = useRef({ current: '' });


    const onDeleteHanlder = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/delete-expense/${props.expenseId}`,
                {
                    headers: { Authorization: token }
                }
            )
            props.closeHandler()
            dispatch(expenseActions.deleteExpense(props.expenseId))

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        const getExpenseDetails = async () => {
            const response = await axios.get(`http://localhost:8080/api/get-expense/${props.expenseId}`,
                {
                    headers: {
                        Authorization: token
                    }
                });

            itemRef.current.value = response.data.expenseData.item;
            locationRef.current.value = response.data.expenseData.location;
            paymentRef.current.value = response.data.expenseData.paymentType;
            priceRef.current.value = response.data.expenseData.amount;
            categoryRef.current.value = response.data.expenseData.category;
            // Format the date to 'yyyy-mm-dd'
            const dateObject = new Date(response.data.expenseData.date);
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObject.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // Set the value of the date input
            dateRef.current.value = formattedDate;
            setExpenseDetails(response.data.expenseData)
        }
        getExpenseDetails()


    }, [props.expenseId, token])
    if (!expenseDetails) {
        return;
    }





    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const expenseDetails = {
            item: itemRef.current.value,
            location: locationRef.current.value,
            date: dateRef.current.value,
            paymentType: paymentRef.current.value,
            amount: priceRef.current.value,
            category: categoryRef.current.value,
        }

        const response = await axios.put(`http://localhost:8080/api/update-expense/${props.expenseId}`, expenseDetails,
            {
                headers: { Authorization: token }
            }
        )
        dispatch(expenseActions.updateExpense(response.data.updatedExpense))
        props.closeHandler()

    }
    return <>
        <Modal>
            <form className="form-conatiner" onSubmit={formSubmitHandler}>
                <div className={`${classes['form-control']}`}>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this what you spent on?</label>
                        <input type="text" placeholder="Ex: Movie Ticktes, GTR 5...." ref={itemRef} />
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this where you spent?</label>
                        <input type="text" placeholder="Ex: UV Cinemas, MG Mobiles...." ref={locationRef} />
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this category correct?</label>
                        <select name="" id="" ref={categoryRef}>
                            <option defaultChecked>Select a Category</option>
                            <option value="housing & bills">Housing and Bills</option>
                            <option value="food">Food</option>
                            <option value="transportation">Transportation</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="shopping">Shopping</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this how you spent?</label>
                        <select name="" id="" ref={paymentRef}>
                            <option defaultChecked>Select a method</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                            <option value="cash">Cash</option>
                            <option value="emi">EMI</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this when you spent?</label>
                        <input type='date' placeholder="Ex: Rs.1000, Half my salary...." ref={dateRef} />
                    </div>
                    {/* <div className={`${classes['form-group']}`}>
                        <label htmlFor="">How did you buy?</label>
                        <select name="" id="">
                            <option defaultChecked>Select an option</option>
                            <option value="">Credit</option>
                            <option value="">Debit</option>
                            <option value="">Cash</option>
                            <option value="">EMI</option>
                        </select>
                    </div> */}
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Is this how much you spent?</label>
                        <input type="number" placeholder="Ex: Rs.1000, Half my salary...." ref={priceRef} />
                    </div>
                </div>
                <div className={`${classes['form-actions']}`} >
                    <button type='reset' onClick={onDeleteHanlder}>Delete Expense</button>
                    <button type='submit'>Update Expense</button>
                    <button onClick={() => { props.closeHandler() }}>Cancel</button>
                </div>
            </form>
        </Modal>
    </>

}

export default ExpenseCard