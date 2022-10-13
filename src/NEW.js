import React from 'react'
import Microlink from '@microlink/react'


const NEW = (props) => {  
    return (
        <Microlink url={props.data} {...props} />
    )
}
export default NEW
