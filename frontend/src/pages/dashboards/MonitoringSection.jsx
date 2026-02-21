import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const MonitoringSection = () => {
    const { selectedChild } = useOutletContext();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedChild) {
            const fetchStats = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://localhost:5001/api/parent/child/${selectedChild._id}/overview`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setStats(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
    }, [selectedChild]);

    if (!selectedChild) return <div>Please select a child.</div>;
    if (loading) return <div>Loading data...</div>;
    if (!stats) return <div>No data available.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Academic & Attendance Monitoring</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attendance */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Recent Attendance</h3>
                    {stats.attendance && stats.attendance.length > 0 ? (
                        <ul>
                            {stats.attendance.map(att => (
                                <li key={att._id} className="border-b py-2 flex justify-between">
                                    <span>{new Date(att.date).toLocaleDateString()}</span>
                                    <span className={`font-bold ${att.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>
                                        {att.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No attendance records found.</p>
                    )}
                </div>

                {/* Results */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Recent Results</h3>
                    {stats.recentResults && stats.recentResults.length > 0 ? (
                        <ul>
                            {stats.recentResults.map(res => (
                                <li key={res._id} className="border-b py-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold">{res.examType}</span>
                                        <span>Avg: {res.average}%</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonitoringSection;
