import { useRef } from 'react'
import axios from 'axios'

import Modal from '../Modal/Modal'
import classes from './ExpenseForm.module.css'
import { useUserContext } from '../../utilities/customHooks/UserContextHook'
const ExpenseForm = (props) => {
    const { token } = useUserContext()
    const itemRef = useRef('');
    const locationRef = useRef('');
    const paymentRef = useRef('');
    const priceRef = useRef('');
    const dateRef = useRef('');
    const onCloseHanlder = () => {
        // eslint-disable-next-line react/prop-types
        props.closeHandler()
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const expenseDetails = {
            item: itemRef.current.value,
            location: locationRef.current.value,
            date: dateRef.current.value,
            paymentType: paymentRef.current.value,
            amount: priceRef.current.value,
        }
        console.log(expenseDetails)
        const response = await axios.post('http://localhost:8080/api/add-expense', expenseDetails,
            {
                headers: { Authorization: token }
            }
        )
        console.log(response)
    }
    return <>
        <Modal>
            <form className="form-conatiner" onSubmit={formSubmitHandler}>
                <div className={`${classes['form-control']}`}>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">What did you buy?</label>
                        <input type="text" placeholder="Ex: Movie Ticktes, GTR 5...." ref={itemRef} />
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">Where did you Buy?</label>
                        <input type="text" placeholder="Ex: UV Cinemas, MG Mobiles...." ref={locationRef} />
                    </div>
                    <div className={`${classes['form-group']}`}>
                        <label htmlFor="">How did you buy?</label>
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
                        <label htmlFor="">When did you buy?</label>
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
                        <label htmlFor="">How much did you spend?</label>
                        <input type="number" placeholder="Ex: Rs.1000, Half my salary...." ref={priceRef} />

                    </div>
                </div>
                <div className={`${classes['form-actions']}`} >
                    <button type='reset' onClick={onCloseHanlder}>Cancel</button>
                    <button type='submit'>Add Expense</button>
                </div>
            </form>
        </Modal>
    </>

}

export default ExpenseForm