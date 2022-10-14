import './App.css'
import React, { useState } from "react"
import { Spin } from 'antd';
import axios from "axios"

import JSONPretty from 'react-json-pretty';

import { Input, Button } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-json-pretty/themes/monikai.css';
import NEW from './NEW';
import mql from '@microlink/mql';
// import Microlink from '@microlink/react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";


const API_KEY = "ce85ecff19fbd7dba1cf97"

export default function OEmbed() {
    const [url, setUrl] = useState("")
    const [loader, setLoader] = useState(false)
    const [html, setHtml] = useState({ __html: "<div />" })
    const [embed, setEmbed] = useState()
    const [title, setTitle] = useState()
    const [da, setDa] = useState()
    const [ifr, setIfr] = useState({ __html: "<div />" })
    const [ss, setSs] = useState("");
    const [helthcheck, setHelthcheck] = useState([]);
    const [helthurl, setHelthurl] = useState("");
    const [statusCode, setStatusCode] = useState("");
    const [fullSS, setFullSS] = useState("");
    const [technology, setTechnology] = useState([]);
    const [twitterimg, setTwitterimg] = useState();
    const [urlemail, setUrlemail] = useState([]);
    const [myoutube, setMyoutube] = useState();

    const [ydescription, setYdescription] = useState("");
    const [yimage, setYimage] = useState("");
    const [ylogo, setYlog] = useState("");
    const [ypublisher, setYpublisher] = useState("");
    const [ytitle, setYtitle] = useState("");
    const [yurl, setYurl] = useState("");

    const [isCopied, setIsCopied] = useState(false);


    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };
    const code = async ({ query, page, response }) => ({
        url: response && response.url(),
        statusCode: response && response.status(),
        headers: response && response.headers(),
        html: await page.content(),
    })

    const healthcheck = async (url, props) => {
        setLoader(true)
        const { data } = await mql(url, { apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc', function: code.toString(), meta: false, ...props })
        setLoader(false)
        return data
    }


    const screenshot = async (url, opts) => {
        setLoader(true)
        const { data } = await mql(url, {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
            meta: false,
            screenshot: true,
            ...opts
        })
        setLoader(false)
        return data.screenshot
    }
    const fullScreenshot = async (url, opts) => {
        setLoader(true)
        const { data } = await mql(url, {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
            meta: false,
            screenshot: true,
            fullPage: true,
            ...opts
        })
        setLoader(false)
        return data.screenshot
    }

    const technologyStack = async (url, opts) => {
        setLoader(true)
        const { data } = await mql(url, {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
            meta: false,
            insights: {
                lighthouse: false,
                technologies: true
            },
            ...opts
        })
        setLoader(false)
        return data.insights.technologies
    }

    const twitter = async (url, opts) => {
        setLoader(true)
        const result = await mql(url, {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
            data: {
                banner: {
                    selector: 'main a[href$="header_photo"] img',
                    attr: 'src',
                    type: 'image'
                },
                stats: {
                    selector: 'main',
                    attr: {
                        tweets: {
                            selector: 'div > div > div > div h2 + div'
                        },
                        followings: {
                            selector: 'a[href*="following"] span span'
                        },
                        followers: {
                            selector: 'a[href*="followers"] span span'
                        }
                    }
                },
                latestTweets: {
                    selectorAll: 'main article',
                    attr: {
                        content: {
                            selector: 'div[lang]',
                            attr: 'text'
                        },
                        link: {
                            selector: 'a',
                            attr: 'href'
                        }
                    }
                }
            },
            prerender: true,
            waitForSelector: 'main article',
            ...opts
        })
        if (result.data.stats.tweets) {
            result.data.stats.tweets = Number(
                result.data.stats.tweets.replace(' Tweets', '')
            )
        }
        setLoader(false)
        return result
    }
    const emails = async (url, opts) => {
        setLoader(true)
        const { data } = await mql(
            url,
            {
                apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
                meta: false,
                data: {
                    emails: {
                        selector: 'body',
                        type: 'email'
                    }
                },
            }
        )
        console.log(data)
        setLoader(false)
        return data
    }

    const youtube = async (url, opts) => {
        setLoader(true)
        const result = await mql(url, {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc',
            prerender: true,
            video: true,
            audio: true,
            data: {
                views: {
                    selector: '.view-count',
                    type: 'number'
                }
            },
            ...opts
        })
        setLoader(false)
        console.log("???????Result", result.data)
        setYdescription(result.data.description)
        setYimage(result.data.image.url)
        setYlog(result.data.logo.url)
        setYpublisher(result.data.publisher)
        setYtitle(result.data.title)
        setYurl(result.data.url)
        return result.data
    }
    // All Function 

    // const microLinkFunction = async () => {
    //     setLoader(true)
    //     console.log("CALALA")
    //     const { data } = await mql("https://mobiosolutions.com/", {
    //         apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc'
    //     })
    //     setLoader(false)
    //     console.log("dadadadada",data)
    //     setDa(data)
    //     return data;
    // }
    const healthCheckFunction = async () => {
        setLoader(true)
        const result = await healthcheck(url)
        console.log("result>>>>", result)
        setLoader(false)
        setHelthcheck(result.function.isFulfilled)
        setHelthurl(result.url)
        setStatusCode(result.function.value.statusCode)
    }
    const screenShotFunction = async () => {
        setLoader(true)
        const screenshots = await screenshot(url)
        setLoader(false)
        setSs(screenshots.url)
    }
    const fullScreenShotFunction = async () => {
        setLoader(true)
        const fullScreenShot = await fullScreenshot(url)
        setLoader(false)
        setFullSS(fullScreenShot.url)
    }
    const technolodyStackFunctionFunction = async () => {
        setLoader(true)
        const technologyStacks = await technologyStack(url)
        setLoader(false)
        setTechnology(technologyStacks)
    }
    const twitterCardFunction = async () => {
        setLoader(true)
        const twitters = await twitter('https://twitter.com/thevasoya147')
        setLoader(false)
        setTwitterimg(twitters.data)
    }
    const emailFunction = async () => {
        setLoader(true)
        const email = await emails(url)
        setLoader(false)
        setUrlemail(email.emails)
    }
    const youtubeFunction = async () => {
        setLoader(true)
        const youtubes = await youtube("https://youtu.be/eKp2-2l6C9Y")
        setLoader(false)
        setMyoutube(youtubes)
        console.log("YOUTUBE:::", myoutube)
    }


    const submitUrl = async () => {
        setLoader(true)
        const oembed = await axios.get(`https://iframe.ly/api/oembed?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`)
        const iframely = await axios.get(`https://iframe.ly/api/iframely?url=${url}/&api_key=${API_KEY}&iframe=1&omit_script=1`)
        const { data } = await mql("https://mobiosolutions.com/", {
            apiKey: '9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc'
        })
        console.log("dadadadada",data)
        
        setDa(data)
        setHtml({ __html: oembed.data.html })
        setEmbed(oembed.data.html)
        setTitle(oembed.data)
        setIfr({ __html: iframely.data.html });
        setLoader(false)
    }
    if (html) {
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
                <Tabs>
                    <TabList>
                        <Tab >Iframely</Tab>
                        <Tab >Microlink</Tab>
                        <Tab>Embed</Tab>
                        <Tab onClick={healthCheckFunction} >HealthCheck</Tab>
                        <Tab onClick={screenShotFunction}>ScreenShot</Tab>
                        <Tab onClick={fullScreenShotFunction}>Full ScreenShot</Tab>
                        <Tab onClick={technolodyStackFunctionFunction}>Technology Stack</Tab>
                        <Tab onClick={twitterCardFunction}>Twitter Card</Tab>
                        <Tab onClick={emailFunction}>Email</Tab>
                        <Tab onClick={youtubeFunction}>youtube</Tab>
                    </TabList>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <div style={{ margin: "50px" }} >
                                <div dangerouslySetInnerHTML={html} />
                            </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <NEW data={url} apiKey='9hYBCgRn1P5WpCgIpmcRf7tk785f30P87piR5Ikc' />
                            // <Microlink url='https://mobiosolutions.com/' />
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
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
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <div style={{ margin: "50px" }} >
                                <h1>URL : <a href={helthurl}>{helthurl}</a> </h1>
                                <h2>StatusCode : {statusCode}</h2>
                                <h2>IsAvailble : {helthcheck === true ? "Active" : "Inactive"}</h2>
                            </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <div style={{ margin: "50px" }} >
                                <img src={ss} alt="ScreenShot" height={200} width={400} style={{ objectFit: "cover" }} />
                            </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <img src={fullSS} alt="ScreenShot" width={900} style={{ objectFit: "cover" }} />
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <div className='maincontainer'>
                                {
                                    technology.map((data, i) => {
                                        return (
                                            <div className='data' style={{ width: "100%", height: "auto" }} key={i}>
                                                <div className="card" style={{ margin: "10px" }}>
                                                    <h3 style={{ margin: "10px", padding: "10px" }} >Logo : {<img src={data.logo} alt="svg Icon" height={100} width={100} />}</h3>
                                                    <h3 style={{ margin: "10px", padding: "10px" }} >Name : {data.name}</h3>
                                                    <h3 style={{ margin: "10px", padding: "10px" }} >URL : {data.url}</h3>
                                                    <h3 style={{ margin: "10px", padding: "10px" }} >Categories : {data.categories} </h3>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <>
                                {/* <img src={twitterimg} alt="ScreenShot" width={900} style={{ objectFit: "cover" }} /> */}
                                <h3>Banner : {<img src={twitterimg?.banner?.url} alt="Banner" height={200} width={200} />}</h3>
                                <h3>Description : {twitterimg?.description}</h3>
                                <h3>Image : {<img src={twitterimg?.image?.url} alt="Banner" height={200} width={200} />}</h3>
                                <h3>Publisher : {twitterimg?.publisher}</h3>
                                <h3>Followers : {twitterimg?.stats.followers}</h3>
                                <h3>Following : {twitterimg?.stats.followings}</h3>
                                <h3>Tweets : {twitterimg?.stats.tweets}</h3>
                                <h3>Title : {twitterimg?.title}</h3>
                                <h3>URL : {twitterimg?.url}</h3>
                            </>
                        }
                    </TabPanel>
                    <TabPanel>
                        {/* {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> : */}
                        {urlemail}
                        {/* } */}
                    </TabPanel>
                    <TabPanel>
                        {loader === true ? <div style={{ textAlign: "center", margin: "70px" }}> <Spin style={{ textAlign: "center" }} /> </div> :
                            <>
                                <h3>Title : {ytitle}</h3>
                                <h3>Description : {ydescription}</h3>
                                <h3>Image : {<img src={yimage} alt="Youtube" height={200} width={200} />}</h3>
                                <h3>Publisher : {ypublisher}</h3>
                                <h3>Logo : {<img src={ylogo} alt="Logo" height={200} width={200} />}</h3>
                                <h3>URL : {yurl}</h3>
                            </>
                        }
                    </TabPanel>
                </Tabs>
            </>
        )
    }
    return <div />
}