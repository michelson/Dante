import React, { Component } from 'react';
import './App.css';
import VideoExample from './VideoCapture'
import Dante from 'Dante2'
import {DanteInlineTooltipConfig} from 'Dante2/package/es/components/popovers/addButton'
import {VideoBlockConfig} from './VideoCapture'

const content = {"blocks":[{"key":"2ltu8","text":"Lost+Found: Case P1A0 – Fernando de la Mora, Paraguay","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":53,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ebe0h","text":"Thats me!","type":"image","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{"rejectedReason":"","fileReady":true,"paused":false,"url":"http://localhost:4000/uploads/blob","loading_progress":100,"recording":false,"granted":true,"direction":"center"}},{"key":"654mg","text":"Important information:","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7d9cf","text":"Location: Fernando de la Mora, Paraguay","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"2lel5","text":"Date Stolen: May 26, 2011","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7t8o","text":"Date Recovered: May 30, 2011","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"dubdh","text":"Theft: Home","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1ilha","text":"Missing items: Macbook Air","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"dsl4p","text":"Police reaction: See the details below","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5nvk9","text":"Time it took for first report to arrive: 24 hours","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":39,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7bjps","text":"Once received, time it took for police to recover it: 4 days","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":52,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"6cgpj","text":"Final thoughts: See the details below.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"flnqj","text":"Story","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e3bsm","text":"Full story below:On May 26, 2011, I got a Skype call from my bride of 26 years calling from our home in Paraguay where she spends every summer. From the tone of her voice, I immediately knew something was wrong. She was in tears. I immediately thought that someone in the family was ill, hurt or worse.She explained that a well-dressed man carrying a portfolio knocked on our door and told the maid that la Señora had asked him to repair a computer in our home. My bride was out running errands that morning. The maid let him in. Our nephew, who lives in our home was woken up by this guy rustling through the house. Our nephew came downstairs to investigate, and saw this guy dashing out of our house with my Bride’s Mac Book Air, a fully loaded laptop computer that I had given her for her trip to South America. That morning, my bride had called the police and filed a report. But the police told her that there was not much they could do with so little information.Six months earlier, our son sent me a link he had seen on Reddit of an open-source free software application call Prey Project that helps you track down your missing computer or smart phone. In less than 24 hours after I has identified on the web site that her laptop had been stolen, I received an email from our missing laptop that included a photo of the guy that has our laptop. As soon as the computer found an internet connection, the web cam took a picture. It also sent me screenshots of our guy’s email account and Facebook page where we were able to see more information about this guy, his friends, and his profile. It also sent the physical location of the laptop shown on a Google map. It turns out that Google has a geo-location database of IP addresses for Wi-Fi and other internet connections all over this planet. So we knew within 100 meters where this guy lived. This guy also used his full name as his SSID on his Wi-Fi, so with that information within minutes I was able to determine that he had gone to the University of Miami, we found his Facebook account and confirmed the web cam picture with that on his Facebook page. I also found his LinkedIn account and confirmed that he had a business in the US.With this new information, My bride called the police back. They were blown away by how much information we had on the guy. They had never seen anything like that and were checking in with us daily to get more information we might be able to get. With the guy’s name they were able to confirm the web cam photo with the photo they had on file of the national ID all Paraguayans carry. But his ID card had expired so the address was not current. Nevertheless, with the geo-location information we provided the police were able to triangulate on the house by checking with neighbors. The police arrived at the house to talk with the guy several times, but he was never around.To get a better understanding of how the software worked I identified another laptop at home as stolen. When I opened up the laptop, I was frightened by the loud sound of a police siren as if it were in my living room, I saw the web cam flash quickly and a computer voice shouting at me saying “this computer has been stolen. Please contact (my email address) to resolve this issue”. The same message was spelled out on the screen of the laptop. Within a minute I had an email report with a picture of me with alarmed looked as if my hair was standing on end. I was also able to confirm the accuracy of the geo-location. It was less than a block from our home in Houston. Very impressive considering there isn’t any GPS on the laptop.Two days later, on a Saturday I got a call from the attorney representing the guy with the laptop stating that his client just wanted to return it. I’m sure he was motivated by all the heat from the police calling on his home, the sounds of police siren’s in his living room, and the fact that he knew we knew so much about him considering how quickly the police were able to descend on his home, and how much that could impact his business in Miami and livelihood in the US.I gave the attorney my bride’s local Paraguayan cell phone to return the computer. My bride and the attorney were talking within minutes after his call to me. My bride didn’t want to merely take back the computer because the whole case was under police investigation. The police also cautioned her about dealing with the culprit directly. So, my bride informed the police of the contact, and that following Monday, the attorney returned the computer with the police involved. We don’t know what happened after that; whether they were able to pursue the original thief. We were told our guy bought the computer from someone else, so it had exchanged hands from the thief to this guy in less than 24 hours.On Monday I got a final report from Prey Project with a picture of my bride as she had opened up the laptop on the patio of our home in Paraguay. The triangulation was within a block of our home.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}

class App extends Component {
render() {
return (

<div className="App">

        <a href="https://preyproject.com/blog/en/"
            class="custom-logo-link"
            rel="home">
            <img src="https://preyproject.com/blog/wp-content/uploads/2018/06/cropped-Prey-new-logo-1-2.png"
            alt="The Missing Report" class="custom-logo" style={{width: "132px"}}/>
        </a>

        <div className="App-intro"
            style={{width: '600px', 'margin': '0 auto', 'padding-top': '20px' }}>


            {/*<VideoExample  />*/}

            <Dante
                content={content}
                widgets={[
                    VideoBlockConfig({

                        options: {
                          upload_url: 'http://localhost:4000/upload',
                          upload_callback: (ctx, img)=> {
                            console.log("file uploaded: " + ctx.data.url)
                          },
                          /*delete_block_callback: (ctx, block)=>{
                            //alert("file deleted: " + block.getData().toJS().url)
                            return null
                          },*/
                          upload_error_callback: (ctx, img)=>{
                            debugger
                            console.log(ctx)
                          }
                        }

                    })
                ]}
                debug={true}
            />
        </div>
      </div>
    );

}
}

export default App;
