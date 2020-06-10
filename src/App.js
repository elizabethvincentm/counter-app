import React, { useReducer } from 'react'
import './App.css'

const initialState = [
  { id: 1, quantity: 0 },
  { id: 2, quantity: 0 },
  { id: 3, quantity: 0 },
  { id: 4, quantity: 0 },
]

const reducer = (state, action) => {
  const id = action.id
  switch (action.type) {
    case 'remove':
      return state.filter((item) => item.id !== id)
    case 'increment':
      return state.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    case 'decrement':
      return state.map((item) => {
        return item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      })
    case 'reset':
      return state.map((item) => ({ ...item, quantity: 0 }))
    case 'initialize':
      return initialState
    default:
      return state
  }
}
export default function App() {
  const [items, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <div>
        <div>Total</div>
        <div>{items.filter((item) => item.quantity > 0).length}</div>
      </div>
      <div>
        <span onClick={() => dispatch({ type: 'reset' })}>Reset</span>
      </div>
      <div>
        <button
          disabled={items.length !== 0}
          onClick={() => dispatch({ type: 'initialize' })}
        >
          Reload
        </button>
      </div>
      {items.map((item) => (
        <div className="">
          {item.quantity}
          <span onClick={() => dispatch({ type: 'increment', id: item.id })}>
            +
          </span>{' '}
          <span onClick={() => dispatch({ type: 'decrement', id: item.id })}>
            -
          </span>
          <span onClick={() => dispatch({ type: 'remove', id: item.id })}>
            delete
          </span>
        </div>
      ))}
    </div>
  )
}
