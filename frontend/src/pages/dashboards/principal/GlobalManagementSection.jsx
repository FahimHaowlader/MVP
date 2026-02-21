import React, { useState } from 'react';
import axios from 'axios';

const GlobalManagementSection = () => {
    const [activeTab, setActiveTab] = useState('events');
    const [status, setStatus] = useState('');

    // Event State
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventType, setEventType] = useState('Event');

    // Routine State
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [day, setDay] = useState('Monday');
    const [timeSlot, setTimeSlot] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherId, setTeacherId] = useState('');

    // Book State
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookIsbn, setBookIsbn] = useState('');
    const [copies, setCopies] = useState(1);

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://mvp-gilt-iota.vercel.app/api/events',
                { title: eventTitle, date: eventDate, type: eventType },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Event created successfully');
        } catch (err) {
            setStatus('Error creating event');
            console.error(err);
        }
    };

    const handleRoutineSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://mvp-gilt-iota.vercel.app/api/routines',
                { className, section, day, timeSlot, subject, teacherId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Routine added successfully');
        } catch (err) {
            setStatus('Error adding routine');
            console.error(err);
        }
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://mvp-gilt-iota.vercel.app/api/admin/library',
                { title: bookTitle, author: bookAuthor, isbn: bookIsbn, totalCopies: copies },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('Book added successfully');
        } catch (err) {
            setStatus('Error adding book');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Global Management</h2>

            <div className="flex space-x-4 mb-4">
                <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded ${activeTab === 'events' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Events/Exams</button>
                <button onClick={() => setActiveTab('routines')} className={`px-4 py-2 rounded ${activeTab === 'routines' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Routines</button>
                <button onClick={() => setActiveTab('library')} className={`px-4 py-2 rounded ${activeTab === 'library' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Library</button>
            </div>

            {status && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{status}</div>}

            {activeTab === 'events' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Create Event / Exam</h3>
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input type="text" className="w-full border p-2 rounded" value={eventTitle} onChange={e => setEventTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input type="date" className="w-full border p-2 rounded" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Type</label>
                            <select className="w-full border p-2 rounded" value={eventType} onChange={e => setEventType(e.target.value)}>
                                <option value="Event">Event</option>
                                <option value="Exam">Exam</option>
                                <option value="Holiday">Holiday</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
                    </form>
                </div>
            )}

            {activeTab === 'routines' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Add Class Routine</h3>
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
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Routine</button>
                    </form>
                </div>
            )}

            {activeTab === 'library' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Add Library Book</h3>
                    <form onSubmit={handleBookSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input type="text" className="w-full border p-2 rounded" value={bookTitle} onChange={e => setBookTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Author</label>
                            <input type="text" className="w-full border p-2 rounded" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="ISBN" className="border p-2 rounded" value={bookIsbn} onChange={e => setBookIsbn(e.target.value)} required />
                            <input type="number" placeholder="Copies" className="border p-2 rounded" value={copies} onChange={e => setCopies(e.target.value)} required />
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Book</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GlobalManagementSection;
