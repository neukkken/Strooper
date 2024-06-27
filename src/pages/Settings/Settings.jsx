import { useEffect, useState } from "react"

export default function Settings(){
    const [dif, setDif] = useState('facil')

    localStorage.setItem('dificultad', dif)

    return(
        <>
            <h1>Seleccione la dificultad</h1>
            <button onClick={() => {setDif('facil')}}>Facil (6 segs)</button>
            <button onClick={() => {setDif('medio')}}>Medio (4 segs)</button>
            <button onClick={() => {setDif('dificil')}}>Dificil (2 segs)</button>
            <h2>Actualmente es: {dif}</h2>
        </>
    )
}