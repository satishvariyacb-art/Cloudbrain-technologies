import mongoose from 'mongoose';

// 1. Job Schema
const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: String, required: true },
  type: { type: String, default: 'Full-Time' },
  location: { type: String, default: 'Remote / Hybrid' },
  experience: { type: String, default: '3+ Years' },
  desc: { type: String, required: true },
  status: { type: String, default: 'Active', enum: ['Active', 'Closed'] },
  postedDate: { type: String }
}, { timestamps: true });

// 2. Team Schema
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// 3. Application Schema
const ApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  roleTitle: { type: String, required: true },
  phone: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  resume: { type: String, default: '' },
  resumeName: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    default: 'New', 
    enum: ['New', 'In Review', 'Shortlisted', 'Interviewing', 'Rejected', 'Hired'] 
  },
  appliedDate: { type: String }
}, { timestamps: true });

// 4. Culture Media Schema
const CultureSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['photo', 'video'] },
  category: { type: String, default: 'Photos' },
  title: { type: String, required: true },
  location: { type: String, default: '' },
  duration: { type: String, default: '' },
  image: { type: String, default: '' },
  poster: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  caption: { type: String, default: '' },
  showInShowcase: { type: Boolean, default: true },
  aspectRatio: { type: String, default: 'landscape' }
}, { timestamps: true });

// 5. Admin User Schema
const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'SuperAdmin' }
}, { timestamps: true });

export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const Culture = mongoose.models.Culture || mongoose.model('Culture', CultureSchema);
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
