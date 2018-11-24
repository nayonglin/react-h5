import {useState, useEffect} from 'react';

function useMyCount(number) {
    const [count, setCount] = useState(number);
    useEffect(() => {

    })

    return [count, setCount];
}
export default useMyCount;