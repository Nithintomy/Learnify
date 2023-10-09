import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, model, Model } from 'mongoose';


interface TUTOR extends Document {
    tutorName: string;
    tutorEmail: string;
    phone: number;
    password: string;
    photo: string[];
    courses: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isOnline: boolean; 
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const TutorSchema = new Schema<TUTOR>({
    tutorName: {
        type: String,
        required: true,
    },
    tutorEmail: {
        type: String,
        required: true,
        unique: true, // Add unique constraint
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: [{
        type: String,
    }],
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isOnline:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

TutorSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};
     
TutorSchema.pre<TUTOR>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define the model using the model function and export it
const TutorModel: Model<TUTOR> = model<TUTOR>('tutorModel', TutorSchema);
export default TutorModel;