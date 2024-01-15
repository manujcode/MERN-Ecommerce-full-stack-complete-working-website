import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
import { selectOrder } from './orderSlice';


export function Counter() {
  const orders = useSelector(selectOrder);
  const dispatch = useDispatch();

  // const incrementValue = Number(incrementAmount) || 0;


  return (
    <div>
    // hii
    </div>
  );
}
