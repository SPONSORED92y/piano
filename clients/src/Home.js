import { useLocation } from "react-router-dom"
import { useContext } from "react"
import LangContext from "./LangContext"
const Home = () => {
    const location = useLocation()
    const { language } = useContext(LangContext)
    return (
        <div className="home">
            {location.state && location.state.logout && <div className="logoutPopup">
                {language === 'zh' ? "您已登出!" : 'You have loged out !!!'}
            </div>}

            <div className="heading">
                <div className="text">
                    <div className="text1">成功大學 鋼琴社</div>
                    <div className="text2">NCKU PIANO</div>
                </div>
                <div className="textm">
                    <div className="text1">成功 </div>
                    <div className="text2">大學</div>
                    <div className="text3">鋼琴社</div>
                </div>
                <div className="logoContainer">
                    <img className="logo" src="logo.png" ></img>
                </div>
            </div>
            <div className="text4">NCKU PIANO</div>
            <div className="intro"><div className="dash"></div><div className="text1">以琴會友 在黑白的琴鍵中譜寫未來</div></div>

            <div className="rooms">
                <div className="text">
                    <div className="text1">琴房介紹</div>
                    <div className="text2">我們有三間琴房+一間社辦，只要是鋼琴社社員都可以在學生活動中心開放時間（08:00-24:00）預約使用琴房！</div>
                </div>
                <div className="images">
                    <img ></img>
                    <img></img>
                </div>
            </div>
            <div className="learn">
                <div className="learnHeader">社課&師徒制</div>
                <div className="box">
                    <div className="colLeft">
                        <div className="text">
                            <div className="text1">社課</div>
                            <div className="text2">邀請講師講解古典或流行的各種知識，也有融通講座喔！</div>
                            <div className="text3">{'了解更多 >'}</div>
                        </div>
                        <div className="images">
                            <img></img>
                        </div>
                    </div>
                    <div className="colRight">
                        <div className="text">
                            <div className="text1">師徒制</div>
                            <div className="text2">想找一對一鋼琴教學嗎？師徒制正是你需要的</div>
                            <div className="text3">{'了解更多 >'}</div>
                        </div>
                        <div className="images">
                            <img></img>
                        </div>

                    </div>
                </div>
            </div>

            <div className="concert">
                <div className="concertHeader">音樂會&下午茶</div>
                <div className="box">
                    <div className="text">
                        <div className="text1">想找個舞台一展琴技嗎？每個學期舉辦各一次音樂會和下午茶，歡迎所有社員報名表演者，如果只是想當觀眾享受音樂也是沒問題的喔！</div>
                        <div className="text2">在音樂廳廳舉行的正式音樂會，觀賞表演者在舞台上大放異彩</div>
                        <div className="text3">下午茶是較輕鬆的音樂會，聽著音樂享用餐點，度過優閒的午後</div>
                    </div>
                    <div className="images">
                        <img ></img>
                        <img></img>
                    </div>
                </div>
            </div>

            <div className="activity">
                <div className="activityHeader">活動</div>
                <div className="box">
                    <div className="images">
                        <img></img>
                        <img></img>
                        <img></img>
                        <img></img>
                    </div>
                    <div className="text">
                        <div className="text1">鋼琴社會舉辦好玩的活動！例如：野餐、沙遊等</div>
                    </div>
                </div>
            </div>

            <div className="info">
                <div className="infoHeader">社辦位置&值班時間&入社</div>
                <div className="box">
                    <div className="images">
                        <img></img>
                    </div>
                    <div className="text">
                        <div className="text1">鋼琴社位於光復校區學生活動中心(一活)B1，值班時間為星期一~星期四18:30-20:30，</div>
                        <div className="text2">入社費用600元(´･ω･`)</div>
                    </div>
                </div>
            </div>


            <div className="people">
                <div className="peopleHeader">幹部介紹</div>
                <div className="row">
                    <div className="colLeft">
                        <div className="images">
                            <img></img>
                        </div>
                        <div className="text">
                            <div className="text1">ㄍㄇ</div>
                        </div>
                    </div>
                    <div className="colRight">
                        <div className="images">
                            <img></img>
                        </div>
                        <div className="text">
                            <div className="text1">蔡小霜</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="colLeft">
                        <div className="images">
                            <img></img>
                        </div>
                        <div className="text">
                            <div className="text1">王不揪</div>
                        </div>
                    </div>
                    <div className="colRight">
                        <div className="images">
                            <img></img>
                        </div>
                        <div className="text">
                            <div className="text1">黃羚羊</div>
                        </div>
                    </div>
                </div>

            </div>









            {/* <h1>{language === 'zh' ? "首頁" : 'Home'}</h1>
            <h2>更新日誌</h2>
            <h2>ㄍㄇ的話: 請大家盡情使用預約琴房的功能,以下是使用說明和注意事項</h2>
            <h3>帳號功能</h3>
            <div>3.姓名在預約琴房時會被記錄進去,所以請不要取奇怪ㄉ名字會被大家看到,也不要用別人的名子</div>
            <div>4.身分可以選擇幹部或一般社員,要成為幹部請輸入通關密語"SPONSORED",幹部會有一些額外權限</div>
            <div>6.登入狀態會維持20分鐘</div>
            <h3>琴房預約系統</h3>
            <div>2.有三種狀態,開放預約,暫停使用,已預約,暫停使用的目的是標示閉館,鋼琴正在維修中等等</div>
            <div>4.管理員有權限可以直接修改每個時段的狀態和使用者</div>
            <h3>其他</h3>
            <div>1.首頁和關於頁面之後應該會寫點別的,大家可以討論看看要寫什麼</div>
            <div>2.如果你遇到bug卡住了之類的,可以跟ㄍㄇ說</div>

            <h2>By: ㄍㄇ(´･ω･`) 9/3</h2> */}
        </div>
    )
}

export default Home