import { useRoutes, BrowserRouter } from "react-router-dom"
import Play from "./Play/Play"
import Home from "./Home/Home"
import Settings from "./Settings/Settings"
import Score from "./Score/Score"

function AppRoutes(){
    let Routes = useRoutes([
        {path: '/', element: <Home/>},
        {path: '/play', element: <Play/>},
        {path: '/settings', element: <Settings/>},
        {path: '/score', element: <Score/>}
    ])

    return Routes
}

export default function App(){
    return(
        <>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </>
    )
}