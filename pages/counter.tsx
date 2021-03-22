import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { increment, decrement, selectCount } from "../store/slice/counterSlice";

export interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
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
