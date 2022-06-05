import React, { useState } from 'react'
import Cookies from 'universal-cookie';

function BookCard(prop) {
    const cookies = new Cookies();
    const book = prop.book
    const cart = prop.cart

    let isAdded = false
    if (cart.some(b => b.id == book.id)) {
        isAdded = true
    }

    const [added, setAdded] = useState(isAdded)

    function handleAddCart() {
        cart.push(book)
        cookies.set('cart', cart)
        setAdded(true)
    }

    return (
        <div ref={prop.callback} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 shadow">
                <img src={book.image} className="card-img-top img-fluid" />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text"> {book.author}</p>
                    <button disabled={added} onClick={handleAddCart} type="button" className="btn btn-outline-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default BookCard