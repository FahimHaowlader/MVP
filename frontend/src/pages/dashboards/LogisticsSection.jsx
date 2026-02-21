import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const LogisticsSection = () => {
    const { selectedChild } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [fees, setFees] = useState([]);

    // We can fetch fee history specifically or use the overview data. 
    // Let's re-fetch overview for simplicity or ideally a specific /logistics endpoint.
    // For MVP, reusing the overview endpoint logic but filtering/displaying logistics.

    useEffect(() => {
        if (selectedChild) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    // Re-using overview for now as it returns pending fees. 
                    // In real app, create specific endpoints for full history.
                    const res = await axios.get(`http://localhost:5001/api/parent/child/${selectedChild._id}/overview`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setFees(res.data.pendingFees || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [selectedChild]);

    if (!selectedChild) return <div>Please select a child.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Logistics</h2>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Fee Payment Status</h3>
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

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Notices & Events</h3>
                <p className="text-gray-500">School calendar and event notifications will appear here.</p>
            </div>
        </div>
    );
};

export default LogisticsSection;
