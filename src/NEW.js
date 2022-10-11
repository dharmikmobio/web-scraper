import React, { useEffect } from 'react'
import Microlink from '@microlink/react'
import mql from '@microlink/mql';

const NEW = (props) => {

    useEffect(() => {
        async function fetchData() {
            const {  data } = await mql(props.data)
            console.log("DATA:::->", data)
        }
        fetchData();

    }, [props])

    // })
    console.log("props?.data", props?.data)
    return (
        <>
            <Microlink url={props.data} />
        </>
    )
}

export default NEW
