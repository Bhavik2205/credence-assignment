import Data from '../models/data.model.js';
import mongoose from 'mongoose';
import {logger} from '../logger/logger.js'

//To get All data 
export const getallData = async(req, res) => {
    try {
        const data = await Data.find();
        if(data.length<1){
            const array = [];
            res.status(200).json(array);
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(404).json({message: 'Something went wrong!!! please try again'});
        logger.error(error.message);
    }
};

//To get data by Id
export const getData = async(req, res) => {
    const {dataId} = req.params;
    try {
        const data = await Data.findById(dataId);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: 'Something went wrong!!!  please try again'});
        logger.error(error.message);
    }
};

//To Create new Data
export const createData = async(req, res) => {
  
    const data = req.body;

    if(req.file) {
        const Img = req.file.filename;
        data.Img = Img;
    };

    const newData = new Data({...data});

    try{
        if(!data.Name || !data.Summary || !data.Img){
            res.status(400).json({message: "All fields are required"})
        }else {
            await newData.save();
            res.status(201).json(newData);
        }
    } catch (error) {
        res.status(409).json({message: 'Something went wrong!!! please try again'});
        logger.error(error.message);
    }
};

//To Update the data
export const updateData = async(req, res) => {
    const {dataId} = req.params;
    const data = req.body;

    //const Img = req.file.filename;

    if(req.file){
        const Img = req.file.filename;
        data.Img = Img;
    }

    try{
    if(!mongoose.Types.ObjectId.isValid(dataId))
    return res.status(404).json(`No Data associated with id ${dataId}`)

    const updatedData = ({...data, _id: dataId});
    await Data.findByIdAndUpdate(dataId, updatedData);
    res.status(200).json(updatedData);
    } catch (error) {
        res.status(409).json({message: 'Something went wrong!!! please try again'});
        logger.error(error.message);
    }    
};

//To delete the particular data
export const deleteData = async(req, res) => {
    const {dataId} = req.params;

    try {
        if(! await Data.findById(dataId)){
            return res.status(404).json({message: `No Data associated with id ${dataId}`})
        } else {
            await Data.findByIdAndDelete(dataId);
            res.json({message: `Data Successfully deleted with Id ${dataId}`});
        }
    } catch (error) {
        res.status(409).json({message: 'Something went wrong!!! please try again'});
        logger.error(error.message);
    }
}
