export default function Score(){
    let correctas = localStorage.getItem('correctas')
    let incorrectas = localStorage.getItem('incorrectas')
    let puntaje = localStorage.getItem('puntaje')

    return(
        <>
            <h1>Su puntaje: {puntaje}</h1>
            <h2>Correctas: {correctas}</h2>
            <h2>Incorrectas: {incorrectas}</h2>
        </>
    )
}