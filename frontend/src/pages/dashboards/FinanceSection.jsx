import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceSection = () => {
    const [fees, setFees] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch Dashboard data again to get fees/events or create specific endpoints
                // Re-using dashboard endpoint for simplicity in MVP or separate if needed
                // For now, let's hit dashboard to get aggregated data or specific if available
                // Actually, let's create a specific fetch or just use dashboard aggregation
                const res = await axios.get('https://mvp-gilt-iota.vercel.app/api/student/dashboard', config);
                setFees(res.data.pendingFees);
                setEvents(res.data.upcomingEvents);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Finance & Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Finance */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Fee Status</h3>
                    {fees.length > 0 ? (
                        fees.map(fee => (
                            <div key={fee._id} className="border-b py-2 flex justify-between">
                                <span>{fee.title}</span>
                                <span className={`font-bold ${fee.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                                    {fee.status} (${fee.amount})
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No pending fees.</p>
                    )}
                </div>

                {/* Events */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">School Calendar</h3>
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="border-b py-2">
                                <p className="font-bold text-gray-800">{event.title}</p>
                                <p className="text-sm text-gray-500">{new Date(event.date).toDateString()}</p>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.type}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No upcoming events.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinanceSection;
