const types = {
    string: 'string',
    integer: 'integer',
    timestamp: 'timestamp'
}

//const schema = { name: "string", age: "integer", dob: "timestamp", sex: "float" };
const verifyTypes = (requestBody) => {
    for (const [key, value] of Object.entries(requestBody)) {
        if (value !== types[value]) {
            throw new Error(`Invalid data type ${value}`);
        }
    }
}

export default verifyTypes;