import Data from '../models/data.model.js';
import mongoose from 'mongoose';
import express from 'express';

//To get All data 
export const getallData = async(req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

//To get data by Id
export const getData = async(req, res) => {
    const {dataId} = req.params;
    try {
        const data = await Data.findById(dataId);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

//To Create new Data
export const createData = async(req, res) => {
    const data = req.body;
    const newData = new Data({...data});

    try {
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

//To Update the data
export const updateData = async(req, res) => {
    const {dataId} = req.params;
    const {Name, Img, Summary} = req.body;

    if(!mongoose.Types.ObjectId.isValid(dataId))
    return res.status(404).send(`No Data associated with id ${dataId}`)

    const updatedData = {Name, Img, Summary, _id: dataId};
    await Data.findByIdAndUpdate(dataId, updatedData);
    res.status(200).json(updatedData);
};

//To delete the particular data
export const deleteData = async(req, res) => {
    const {dataId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(dataId))
    return res.status(404).send(`No Data associated with id ${dataId}`)

    await Data.findByIdAndDelete(dataId);
    res.json({message: `Data Successfully deleted with Id ${dataId}`});
}
