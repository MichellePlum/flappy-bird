import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import BottomLayot from './components/BottomLayot';
import FlappyObject from './components/FlappyObject';
import Pipes from './components/Pipes';
import BgImage from './images/background.jpg';
import Clouds from './components/Clouds';
import useTimer from './hooks/useTimer';
import { formatTime } from './hooks/index';

export default function App() {
  const screenWidth = Dimensions.get("screen").width // רוחב המסך
  const screenHeigth = Dimensions.get("screen").height // גובה המסך

  const flappyObjectLeft = screenWidth / 2 //למקד את האובייקט לפי חצי רוחב של המסך (באמצע)
  const [flappyObjectBottom, setflappyObjectBottom] = useState(screenHeigth / 2) //למקד את האובייקט לפי חצי גובה של המסך (באמצע)

  const [pipesLeft, setPipesLeft] = useState(screenWidth / 2 - 30) // למקד עמוד ראשון לפי רוחב של חצי מסך (באמצע)
  const [pipesLeftSec, setPipesLeftSec] = useState(screenWidth) //למקד עמוד ראשון לפי רוחב של המסך (בצד ימין)
  const [pipesRandHeight, setPipesRandHeight] = useState(0)
  const [pipesRandHeightSec, setPipesRandHeightSec] = useState(0) 

  const pipesWidth = 60 //רוחב עמוד
  const pipesHeight = 450 //גובה עמוד
  const gap = 170 //מרחק בין עמודים
  const gravity = 4 // מהירות הנפילה של האובייקט
  let timerId
  let pipesLeftTimerId
  let pipesLeftTimerIdSec
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [startGame, setstartGame] = useState(false)
  const { timer, handleStart, handlePause, handleReset } = useTimer(0)

  const onPressToStart = () => { 
    let styleBut = document.getElementById('buttonStart')
    if(!startGame){
    alert("Start the game?")
    setstartGame(true)
    handleStart()
    styleBut.style.display='none'
    }
  }


//--------------------------------//נפילה של האובייקט
  useEffect(() => {
    if (flappyObjectBottom > 0 && startGame) { //אם המיקום של האובייקט גדול מ0, תפעיל מתודת טיימר אשר קוראת לפונקצייה כל כמה זמן (30). וכל פעם תחסיר מהגובה
      timerId = setInterval(() => {
        setflappyObjectBottom(flappyObjectBottom => flappyObjectBottom - gravity)
      }, 30)
      return () => {
        clearInterval(timerId) // setInterval כדי לבטל חייבים לבצע איפוס 
      }
    }
  }, [flappyObjectBottom, startGame])

//--------------------------------// onPress - ביצוע קפיצה של האובייקט
  const jump = () => { 
    if (!isGameOver && (flappyObjectBottom < screenHeigth)) //אם המשחק לא נגמר וגם לא הגעת לסוף של המסך(לפי גובה) - תקפוץ ב55
    setflappyObjectBottom(flappyObjectBottom => flappyObjectBottom + 55)
  }

//--------------------------------// (pipesLeft - 10) ההגעת העמוד בעזרת מתודה אשר קוראת לפונקציה כל כמה זמן (30). הפונקציה מחסירה מרוחב של המסך. כך העמוז זז שמאלהsetInterval
  useEffect(() => {
    if(startGame){
    if(pipesLeft > -pipesWidth && startGame){
      if(score < 5) { // הגדלת מהירות לפי נקודות
      pipesLeftTimerId = setInterval(() => {
         setPipesLeft(pipesLeft => pipesLeft - 11)
      }, 30)}
      else if(score >= 5) { // הגדלת מהירות לפי נקודות
        pipesLeftTimerId = setInterval(() => {
           setPipesLeft(pipesLeft => pipesLeft - 13)
      }, 30)}
      else if(score >= 10) { // הגדלת מהירות לפי נקודות
        pipesLeftTimerId = setInterval(() => {
           setPipesLeft(pipesLeft => pipesLeft - 15)
      }, 30)}
      else { // הגדלת מהירות לפי נקודות
        pipesLeftTimerId = setInterval(() => {
           setPipesLeft(pipesLeft => pipesLeft - 20)
      }, 30)}
    return () => {
      clearInterval(pipesLeftTimerId) // setInterval כדי לבטל חייבים לבצע איפוס 
    }
  } else {
    setScore(score => score + 1) //  חישוב נקודות
    setPipesLeft(screenWidth) // איפוס מיקום העמוד למצב התחלתי
    setPipesRandHeight( - Math.random() * 200) // חישוב גובה דינמי עבור עמודים
  }}
  }, [pipesLeft, startGame])

//--------------------------------// (pipesLeftSec - 10) ההגעת העמוד בעזרת מתודה אשר קוראת לפונקציה כל כמה זמן (30). הפונקציה מחסירה מרוחב של המסך. כך העמוז זז שמאלהsetInterval 
  useEffect(() => { 
    if(startGame){
    if(pipesLeftSec > -pipesWidth){
      if(score < 5) { // הגדלת מהירות לפי נקודות
        pipesLeftTimerIdSec = setInterval(() => {
        setPipesLeftSec(pipesLeftSec => pipesLeftSec - 11)
        }, 30)}
        else if(score >= 5) { // הגדלת מהירות לפי נקודות
          pipesLeftTimerIdSec = setInterval(() => {
          setPipesLeftSec(pipesLeftSec => pipesLeftSec - 13)
        }, 30)}
        else if(score >= 10) { // הגדלת מהירות לפי נקודות
          pipesLeftTimerIdSec = setInterval(() => {
          setPipesLeftSec(pipesLeftSec => pipesLeftSec - 15)
        }, 30)}
        else { // הגדלת מהירות לפי נקודות
          pipesLeftTimerIdSec = setInterval(() => {
          setPipesLeftSec(pipesLeftSec => pipesLeftSec - 20)
        }, 30)}
    return () => {
      clearInterval(pipesLeftTimerIdSec) // setInterval כדי לבטל חייבים לבצע איפוס 
    }
  } else {
    setScore(score => score + 1) //  חישוב נקודות
    setPipesLeftSec(screenWidth) // איפוס מיקום העמוד למצב התחלתי
    setPipesRandHeightSec( - Math.random() * 200) // חישוב גובה דינמי עבור עמודים
    }}
  }, [pipesLeftSec, startGame])

//--------------------------------// (אם כן - המשחק נגמר) בדיקת פגיעה בעמודים
  useEffect(() => {  
  if (((flappyObjectBottom < (pipesRandHeight + pipesHeight + 35) ||
    flappyObjectBottom > (pipesRandHeight + pipesHeight + gap -35)) &&
    (pipesLeft > screenWidth/2 -35 && pipesLeft < screenWidth/2 + 35))
    || 
    ((flappyObjectBottom < (pipesRandHeightSec + pipesHeight + 35) ||
    flappyObjectBottom > (pipesRandHeightSec + pipesHeight + gap -35)) &&
    (pipesLeftSec > screenWidth/2 -35 && pipesLeftSec < screenWidth/2 + 35)))
    gameOver() // אם אחד התנאים מתקיים - משחק נגמר
})

//--------------------------------GameOver
const gameOver = () => {
  clearInterval(timerId) // setInterval כדי לבטל חייבים לבצע איפוס 
  clearInterval(pipesLeftTimerId) // setInterval כדי לבטל חייבים לבצע איפוס 
  clearInterval(pipesLeftTimerIdSec) // setInterval כדי לבטל חייבים לבצע איפוס 
  setIsGameOver(true)
  setstartGame(false)
  handlePause()
}

  return ( 
    <View >
    <View>
    <button id='buttonStart' onClick={onPressToStart} style={{
      height: '100vh',
      position: 'absolute',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#33554af2',
      border: 'none',
      color: 'white',
      fontSize: '60px'
    }}> START GAME </button>
    </View>

    <TouchableWithoutFeedback onPress={jump}> 
    <View style={styles.container}>

    { !isGameOver && <h3 style={{fontSize: '30px', textAlign: 'left', marginTop: '20vh', zIndex: 5}}> 
    TIME: {formatTime(timer)} <br/>  SCORE: {score} </h3>}  
    { isGameOver && <h1 style={{display:'flex', justifyContent:'center', alignSelf:'center', textAlign:'center', alignItems:'center', height:'500px', width:'850px', backgroundColor:'#33554af2', color:'white', borderRadius:'50px', fontSize: '50px', zIndex: 4, marginTop: '23vh'}}>
    GAME OVER! <br/><br/> YOUR SCORE: {score} <br/><br/> TIME: {formatTime(timer)}</h1>}

    <FlappyObject 
    flappyObjectBottom = {flappyObjectBottom} 
    flappyObjectLeft = {flappyObjectLeft}/> 

    <Pipes 
    pipesHeight = {pipesHeight}
    pipesWidth = {pipesWidth}
    pipesLeft = {pipesLeft}
    gap = {gap}
    randBottom = {pipesRandHeight}/>  

   <Pipes
    pipesHeight = {pipesHeight}
    pipesWidth = {pipesWidth}
    pipesLeft = {pipesLeftSec}
    gap = {gap}
    randBottom = {pipesRandHeightSec}/>  
    <BottomLayot />
    <Clouds/>
    </View>
    </TouchableWithoutFeedback>
    </View>
  );}

const styles = StyleSheet.create({
    container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    position: 'relative',
    backgroundImage: "url(" + BgImage + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  },
});