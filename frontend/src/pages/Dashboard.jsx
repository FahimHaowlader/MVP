import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AdminDashboard from './dashboards/AdminDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    if (user.role === 'Student') {
        return <Navigate to="/student/dashboard" replace />;
    }

    if (user.role === 'Parent') {
        return <Navigate to="/parent/dashboard" replace />;
    }

    if (user.role === 'Teacher') {
        return <Navigate to="/teacher/dashboard" replace />;
    }

    if (user.role === 'Principal') {
        return <Navigate to="/principal/dashboard" replace />;
    }

    if (user.role === 'Admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === 'Librarian') {
        return <Navigate to="/librarian/dashboard" replace />;
    }

    if (user.role === 'Staff') {
        return <Navigate to="/staff/dashboard" replace />;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <span>Role: {user.role}</span>
            </header>
            <main className="dashboard-content">
                {/* Add other roles here */}
                {['Parent', 'Librarian', 'Accountant', 'Principal'].includes(user.role) && (
                    <div>
                        <h3>{user.role} Dashboard</h3>
                        <p>Welcome to the {user.role} portal. (Feature coming soon)</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
