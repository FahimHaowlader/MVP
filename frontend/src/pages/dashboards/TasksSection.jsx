import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksSection = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const token = localStorage.getItem('token');
                // Hardcoded class for MVP or fetch from profile
                const className = 'Class 10';
                const res = await axios.get(`http://localhost:5001/api/assignments/${className}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAssignments(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    const handleSubmit = async (id) => {
        // Placeholder for submission logic
        alert(`Submitting assignment ${id}`);
        // In real app, open modal to upload file
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Assignments</h3>
                <div className="grid gap-4">
                    {assignments.map(assignment => (
                        <div key={assignment._id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{assignment.title}</h4>
                                <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <p className="text-sm">{assignment.description}</p>
                            </div>
                            <button
                                onClick={() => handleSubmit(assignment._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    ))}
                    {assignments.length === 0 && <p>No pending assignments.</p>}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Digital Certificates</h3>
                <p className="text-gray-500">No certificates available yet.</p>
            </div>
        </div>
    );
};

export default TasksSection;
