import { useLocation } from "react-router-dom"
import { useContext } from "react"
import LangContext from "./LangContext"
const Home = () => {
    const location = useLocation()
    const { language } = useContext(LangContext)
    return (
        <div className="Home">
            {location.state && location.state.logout && <div className="logoutPopup">
                <div className="message">
                    {language === 'zh' ? "您已登出!" : 'You have loged out !!!'}
                </div>
            </div>}
            <h1>{language === 'zh' ? "首頁" : 'Home'}</h1>
            <h2>更新日誌</h2>
            <div className="highlight">可切換成英文</div>
            <div className="highlight">最新消息頁面</div>
            <div className="highlight">手機介面優化 v2</div>
            <div>可以重複登入，不必先登出</div>
            <div>完成使用者列表功能</div>
            <div>管理員查閱社員列表</div>
            <div>琴譜借出日期欄位</div>
            <div>一點點的美術!!!</div>
            <div></div>
            <h2>ㄍㄇ的話: 請大家盡情使用預約琴房的功能,以下是使用說明和注意事項</h2>
            <h3>帳號功能</h3>
            <div>1.請先到註冊頁去註冊一個帳號</div>
            <div>2.登入使用的是email,所以不能重複</div>
            <div>3.姓名在預約琴房時會被記錄進去,所以請不要取奇怪ㄉ名字會被大家看到,也不要用別人的名子</div>
            <div>4.身分可以選擇幹部或一般社員,要成為幹部請輸入通關密語"SPONSORED",幹部會有一些額外權限</div>
            <div>5.登入後就會看到其他登入後才能使用的頁面,個人檔案頁面可以修改自己的資料和密碼</div>
            <div>6.登入狀態會維持15分鐘</div>
            <h3>琴譜列表系統</h3>
            <div>1.一般社員只能查閱標題和狀態,幹部可以增加,編輯琴譜,也可以看到是誰借走了</div>
            <h3>琴房預約系統</h3>
            <div>1.記得只能預約下周的時段</div>
            <div>2.有三種狀態,開放預約,暫停使用,已預約,暫停使用的目的是標示閉館,鋼琴正在維修中等等</div>
            <div>3.目前每3個小時會做一次"每周更新",也就是下周的紀錄會被推到本周,每人的預約次數也會更新</div>
            <div>4.管理員有權限可以直接修改每個時段的狀態和使用者</div>
            <div>5.本周可以取消預約!!</div>
            <div>6.周一的00:00到8:00應該是無法預約的</div>
            <h3>其他</h3>
            <div>1.首頁和關於頁面之後應該會寫點別的,大家可以討論看看要寫什麼</div>
            <div>2.如果你遇到bug卡住了之類的,可以跟ㄍㄇ說</div>

            <h2>By: ㄍㄇ(´･ω･`)</h2>
        </div>
    )
}

export default Home