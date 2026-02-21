import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectorySection = () => {
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                let url = 'http://localhost:5001/api/users';
                if (roleFilter !== 'All') {
                    url += `?role=${roleFilter}`;
                }
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [roleFilter]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">School Directory</h2>

            <div className="flex items-center space-x-4">
                <label className="font-semibold text-gray-700">Filter by Role:</label>
                <select
                    className="border p-2 rounded"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="All">All roles</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Admin">Staff/Admin</option>
                </select>
            </div>

            {loading ? <div>Loading directory...</div> : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">{user.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Student' ? 'bg-blue-100 text-blue-800' :
                                                user.role === 'Teacher' ? 'bg-green-100 text-green-800' :
                                                    user.role === 'Parent' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-5 py-5 text-center text-gray-500">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DirectorySection;
