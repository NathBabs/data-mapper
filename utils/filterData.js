// @ts-check

// return valid field types for that condition
/**
 * @param {any[]} data
 * @param {any} condition
 * @param {string | number} filterValue
 * @param {{ [s: string]: any; }} schema
 */
const parseData = (data, condition, filterValue, schema) => {

    const result = data.map((d) => {
        const validFields = {}
        switch (condition) {
            case 'eq':
                // timestamp and integer fields
                for (const [key, value] of Object.entries(schema)) {
                    if (value === 'timestamp' || value === 'integer') {

                        //check if data  fulfils this condition
                        // picks out the object property from the current data object which is (d)
                        // that matches with timestamp and integer
                        if (d[key] == filterValue) {
                            validFields[key] = filterValue;
                        }
                    }
                }
                break;
            case 'eqc':
                // string fields
                for (const [key, value] of Object.entries(schema)) {
                    if (value === 'string') {

                        // @ts-ignore
                        if (d[key].toLowerCase().includes(filterValue.toLowerCase())) {
                            validFields[key] = filterValue;
                        }
                    }
                }
                break;
            case 'lt':
                // timestamp and integer fields
                for (const [key, value] of Object.entries(schema)) {
                    if (value === 'timestamp' || value === 'integer') {

                        if (d[key] < filterValue) {
                            validFields[key] = filterValue;
                        }
                    }
                }
                break;
            case 'gt':
                // timestamp and integer fields
                for (const [key, value] of Object.entries(schema)) {
                    if (value === 'timestamp' || value === 'integer') {

                        if (d[key] > filterValue) {
                            validFields[key] = filterValue;
                        }
                    }
                }
                break;
            default:
                break;
        }


        return validFields;
    })
    // strip out empty objects that were returned when mapping
    let newResult = result.filter(v => JSON.stringify(v) !== '{}');

    return newResult;

}


/**
 * @param {any} data
 * @param {any} schema
 * @param {{ [s: string]: any; }} filter
 */
const filterData = async (data, schema, filter) => {
    try {
        const filtered = [];

        // split up filter
        for (const [key, value] of Object.entries(filter)) {
            // split the parse object from the query string into condition and value
            const split = value.split(':');
            const condition = split[0];
            const filterValue = split[1];

            // get the required fields to target
            const finalData = parseData(data, condition, filterValue, schema);
            if (finalData.length == 0) {
                continue;
            }

            filtered.push(...finalData)



        }

        return [filtered, null]
    } catch (error) {
        return [null, error];
    }

}


export default filterData;








/* const schema = { name: "string", age: "integer", dob: "timestamp" };
const c = "eqc";

const filterll = {
    "age": "eq:27",
    "name": "eqc:nathaniel"
};

const data = [
    {
        "name": "nathaniel",
        "age": 27,
        "sex": "male"
    },
    {
        "name": "babalola",
        "age": 28,
        "sex": "female"
    }
] */

//const [f, err] = await filterData(data, schema, filterll);

//console.log(f)

//console.log(filter(c, schema));