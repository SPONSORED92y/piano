import { useLocation } from "react-router-dom"
import { useContext } from "react"
import LangContext from "./LangContext"
const Home = () => {
    const location = useLocation()
    const { language } = useContext(LangContext)
    return (
        <div className="Home">
            {location.state && location.state.logout && <div className="logoutPopup">
                {language === 'zh' ? "您已登出!" : 'You have loged out !!!'}
            </div>}
            <h1>{language === 'zh' ? "首頁" : 'Home'}</h1>
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

            <h2>By: ㄍㄇ(´･ω･`) 9/3</h2>
        </div>
    )
}

export default Home