import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import DateBox from 'devextreme-react/date-box';
import TextArea from 'devextreme-react/text-area';
import { createBorrowRegister } from '../../api/borrowRegister'

function Cart() {
    const cookies = new Cookies();
    const [cart, setCart] = useState(cookies.get('cart'))
    const [registerForm, setRegisterForm] = useState({
        note: "",
        planReturnDate: new Date().toISOString(),
        bookTitileIds: cart.map(book => book.id)
    })

    function handleRegister() {
        createBorrowRegister({
            note: registerForm.note,
            planReturnDate: registerForm.planReturnDate,
            bookIds: registerForm.bookTitileIds
        }).then(res => {
            setCart([])
            setRegisterForm(form => ({
                ...form, bookTitileIds: []
            }))
            cookies.set('cart', [])
        }).catch(err => {
            console.log(err)
        })
    }

    function handleChange(name) {
        return (e) => {
            const value = e.value;
            setRegisterForm(values => ({ ...values, [name]: value }))
        }
    }

    function handleRemove(bookId) {
        return () => {
            const newCart = cart.filter(book => book.id != bookId)
            cookies.set('cart', newCart)
            setCart(newCart)
            setRegisterForm(form => ({
                ...form, bookTitileIds: newCart.map(book => book.id)
            }))
        }
    }

    function renderItems() {
        const bookItems = cart.map(book => {
            return (
                <div key={book.id}>
                    <div className="row mb-4 d-flex justify-content-between align-items-center">
                        <div className="col-2">
                            <img
                                src={book.image}
                                className="img-fluid rounded-3" alt={book.title} />
                        </div>
                        <div className="col-8 text-start">
                            <h6 className="text-muted">{book.author}</h6>
                            <h6 className="text-black mb-0">{book.title}</h6>
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-danger' onClick={handleRemove(book.id)}><FontAwesomeIcon icon={"x"}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <hr className="my-4"></hr>
                </div>
            )
        })

        return bookItems
    }

    return (
        <div className="container pt-2">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card card-registration card-registration-2" style={{ "border-radius": "15px;" }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-8">
                                    <div className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h1 className="fw-bold mb-0 text-black">Your Cart</h1>
                                            <h6 className="mb-0 text-muted">{cart.length} books</h6>
                                        </div>
                                        <hr className="my-4"></hr>
                                        {renderItems()}
                                    </div>
                                </div>
                                <div className="col-lg-4 bg-grey">
                                    <div className="p-5 px-3">
                                        <div className="mb-3">
                                            <div className="form-label text-start">Return date:</div>
                                            <DateBox
                                                className="form-control"
                                                defaultValue={registerForm.planReturnDate}
                                                type="datetime"
                                                onValueChanged={handleChange('planReturnDate')} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-label text-start">Note:</div>
                                            <TextArea
                                                height={90}
                                                value={registerForm.note}
                                                className="form-control"
                                                onValueChanged={handleChange('note')} />
                                        </div>
                                        <button type="button" class="btn btn-outline-primary w-100" onClick={handleRegister}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart