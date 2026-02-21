const mongoose = require('mongoose');
const Routine = require('./models/Routine');

const seedRoutine = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/schoolms');
        console.log('Connected to MongoDB');

        const mockTeacherId = 'mock_id';

        const routines = [
            {
                className: '9',
                section: 'A',
                day: 'Monday',
                timeSlot: '09:00 AM - 10:00 AM',
                subject: 'Mathematics',
                teacher: mockTeacherId
            },
            {
                className: '10',
                section: 'B',
                day: 'Monday',
                timeSlot: '11:00 AM - 12:00 PM',
                subject: 'Physics',
                teacher: mockTeacherId
            },
            {
                className: '9',
                section: 'A',
                day: 'Tuesday',
                timeSlot: '10:00 AM - 11:00 AM',
                subject: 'Biology',
                teacher: mockTeacherId
            },
            {
                className: '10',
                section: 'C',
                day: 'Wednesday',
                timeSlot: '01:00 PM - 02:00 PM',
                subject: 'Chemistry',
                teacher: mockTeacherId
            },
            {
                className: '11',
                section: 'A',
                day: 'Thursday',
                timeSlot: '09:00 AM - 10:00 AM',
                subject: 'English',
                teacher: mockTeacherId
            },
            {
                className: '12',
                section: 'D',
                day: 'Friday',
                timeSlot: '02:00 PM - 03:00 PM',
                subject: 'History',
                teacher: mockTeacherId
            }
        ];

        await Routine.deleteMany({ teacher: mockTeacherId });
        await Routine.insertMany(routines);

        console.log('Routine seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding routine:', error);
        process.exit(1);
    }
};

seedRoutine();
