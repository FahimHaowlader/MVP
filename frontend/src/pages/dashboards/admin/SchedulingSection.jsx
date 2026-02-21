import React, { useState } from 'react';
import axios from 'axios';

// Reusing GlobalManagementSection logic slightly but focused on admin capabilities

const SchedulingSection = () => {
    const [activeTab, setActiveTab] = useState('routine');
    const [status, setStatus] = useState('');

    // Routine State
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [day, setDay] = useState('Monday');
    const [timeSlot, setTimeSlot] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherId, setTeacherId] = useState('');

    // Exam Event State
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleRoutineSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/routines',
                { className, section, day, timeSlot, subject, teacherId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Routine added successfully');
        } catch (err) {
            setStatus('Error adding routine');
            console.error(err);
        }
    };

    const handleExamSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/events',
                { title: eventTitle, date: eventDate, type: 'Exam' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Exam Scheduled successfully');
        } catch (err) {
            setStatus('Error scheduling exam');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Scheduling</h2>

            <div className="flex space-x-4 mb-4">
                <button onClick={() => setActiveTab('routine')} className={`px-4 py-2 rounded ${activeTab === 'routine' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Class Routines</button>
                <button onClick={() => setActiveTab('exam')} className={`px-4 py-2 rounded ${activeTab === 'exam' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Exam Calendar</button>
            </div>

            {status && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{status}</div>}

            {activeTab === 'routine' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Manage Class Routine</h3>
                    <form onSubmit={handleRoutineSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Class Name" className="border p-2 rounded" value={className} onChange={e => setClassName(e.target.value)} required />
                            <input type="text" placeholder="Section" className="border p-2 rounded" value={section} onChange={e => setSection(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="border p-2 rounded" value={day} onChange={e => setDay(e.target.value)}>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <input type="text" placeholder="Time Slot (e.g. 10:00 AM - 11:00 AM)" className="border p-2 rounded" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Subject" className="border p-2 rounded" value={subject} onChange={e => setSubject(e.target.value)} required />
                            <input type="text" placeholder="Teacher ID" className="border p-2 rounded" value={teacherId} onChange={e => setTeacherId(e.target.value)} required />
                        </div>
                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Add Routine</button>
                    </form>
                </div>
            )}

            {activeTab === 'exam' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Schedule Exam</h3>
                    <form onSubmit={handleExamSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Exam Title</label>
                            <input type="text" className="w-full border p-2 rounded" value={eventTitle} onChange={e => setEventTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input type="date" className="w-full border p-2 rounded" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
                        </div>
                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Schedule</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SchedulingSection;
