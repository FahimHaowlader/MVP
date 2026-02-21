const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/routines', require('./routes/routineRoutes'));
app.use('/api/syllabus', require('./routes/syllabusRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/parent', require('./routes/parentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Failed (Optional for Mock Mode):', err.message));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const { initSocket } = require('./socket');
initSocket(server);
