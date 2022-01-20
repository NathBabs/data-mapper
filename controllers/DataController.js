import mongoose from 'mongoose';
import DataSpec from '../models/DataSpec.js';
import Data from '../models/Data.js';
import verifyTypes from '../utils/verifyDataType.js';
import verifyData from '../utils/dataToType.js';
import filterData from '../utils/filterData.js'
import qs from 'query-string'

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export async function createDataSpec(req, res, next) {
    try {
        const body = req.body;

        // verify each data type specified
        verifyTypes(body);

        const spec = new DataSpec({
            providerId: new mongoose.Types.ObjectId().toHexString(),
            fields: { ...body }
        });


        spec.markModified('fields');
        const savedSpec = await spec.save();



        return res.status(201).send({
            success: true,
            message: "Data Spec for your incoming data has been created. Please use your providerId for further operations on this platform",
            spec: savedSpec
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error
        })
    }
}


export async function createData(req, res) {
    try {
        const { providerId, data } = req.body;

        // get a previously defined dataspec by that provider
        const spec = await DataSpec.findOne({
            providerId: providerId
        });

        // verify that the data complies with the spec
        const [result, err] = await verifyData(data, spec.fields);

        if (err != null) {
            return res.status(500).send({
                error: err.message
            });
        }
        // check if exists
        const exists = await Data.findOne({
            providerId: providerId
        })

        if (exists) {
            return res.status(400).send({
                success: false,
                message: "Data exists for this spec already, please create another spec"
            })
        }
        const newData = new Data({
            providerId: providerId,
            data: result
        });

        newData.markModified('data');

        const savedData = await newData.save();

        return res.status(200).send({
            success: true,
            data: savedData
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error
        })
    }
}


export async function queryData(req, res, next) {
    try {
        const providerId = req.params.providerId;


        // parse query
        const url = req.originalUrl.split('?');
        const queryRemoved = url.splice(0, 1);

        const parsed = qs.parse(url[0], {
            parseNumbers: true
        });


        // get schema of that providerId
        const schema = await DataSpec.findOne({
            providerId: providerId
        })

        // get the data of that providerId
        const data = await Data.findOne({
            providerId: providerId
        })

        // if there's either missing , send an error response back to the client
        if (!data || !schema) {
            return res.status(404).send({
                success: false,
                message: 'A schema or data for this provider does not exist. Please create one'
            })
        };


        // filter data
        const [filtered, error] = await filterData(data.data, schema.fields, parsed);

        // filtered is an array of objects because there might be multiple data points
        // that meet the query condition, so to to prevent them overwriting each other

        // if there is an error return it to the client
        if (error != null) {
            return res.status(error).send({
                success: false,
                error: error.message
            })
        }

        // else return filtered data
        return res.status(200).send({
            success: true,
            filtered: filtered
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error
        })
    }
}