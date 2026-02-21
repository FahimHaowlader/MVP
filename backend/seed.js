const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        const Attendance = require('./models/Attendance');
        const Result = require('./models/Result');
        const Fee = require('./models/Fee');
        const Routine = require('./models/Routine');
        const Book = require('./models/Book');
        const Event = require('./models/Event');
        const Notice = require('./models/Notice');

        await User.deleteMany({});
        await Attendance.deleteMany({});
        await Result.deleteMany({});
        await Fee.deleteMany({});
        await Routine.deleteMany({});
        await Book.deleteMany({});
        await Event.deleteMany({});
        await Notice.deleteMany({});

        console.log('Existing data cleared');

        // Create Admin
        const admin = await new User({
            name: 'System Admin',
            email: 'admin@school.com',
            password: '123456',
            role: 'Admin'
        }).save();

        // Create Principal
        const principal = await new User({
            name: 'Dr. Sarah Wilson',
            email: 'principal@school.com',
            password: '123456',
            role: 'Principal'
        }).save();

        // Create Teacher
        const teacher = await new User({
            name: 'Demo Teacher',
            email: 'teacher@school.com',
            password: '123456',
            role: 'Teacher'
        }).save();

        // Create Student
        const student = await new User({
            name: 'Demo Student',
            email: 'student@school.com',
            password: '123456',
            role: 'Student',
            className: 'Class 10',
            section: 'A'
        }).save();

        // Create Parent and link to student
        const parent = await new User({
            name: 'Demo Parent',
            email: 'parent@school.com',
            password: '123456',
            role: 'Parent',
            children: [student._id]
        }).save();

        // Create Staff
        const staff = await new User({
            name: 'Demo Staff',
            email: 'staff@school.com',
            password: '123456',
            role: 'Staff'
        }).save();

        // Create Librarian
        const librarian = await new User({
            name: 'Demo Librarian',
            email: 'librarian@school.com',
            password: '123456',
            role: 'Librarian'
        }).save();

        // --- Seed Sample Data ---

        // 1. Attendance for Student
        const today = new Date();
        const attendanceRecords = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            attendanceRecords.push({
                student: student._id,
                date: date,
                status: i === 2 ? 'Absent' : 'Present'
            });
        }
        await Attendance.insertMany(attendanceRecords);

        // 2. Results for Student
        await new Result({
            student: student._id,
            className: 'Class 10',
            examType: 'Mid Term',
            average: 85,
            subjects: [
                { subject: 'Math', marks: 90, grade: 'A+' },
                { subject: 'Science', marks: 80, grade: 'A' }
            ]
        }).save();

        // 3. Fees for Student
        await new Fee({
            student: student._id,
            title: 'Monthly Tuition Fee - Feb',
            amount: 150,
            dueDate: new Date(2026, 1, 28),
            status: 'Unpaid'
        }).save();

        // 4. Routines for Teacher
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const routineRecords = [];
        days.forEach(day => {
            routineRecords.push({
                className: '10',
                section: 'A',
                day,
                timeSlot: '09:00 AM - 10:00 AM',
                subject: 'Mathematics',
                teacher: teacher._id
            });
            routineRecords.push({
                className: '9',
                section: 'B',
                day,
                timeSlot: '11:00 AM - 12:00 PM',
                subject: 'Physics',
                teacher: teacher._id
            });
        });
        await Routine.insertMany(routineRecords);

        // 5. Books for Librarian
        await Book.insertMany([
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 5, availableCopies: 3 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 3, availableCopies: 1 },
            { title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 10, availableCopies: 8 }
        ]);

        // 6. Events
        await Event.insertMany([
            { title: 'Annual Sports Day', date: new Date(2026, 2, 15), type: 'Event' },
            { title: 'Mid-Term Exams', date: new Date(2026, 2, 20), type: 'Exam' },
            { title: 'Independence Day', date: new Date(2026, 2, 26), type: 'Holiday' }
        ]);

        // 7. Notices
        await Notice.insertMany([
            { title: 'New Semester Schedule', message: 'The schedule for the new semester is now available on your dashboards.', audience: 'All', postedBy: admin._id },
            { title: 'Parent-Teacher Meeting', message: 'Monthly PTM will be held this Saturday from 10 AM to 1 PM.', audience: 'Parent', postedBy: principal._id },
            { title: 'Library Book Returns', message: 'Please return all overdue books by Friday to avoid fines.', audience: 'Student', postedBy: librarian._id }
        ]);

        console.log('Workable demo data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
