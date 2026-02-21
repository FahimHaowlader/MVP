const mongoose = require('mongoose');
const User = require('./models/User');

const seedStudents = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/schoolms');
        console.log('Connected to MongoDB');

        const students = [
            { name: 'Olivia Chen', email: 'olivia@school.com', password: 'password123', role: 'Student', className: '10-A', section: 'Section A' },
            { name: 'Benjamin Carter', email: 'benjamin@school.com', password: 'password123', role: 'Student', className: '10-A', section: 'Section A' },
            { name: 'Sophia Rodriguez', email: 'sophia@school.com', password: 'password123', role: 'Student', className: '10-A', section: 'Section A' },
            { name: 'Liam Goldberg', email: 'liam@school.com', password: 'password123', role: 'Student', className: '10-A', section: 'Section A' },
            { name: 'Ava Nguyen', email: 'ava@school.com', password: 'password123', role: 'Student', className: '10-A', section: 'Section A' },
        ];

        for (const s of students) {
            const exists = await User.findOne({ email: s.email });
            if (!exists) {
                await User.create(s);
                console.log(`Created student: ${s.name}`);
            } else {
                console.log(`Student already exists: ${s.name}`);
            }
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding students:', error);
        process.exit(1);
    }
};

seedStudents();
