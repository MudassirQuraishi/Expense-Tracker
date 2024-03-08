/* eslint-disable react/prop-types */

import { MdMapsHomeWork } from 'react-icons/md';
import { FaArrowUp } from 'react-icons/fa';
import classes from './RecentCards.module.css';
import { useSelector } from 'react-redux';

const RecentCards = ({ openExpenseHandler }) => {
    const organisedExpenses = useSelector(state => state.expense.organisedExpenses)
    const categories = Object.keys(organisedExpenses);
    return (
        <>
            {categories.map((category) => {
                const categoryExpenses = organisedExpenses[category];
                const totalPrice = categoryExpenses.reduce((total, expense) => total + expense.amount, 0);

                const categoryExpenseItems = categoryExpenses.map((expense) => (
                    <div className={classes['expense-data']} key={expense._id} id={expense._id} onClick={openExpenseHandler}>
                        <div className={classes['expense-data-container-1']}>
                            <p>{expense.item}</p>
                        </div>
                        <div className={classes['expense-data-container-2']}>
                            <p>{expense.amount}</p>
                            <small>{expense.date}</small>
                        </div>
                    </div>
                ));

                return (
                    <div key={category} className={classes['expense-cards']}>
                        <div className={classes['type-container']}>
                            <div className={classes['logo-container']}>
                                <MdMapsHomeWork style={{ height: '40px', width: '30px', margin: '4px 5px' }} />
                            </div>
                            <div className={classes['text-container']}>
                                <div className={classes['data-container-1']}>
                                    <p>{category}</p>
                                    <h5>${totalPrice}</h5>
                                </div>
                                <div className={classes['data-container-2']}>
                                    <div>
                                        <p>15%</p>
                                        <FaArrowUp color='red' />
                                    </div>
                                    <p>Compared to last month</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes['recent-container']}>{categoryExpenseItems}</div>
                    </div>
                );
            })}
        </>
    );
};

export default RecentCards;
