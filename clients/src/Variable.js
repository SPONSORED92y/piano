const publish = false
const serverURL = publish ? '/server' : 'http://localhost:9000/server'

const getCookie = (name) => {
    let allCookies = document.cookie
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

const Variable = { publish, serverURL, getCookie }
export default Variable
