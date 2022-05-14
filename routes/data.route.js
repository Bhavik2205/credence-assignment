import express from 'express';
import { getallData, getData, createData, updateData, deleteData } from '../controllers/data.controller.js';
import path from 'path';
import multer from 'multer';
import shortid from 'shortid';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage, fileFilter});


router.get('/getAll', getallData);
router.get('/id/:dataId', getData);
router.post('/createData',upload.single('Img'), createData);
router.patch('/updateData/:dataId',upload.single('Img'), updateData);
router.delete('/deleteData/:dataId', deleteData);

export default router;