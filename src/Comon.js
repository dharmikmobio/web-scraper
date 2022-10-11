import './App.css'
import React, { useState } from "react"
// import parse from "html-react-parser"
import axios from "axios"
// import { Helmet } from "react-helmet"
import JSONPretty from 'react-json-pretty';
// import EmbedContainer from "react-oembed-container"
import { Input, Button } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-json-pretty/themes/monikai.css';
import NEW from './NEW';
import mql from '@microlink/mql';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
// import ReactHtmlParser from 'react-html-parser';

const API_KEY = "ce85ecff19fbd7dba1cf97"

export default function OEmbed(props) {
    const [url, setUrl] = useState("")
    const [html, setHtml] = useState({ __html: "<div />" })
    const [embed, setEmbed] = useState()
    const [title, setTitle] = useState()
    const [da, setDa] = useState()
    const [ifr, setIfr] = useState({ __html: "<div />" })

    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };


    const submitUrl = async () => {
        const oembed = await axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`)
        const iframely = await axios.get(`https://iframe.ly/api/iframely?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`)
        const { data } = await mql(url)

        console.log("RES", oembed)
        console.log("iframely:::->", iframely)
        console.log("DATA:::->", data)

        setHtml({ __html: oembed.data.html })
        setEmbed(oembed.data.html)
        setTitle(oembed.data)
        setDa(data)
        setIfr({ __html: iframely.data.html });
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
                {/* <div className="container"> */}
                    <Tabs>
                        <TabList>
                            <Tab>Iframely</Tab>
                            <Tab>Microlink</Tab>
                            <Tab>Embed</Tab>
                        </TabList>
                        <TabPanel>
                            <div style={{ margin: "50px" }} >
                                <div dangerouslySetInnerHTML={html} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <NEW data={url} />
                        </TabPanel>
                        <TabPanel>
                            <div className='mainbox'>
                                <div className="container" style={{ width: "40%" }}>
                                    <div className="code-snippet" >
                                        <div className="code-section card card-text">
                                            {embed}
                                            <CopyToClipboard text={embed} onCopy={onCopyText}>
                                                <span>{isCopied ? "Copied!" : <MdContentCopy style={{ color: "yellow", fontSize: "30px" }} />}</span>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ margi: "10px", padding: "10px", width: "40%" }}>
                                    <div dangerouslySetInnerHTML={ifr}></div>
                                </div>

                            </div>
                            {/* <div style={{ display: "flex", flexDirection: "row", margi: "10px", padding: "10px" }}>
                                <div className="card card-text" style={{ margi: "10px", padding: "10px" }}>
                                    {embed}
                                    <CopyToClipboard text={embed} onCopy={onCopyText}>
                                        <span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
                                    </CopyToClipboard>
                                </div>
                                <div className="card" style={{ margi: "10px", padding: "10px" }}>
                                    <div dangerouslySetInnerHTML={ifr}></div>
                                </div>
                            </div> */}
                            {/* <div className="frame-container" style={{ margin: "50px", width: "40%", height: "40%" }} > */}
                            {/* <JSONPretty data= style={{height:"40%"}} /> */}
                            {/* {embed}
                            </div> */}
                            {/* <div class="wrapper"> */}
                            {/* </div> */}

                        </TabPanel>
                    </Tabs>
                {/* </div> */}
            </>
        )
    }
    return <div />
}