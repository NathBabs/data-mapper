import { Router } from 'express';
const router = Router();

import { createDataSpec, createData, queryData } from '../controllers/DataController.js';

// create data spec for incoming data
router.route('/data-mapper/createspec').post(createDataSpec);

// insert data
router.route('/data-mapper/ceatedata').post(createData);

// query data
router.route('/data-mapper/filter/:providerId').get(queryData)



export default router;