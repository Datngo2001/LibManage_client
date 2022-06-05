import React, { useState, useRef, useCallback } from "react";
import { LoadIndicator } from 'devextreme-react/load-indicator';
import useBookSearch from "../../hooks/useBookSearch";
import Cookies from 'universal-cookie';
import BookCard from "../../components/BookCard/BookCard";

function BrowsingBooks() {
  const cookies = new Cookies();
  const cart = cookies.get('cart')

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { books, hasMore, loading, error } = useBookSearch(query, page, 2)
  const observer = useRef()

  const lastBookElementRef = useCallback(node => {
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
        <BookCard key={index} book={book} callback={callback} cart={cart}></BookCard>
      );
    })
  }

  return (
    <section className="pt-2 container">
      <input
        placeholder="Search books ..."
        type="text"
        className="form-control mb-3"
        value={query}
        onChange={handleSearch}
      />
      <div className="row justify-content-center">
        {renderBooks()}
      </div>
      <LoadIndicator visible={loading} className="m-auto" id="large-indicator" height={60} width={60} />
    </section >
  );
}

export default BrowsingBooks;
