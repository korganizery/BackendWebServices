import { Button } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../../../models/slices";

import styles from "./styles.module.scss";

export default function Counter() {
    const count = useSelector((state: { counter: { value: number } }) => state.counter.value);
    const { increment, decrement } = counterSlice.actions;
    const dispatch = useDispatch()
    const handleIncrement = () => {
        dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }
    return (
        <div className={styles.counter}>
            <Button
                aria-label="Increment value"
                onClick={handleIncrement}
            >
                Increment
            </Button>
            <p>{count}</p>
            <Button
                aria-label="Decrement value"
                onClick={handleDecrement}
            >
                Decrement
            </Button>
        </div>
    )
}