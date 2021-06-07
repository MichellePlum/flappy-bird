import { useState, useRef } from 'react';

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState)
    const countRef = useRef(null)
  
    const handleStart = () => {
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    }
  
    const handlePause = () => {
      clearInterval(countRef.current)
    }
  
    const handleReset = () => {
      clearInterval(countRef.current)
      setTimer(0)
    }
   return { timer, handleStart, handlePause, handleReset }}
export default useTimer