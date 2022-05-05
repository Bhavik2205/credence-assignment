import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Img: {
        type: String,
        required: true
    },
    Summary: {
        type: String,
        required: true
    }
});

var DataModel = mongoose.model('DataModel', DataSchema);

export default DataModel;