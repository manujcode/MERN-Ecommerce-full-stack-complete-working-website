import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import {
  
  selectCount,
} from './counterSlice';

// 
export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  // const incrementValue = Number(incrementAmount) || 0;


  return (
    <div>
     hii
    </div>
  );
}
