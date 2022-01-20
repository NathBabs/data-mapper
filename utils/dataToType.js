//@ts-check
/**
 * @param {string} property
 * @param {string} type
 */
function dataToType(property, type) {
    if (type === "string") {
        return String(property);
    }

    if (type === "integer") {
        return parseInt(property, 10);
    }

    if (type === "timestamp") {
        return property;
    }

    throw new Error(`Undefined type ${type}`);
}


const verifyData = async (data, schema) => {
    try {
        // loop through the data to be inserted
        const formatted = data.map((property) => {
            const transformedData = {}
            /* const schemaKey = Object.keys(property)[0];
            console.log(schemaKey) */

            for (const [key, value] of Object.entries(property)) {
                const schemaProperty = schema[key];

                if (!schemaProperty) {
                    throw new Error(
                        `${key} is not defined by the schema, expected: ${Object.keys(schema)}`
                    )
                }

                transformedData[key] = dataToType(value, schemaProperty)

            }

            return transformedData;
        });

        const result = formatted;

        return [result, null];
    } catch (err) {
        return [null, err]
    }

}


export default verifyData;





/* const schema = { name: "string", age: "integer", dob: "timestamp" };


const workingData = [{ name: "Bob" }, { age: "27" }, { dob: "01-01-1995" }];
const testData = [{
    "name": "Ciroma Adeyemi",
    "age": 20,
    "dob": 1587614026,
    "sex": "male"
},
{
    "name": "Samuel Chukwu",
    "age": 20,
    "dob": 1587614729
}
] */