const publish = false
const serverURL = publish ? '/server' : 'http://localhost:9000/server'
const Variable = { publish, serverURL }
export default Variable
