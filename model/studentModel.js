import mongoose from 'mongoose';
import studentSchema from '../schema/studentSchema.js';

const Student = mongoose.model('Student', studentSchema);

export default Student;
