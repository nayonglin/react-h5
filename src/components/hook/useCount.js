import {useState, useEffect} from 'react';

function useMyCount(number) {
    const [count, setCount] = useState(number);
    const count = number;
    useEffect(() => {
        
    })


    return count;
}

export default useMyCount;