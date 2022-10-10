import React, { useState } from "react"
// import parse from "html-react-parser"
import axios from "axios"
import { Helmet } from "react-helmet"
// import EmbedContainer from "react-oembed-container"

const API_KEY = "ce85ecff19fbd7dba1cf97"

export default function OEmbed(props) {
    const [url, setUrl] = useState("")
    const [html, setHtml] = useState({ __html: "<div />" })

    // useEffect(() => {
    //     axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`).then((res) => {
    //         console.log("res", res)
    //         setHtml({ __html: res.data.html })
    //     })
    // }, [])
    const submitUrl = () => {
        axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`).then((res) => {

            console.log("res", res)
            setHtml({ __html: res.data.html })

        })
        
    }
    if (html) {
        console.log(html, "::::--->>>html")
        return (
            <>
                <center style={{margin:"50px"}}>
                <div>
                    <label style={{marginRight:"10px"}}>URL:</label>
                    <input type="text" style={{width:"300px"}} name="url" onChange={(e) => setUrl(e.target.value)} />
                    <button onClick={submitUrl} style={{marginLeft:"10px"}}>Submit</button>
                </div>
                </center>


                <div style={{margin:"50px"}}>
                    <Helmet>
                        <script src="https://cdn.iframe.ly/embed.js" async></script>
                    </Helmet>
                    <div dangerouslySetInnerHTML={html} />
                </div>
            </>
        )
    }
    return <div />
}