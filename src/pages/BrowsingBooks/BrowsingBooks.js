import React, { useState, useRef, useCallback } from "react";
import LoadingContext from "../../context/LoadingContext";
import { getBookTitle } from "../../api/bookTitle";
import useBookSearch from "../../hooks/useBookSearch";

function BrowsingBooks() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { books, hasMore, loading, error } = useBookSearch(query, page, 2)
  const observer = useRef()

  const lastBookElementRef = useCallback(node => {
    console.log(node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPage(1)
  }

  function renderBooks() {
    return books.map((book, index) => {
      let callback = () => { }
      if (books.length === index + 1) {
        callback = lastBookElementRef
      }

      return (
        <div ref={callback} key={index} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <div className="card p-0 overflow-hidden h-100 shadow">
            <img src={book.image} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text"> {book.description}</p>
              <button
                type="button"
                className="btn btn-outline-primary">
                Details
              </button>
            </div>
          </div>
        </div>
      );
    })
  }

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">
          <div className="mb-3 col-4 mx-auto text-center">
            <label>Browsing</label>
            <input
              type="text"
              className="from-control"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
        {renderBooks()}
      </div>
    </section >
  );
}

export default BrowsingBooks;
