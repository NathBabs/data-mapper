import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    providerId: mongoose.SchemaTypes.ObjectId,
    data: mongoose.Schema.Types.Mixed
});

const Data = mongoose.model('Data', dataSchema);

export default Data;