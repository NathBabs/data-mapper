import mongoose from 'mongoose';

const dataSpecSchema = new mongoose.Schema({
    providerId: mongoose.SchemaTypes.ObjectId,
    fields: mongoose.Schema.Types.Mixed
});

const DataSpec = mongoose.model('DataSpec', dataSpecSchema);

export default DataSpec;