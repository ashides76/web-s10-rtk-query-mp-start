import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice'
import { useGetQuotesQuery, useToggleFakeMutation, useDeleteQuoteMutation } from '../state/quotesApi'

export default function Quotes() {
  const {data: quotes, isLoading: quotesLoading, isFetching: quotesRefreshing } = useGetQuotesQuery()
  const [toggleFake, {error: toggleError, isLoading: quotesToggling}] = useToggleFakeMutation()
  const [deleteQuote, {isSuccess: success}] = useDeleteQuoteMutation()

  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  return (
    <div id="quotes">
      <div className="error">{toggleError && toggleError.data.message}</div>
      <div className="success">{success && 'Quote deleted successfully!'}</div>
      <h3>Quotes {(quotesToggling || quotesRefreshing) && 'Being updated...'}</h3>
      <div>
        {
          quotesLoading ? 'Quotes loading...' :
          quotes?.filter(qt => {
            return displayAllQuotes || !qt.apocryphal
          })
            .map(qt => 
            (
              <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id) }>DELETE</button>
                  <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                  <button onClick={() => toggleFake({id: qt.id, quote: {apocryphal: !qt.apocryphal}})}>FAKE</button>
                </div>
              </div>
            ))
          }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
