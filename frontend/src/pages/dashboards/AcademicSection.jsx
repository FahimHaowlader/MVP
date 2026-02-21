import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcademicSection = () => {
    const [results, setResults] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [syllabus, setSyllabus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch Results
                const resultsRes = await axios.get('http://localhost:5001/api/results/my', config);
                setResults(resultsRes.data);

                // Fetch Routine (assuming user has className 'Class 10', section 'A' - this should come from user profile ideally)
                // For MVP simplify or fetch profile first. 
                // Let's assume we fetch profile to get class/section
                const profileRes = await axios.get('http://localhost:5001/api/student/profile', config);
                // NOT IMPLEMENTED FULL PROFILE YET, MOCKING FOR SAFETY OR USING DEFAULTS IF FAIL
                // In real app, we need profile.className

                // Fetch Syllabus
                const syllabusRes = await axios.get(`http://localhost:5001/api/syllabus/student/all`, config); // Need this endpoint
                setSyllabus(syllabusRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Academic</h2>

            {/* Results Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Exam Results</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Marks</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Average</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.examType}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.totalMarks}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.average}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{result.cgpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Syllabus Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Syllabus</h3>
                <ul>
                    {syllabus.map(item => (
                        <li key={item._id} className="border-b py-2 flex justify-between items-center">
                            <span>{item.title} ({item.subject})</span>
                            <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Download</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AcademicSection;
