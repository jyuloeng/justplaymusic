import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  incrementByAmount,
  decrement,
  selectCount,
} from "../store/slice/counterSlice";

export interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(3))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
