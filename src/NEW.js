import React,{useEffect} from 'react'
import Microlink from '@microlink/react'
import mql from '@microlink/mql';

const NEW = async(props) => {
    useEffect(async () => {
        const {data} = await mql(
            "https://www.instagram.com/p/BeV6tOhFUor/"
        )
        console.log('data', data)
    
     
    }, [])
    
    return (
            <Microlink
            url='https://www.instagram.com/p/BeV6tOhFUor/'
            // setData={{ title: 'SENTRY ACTIVATED' }}
          />
        // <h1>Heel</h1>
    )
}

export default NEW
