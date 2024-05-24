const useState = <T>(initialState: T): [() => T, (newState: T) => void] => {
    let state: T | undefined;
    if (!state) {
        state = initialState;
    }

    const setState = (newState: T): void => {
        state = newState
    }
    return [() => state as T, setState];
};

const [count, setCount] = useState(1);
console.log(count());
setCount(2); // Corrected function call
console.log(count());
