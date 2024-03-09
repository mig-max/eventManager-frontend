
import { useEffect } from 'react'
import { themeChange } from 'theme-change'



function HomePage() {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
      }, [])

    return (
        <div>
            <h1>All your events in<br/><span>XXXXX (city name)</span></h1>
            

 

        </div>
    );
}

export default HomePage;