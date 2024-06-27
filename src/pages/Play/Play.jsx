import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

let wordColor = ['Amarrillo', 'Azul', 'Negro', 'Rojo', 'Morado', 'Verde']
let hexColor = ['#C6D200', '#007DFF', '#000', '#FF0000', '#7200FF', '#00FF1E']

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

function getHexColor(){
    return hexColor[getRandomInt(hexColor.length)]
}

function getWordColor(){
    return wordColor[getRandomInt(wordColor.length)]
}

function calScore(correctWord, missWord){
    let total = 0
    
    for(let i = 0; i < correctWord; i++){
        total = total + 5
    }

    for(let i = 0; i < missWord; i++){
        total = total - 3
    }

    return total
}

export default function Play(){

    const navigate = useNavigate()
    const [colorHex, setColorHex] = useState(getHexColor())
    const [colorWord, setColorWord] = useState(getWordColor())
    const [correctWord, setCorrectWord] = useState(0)
    const [missWord, setMissWord] = useState(0)

    let colorWordIndex = wordColor.indexOf(colorWord)
    let colorHexIndex = hexColor.indexOf(colorHex)

    function checkTrueWord(){
        if(colorWordIndex == colorHexIndex){
            setCorrectWord(correctWord + 1)
            setColorHex(getHexColor())
            setColorWord(getWordColor())
        }else{
            setMissWord(missWord + 1)
            setColorHex(getHexColor())
            setColorWord(getWordColor())
        }
    }

    function checkMissWord(){
        if(colorWordIndex !== colorHexIndex){
            setCorrectWord(correctWord + 1)
            setColorHex(getHexColor())
            setColorWord(getWordColor())
        }else{
            setMissWord(missWord + 1)
            setColorHex(getHexColor())
            setColorWord(getWordColor())
        }
    }

    const Timer = ({initialTime, onTimeUp}) => {
        const [time, setTime] = useState(initialTime)

        useEffect(() => {
            if(time > 0){
                const timerId = setTimeout(() => {
                    setTime(time - 1)
                }, 1000)
    
                return () => clearTimeout(timerId)
            }else{
                onTimeUp(() => setTime(initialTime))
            }
        }, [time, initialTime, onTimeUp])

        return(
            <>
                <h1>Tiempo restante {time}</h1>
            </>
        )
    }

    let onHandleTime = ((resetTime) => {
        setMissWord(missWord + 1)
        setColorHex(getHexColor())
        setColorWord(getWordColor())
        resetTime()
    })

    useEffect(() => {
        if(correctWord + missWord == 20){
            navigate('/score')
        }
    }, [correctWord, missWord])

    let diffi = localStorage.getItem('dificultad')
    let time = 0

    if(diffi == 'facil'){
        time = 6
    }else if(diffi == 'medio'){
        time = 4
    }else if(diffi == 'dificil'){
        time = 2
    }

    let score = calScore(correctWord, missWord)
    if(score <= 0){
        score = 0
    }

    localStorage.setItem('correctas', correctWord)
    localStorage.setItem('incorrectas', missWord)
    localStorage.setItem('puntaje', score)


    return(
        <>
            <h2>Correctas: {correctWord}</h2>
            <h1 style={ {color : colorHex} }>{colorWord}</h1>
            <button onClick={() => {checkTrueWord()}}>Correct</button>
            <button onClick={() => {checkMissWord()}}>Falso</button>
            <Timer initialTime={time} onTimeUp={onHandleTime}/>
        </>
    )
}