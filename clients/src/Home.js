const Home = () => {

    return (
        <div className="Home">
            <h1>首頁</h1>
            <h2>ㄍㄇ的話: 請大家盡情使用預約琴房的功能,以下是使用說明和注意事項</h2>
            <h3>帳號功能</h3>
            <div>1.請先到註冊頁去註冊一個帳號</div>
            <div>2.登入使用的是email,所以不能重複</div>
            <div>3.姓名在預約琴房時會被記錄進去,所以請不要取奇怪ㄉ名字會被大家看到,或是用別人的名子,因為名子如果一模一樣你們可以互相取消對方的預約,挺白癡的,之後應該會改掉請放心</div>
            <div>4.身分可以選擇幹部或一般社員,要成為幹部請輸入通關密語"SPONSORED",幹部會有一些額外權限,可以兩種都幫我測試看看</div>
            <div>5.登入後就會看到其他登入後才能使用的頁面,個人檔案頁面可以修改自己的資料和密碼</div>
            <div>6.登入狀態會維持10分鐘</div>
            <h3>琴譜列表系統</h3>
            <div>1.一般社員只能查閱標題和狀態,幹部可以增加,編輯琴譜,也可以看到是誰借走了</div>
            <h3>琴房預約系統</h3>
            <div>1.記得只能預約下周的時段</div>
            <div>2.有三種狀態,開放預約,暫停使用,已預約,分別由不同顏色標示,暫停使用的目的是標示閉館,鋼琴正在維修中等等</div>
            <div>3.目前每3個小時會做一次"每周更新",也就是下周的紀錄會被推到本周,每人的預約次數也會更新</div>
            <div>4.管理員有權限可以直接修改每個時段的狀態和使用者</div>
            <div>5.本周可以取消預約!!</div>
            <div>6.周一的00:00到8:00應該是無法預約的(如果這功能沒壞掉的話)</div>
            <h3>其他</h3>
            <div>1.這目前只是測試版,有遇到什麼問題可以跟我講,或是想要許願什麼功能都可以</div>
            <div>2.美術風格目前是處於放棄狀態,我會試著再讓網站變得精美一點的,主視覺我想聽大家的意見,要用什麼色系之類的</div>
            <div>3.首頁和關於頁面之後應該會寫點別的,大家可以討論看看要寫什麼</div>
            <div>4.如果你遇到bug卡住了之類的(其實蠻容易遇到的),請登出再登入,或是重新點一次連結</div>

            <h2>By: ㄍㄇ(´･ω･`)</h2>
        </div>
    )
}

export default Home