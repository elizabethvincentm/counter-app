import React, { useReducer } from 'react'
import { ReactComponent as Add } from './assets/add.svg'
import { ReactComponent as Sub } from './assets/sub.svg'
import { ReactComponent as Delete } from './assets/delete.svg'
import { ReactComponent as Cart } from './assets/cart.svg'
import { ReactComponent as Reset } from './assets/reset.svg'
import { ReactComponent as Refresh } from './assets/refresh.svg'
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
      <div className="header">
        <Cart className="p-10" />
        <div className="total-items">
          {items.filter((item) => item.quantity > 0).length}
        </div>
        <div className="p-10">Items</div>
      </div>
      <div className="sub-header">
        <button className="button" onClick={() => dispatch({ type: 'reset' })}>
          <Reset />
        </button>

        <button
          className="button"
          disabled={items.length !== 0}
          onClick={() => dispatch({ type: 'initialize' })}
        >
          <Refresh />
        </button>
      </div>
      {items.map((item) => (
        <div className="item-row">
          <div
            style={{
              width: '100px',
            }}
          >
            {item.quantity ? (
              <span
                style={{
                  backgroundColor: 'yellow',
                  fontWeight: 'bold',
                  width: '50px',
                  padding: '10px',
                }}
              >
                {item.quantity}
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: 'goldenrod',
                  fontWeight: 'bold',
                  width: '50px',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                {' '}
                Zero
              </span>
            )}{' '}
          </div>
          <button
            className="button"
            onClick={() => dispatch({ type: 'increment', id: item.id })}
          >
            <Add />
          </button>{' '}
          <button
            className="button"
            onClick={() => dispatch({ type: 'decrement', id: item.id })}
          >
            <Sub />
          </button>
          <button
            className="button"
            onClick={() => dispatch({ type: 'remove', id: item.id })}
          >
            <Delete />
          </button>
        </div>
      ))}
    </div>
  )
}
