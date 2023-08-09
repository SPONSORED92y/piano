const publish = true;
const serverURL = publish ? '/server' : 'http://localhost:9000'
const Variable = { publish, serverURL }
export default Variable;
