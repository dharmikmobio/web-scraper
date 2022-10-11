import React, { useState } from "react"
// import parse from "html-react-parser"
import axios from "axios"
import { Helmet } from "react-helmet"
import JSONPretty from 'react-json-pretty';
// import EmbedContainer from "react-oembed-container"
import { Input, Button } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-json-pretty/themes/monikai.css';
import NEW from './NEW';
import mql from '@microlink/mql';

const API_KEY = "ce85ecff19fbd7dba1cf97"

export default function OEmbed(props) {
    const [url, setUrl] = useState("")
    const [html, setHtml] = useState({ __html: "<div />" })
    const [title, setTitle] = useState()
    const [da, setDa] = useState()

    // useEffect(() => {
    //     axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`).then((res) => {
    //         console.log("res", res)
    //         setHtml({ __html: res.data.html })
    //     })
    // }, [])
    const submitUrl = async () => {
        const response = await axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`)
        const {  data } = await mql(url)

        console.log("DATA:::->", data)
        console.log("RES", response)

        setHtml({ __html: response.data.html })
        setTitle(response.data)
        setDa(data)
    }
    if (html) {
        // console.log(html, "::::--->>>html")
        return (
            <>
                <center style={{ margin: "50px" }}>
                    <div>
                        <label style={{ marginRight: "10px" }}>URL:</label>
                        <Input placeholder="Enter URL" type="text" style={{ width: "300px" }} name="url" onChange={(e) => setUrl(e.target.value)} />


                        <Button type="primary" onClick={submitUrl} style={{ marginLeft: "10px" }}>Submit</Button>

                    </div>
                </center>
                <Tabs>
                    <TabList>
                        <Tab>Iframely</Tab>
                        <Tab>Microlink</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="data">
                            <JSONPretty data={title} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="data">
                            <JSONPretty data={da} />
                        </div>
                    </TabPanel>


                </Tabs>
                <div className="container">
                    <Tabs>
                        <TabList>
                            <Tab>Iframely</Tab>
                            <Tab>Microlink</Tab>
                            <Tab>Embed</Tab>
                        </TabList>
                        <TabPanel>

                            <div style={{ margin: "50px" }} >
                                <Helmet>
                                    <script src="https://cdn.iframe.ly/embed.js" async></script>
                                </Helmet>
                                <div dangerouslySetInnerHTML={html} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <NEW data={url} />
                        </TabPanel>
                        <TabPanel>

                            <Helmet>
                                <script async src={`//cdn.iframe.ly/embed.js?api_key=${API_KEY}`}></script>
                                {/* <script src="https://cdn.iframe.ly/embed.js" async></script> */}
                            </Helmet>
                            <div className="iframely-embed">
                                <div className="iframely-responsive">
                                    <a data-iframely-url href={url}></a>
                                </div>
                            </div>
                            {/* <div dangerouslySetInnerHTML={html} /> */}
                        </TabPanel>
                    </Tabs>
                </div>
            </>
        )
    }
    return <div />
}