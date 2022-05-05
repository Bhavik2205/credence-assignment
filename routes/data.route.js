import express from 'express';
import { getallData, getData, createData, updateData, deleteData } from '../controllers/data.controller.js';

const router = express.Router();

router.get('/getAll', getallData);
router.get('/id/:dataId', getData);
router.post('/createData', createData);
router.patch('/updateData/:dataId', updateData);
router.delete('/deleteData/:dataId', deleteData);

export default router;