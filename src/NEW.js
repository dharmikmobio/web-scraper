import React,{useEffect} from 'react'
import Microlink from '@microlink/react'
import mql from '@microlink/mql';

const NEW = (props) => {
    // console.log('props', props)
    useEffect( () => {
        const {data} =  mql(
            props.data
        )
        console.log('data', data)
    
     
    },[props])
    
    return (
            // <Microlink
            // url='https://www.instagram.com/p/BeV6tOhFUor/'
            // setData={{ title: 'SENTRY ACTIVATED' }}
        //   />
        // <h1>Heel</h1>
        <Microlink url={props?.data}   {...props} />
    )
}

export default NEW
