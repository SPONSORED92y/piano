const publish = true
const serverURL = publish ? '/server' : 'http://localhost:9000/server'

const getCookie = (name) => {
    let allCookies = document.cookie
    const dum = 0
    dum = dum + 1
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
