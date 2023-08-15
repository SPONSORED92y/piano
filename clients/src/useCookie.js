const useCookie = () => {
    const getCookie = (name) => {
        let allCookies = document.cookie
        console.log(document.cookie)
        for (let i = 0; i <= (allCookies.length - name.length); i++) {
            if (allCookies.substring(i, i + name.length) === name) {
                let j = i + name.length + 1
                for (; j <= allCookies.length; j++) {
                    if (allCookies[j] === ';') {
                        break;
                    }
                }
                return allCookies.substring(i + name.length + 1, j)
            }
        }
        return null
    }
    return getCookie
}
export default useCookie