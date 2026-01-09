// models/Application.ts
import mongoose, { Document } from 'mongoose';

interface IApplication extends Document {
  fullName: string;
  whatsappNo: string;
  emailAddress: string;
  collegeName: string;
  branch: string;
  currentSemester: string;
  applyingFor: string;
  otherSpecification?: string;
  tentativeDates: string;
  referenceName?: string;
  source: string;
  query?: string;
  submittedAt: Date;
}

const ApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  whatsappNo: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
  },
  emailAddress: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
  },
  currentSemester: {
    type: String,
    required: [true, 'Year of passing is required'],
    trim: true,
  },
  applyingFor: {
    type: String,
    required: [true, 'Application type is required'],
    trim: true,
  },
  otherSpecification: {
    type: String,
    trim: true,
  },
  tentativeDates: {
    type: String,
    required: [true, 'Tentative dates are required'],
    trim: true,
  },
  referenceName: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true,
  },
  query: {
    type: String,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;