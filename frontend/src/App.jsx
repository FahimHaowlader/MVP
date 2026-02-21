import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import AcademicSection from "./pages/dashboards/AcademicSection";
import TasksSection from "./pages/dashboards/TasksSection";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import MonitoringSection from "./pages/dashboards/MonitoringSection";
import FinanceSection from "./pages/dashboards/FinanceSection";
import LogisticsSection from "./pages/dashboards/LogisticsSection";
import ClassManagementSection from "./pages/dashboards/teacher/ClassManagementSection";
import GradingSection from "./pages/dashboards/teacher/GradingSection";
import CommunicationSection from "./pages/dashboards/teacher/CommunicationSection";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import PrincipalDashboard from "./pages/dashboards/PrincipalDashboard";
import PrincipalHome from "./pages/dashboards/principal/PrincipalHome";
import DirectorySection from "./pages/dashboards/principal/DirectorySection";
import GlobalManagementSection from "./pages/dashboards/principal/GlobalManagementSection";
import PrincipalAddStaff from "./pages/dashboards/principal/PrincipalAddStaff";
import NotificationCenter from "./pages/dashboards/principal/NotificationCenter";
import CreateAnnouncement from "./pages/dashboards/principal/CreateAnnouncement";
import RequestDetail from "./pages/dashboards/principal/RequestDetail";
import TeacherRequests from "./pages/dashboards/principal/TeacherRequests";
import StudentPerformance from "./pages/dashboards/principal/StudentPerformance";
import MultiClassComparison from "./pages/dashboards/principal/MultiClassComparison";
import EventAnnouncement from "./pages/dashboards/principal/EventAnnouncement";
import TeacherAnalytics from "./pages/dashboards/principal/TeacherAnalytics";
import EventPublished from "./pages/dashboards/principal/EventPublished";
import CreateNewEvent from "./pages/dashboards/principal/CreateNewEvent";
import ExamRoutineWizard from "./pages/dashboards/principal/ExamRoutineWizard";
import FindFreeTeacher from "./pages/dashboards/principal/FindFreeTeacher";
import CreateExamRoutine from "./pages/dashboards/principal/CreateExamRoutine";
import LibraryDashboard from "./pages/dashboards/principal/LibraryDashboard";
import EventsDashboard from "./pages/dashboards/principal/EventsDashboard";
import RoutineSelector from "./pages/dashboards/principal/RoutineSelector";
import TeacherPerformanceDashboard from "./pages/dashboards/principal/TeacherPerformanceDashboard";
import TeacherPerformanceOverview from "./pages/dashboards/principal/TeacherPerformanceOverview";
import RestoreDeletedRooms from "./pages/dashboards/principal/RestoreDeletedRooms";
import ReviewExamRoutine from "./pages/dashboards/principal/ReviewExamRoutine";
import ManageClasses from "./pages/dashboards/principal/ManageClasses";
import StaffAttendance from "./pages/dashboards/principal/StaffAttendance";
import StaffDirectory from "./pages/dashboards/principal/StaffDirectory";
import SchoolPerformanceDashboard from "./pages/dashboards/principal/SchoolPerformanceDashboard";
import ClassPerformanceDetail from "./pages/dashboards/principal/ClassPerformanceDetail";
import LibraryStaffDashboard from "./pages/dashboards/principal/LibraryStaffDashboard";
import CreateSchoolEvent from "./pages/dashboards/principal/CreateSchoolEvent";
import TeacherWeeklySchedule from "./pages/dashboards/principal/TeacherWeeklySchedule";
import StaffQualifications from "./pages/dashboards/principal/StaffQualifications";
import OperationsSection from "./pages/dashboards/admin/OperationsSection";
import SchedulingSection from "./pages/dashboards/admin/SchedulingSection";
import SyllabusManagement from "./pages/dashboards/admin/SyllabusManagement";
import StaffProfiles from "./pages/dashboards/admin/StaffProfiles";
import RoutineOverview from "./pages/dashboards/admin/RoutineOverview";
import FeeManagement from "./pages/dashboards/admin/FeeManagement";
import SchoolCalendar from "./pages/dashboards/admin/SchoolCalendar";
import EventResults from "./pages/dashboards/admin/EventResults";
import ECertificateCreator from "./pages/dashboards/admin/ECertificateCreator";
import ECertificateLibrary from "./pages/dashboards/admin/ECertificateLibrary";
import EditCertificate from "./pages/dashboards/admin/EditCertificate";
import EditResults from "./pages/dashboards/admin/EditResults";
import EditStudentProfile from "./pages/dashboards/admin/EditStudentProfile";
import AddEvent from "./pages/dashboards/admin/AddEvent";
import AddEventResults from "./pages/dashboards/admin/AddEventResults";
import AddStaffMember from "./pages/dashboards/admin/AddStaffMember";
import AddStudent from "./pages/dashboards/admin/AddStudent";
import AddTeacher from "./pages/dashboards/admin/AddTeacher";
import AddStudentDocument from "./pages/dashboards/admin/AddStudentDocument";
import UploadPayments from "./pages/dashboards/admin/UploadPayments";
import ClassroomScheduler from "./pages/dashboards/admin/ClassroomScheduler";
import ReviewPublishSyllabus from "./pages/dashboards/admin/ReviewPublishSyllabus";
import ConfirmRoutineSubmission from "./pages/dashboards/admin/ConfirmRoutineSubmission";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import LibrarianDashboard from "./pages/dashboards/LibrarianDashboard";
import InventorySection from "./pages/dashboards/librarian/InventorySection";
import CirculationSection from "./pages/dashboards/librarian/CirculationSection";
import LibrarianDashboardHome from "./pages/dashboards/librarian/DashboardHome";
import IssueBook from "./pages/dashboards/librarian/IssueBook";
import ReturnBook from "./pages/dashboards/librarian/ReturnBook";
import ManageBooks from "./pages/dashboards/librarian/ManageBooks";
import ManageStudents from "./pages/dashboards/librarian/ManageStudents";
import StaffDashboard from "./pages/dashboards/StaffDashboard";
import StaffProfileSection from "./pages/dashboards/staff/ProfileSection";
import TeacherProfileSection from "./pages/dashboards/teacher/ProfileSection";
import AssignmentsSection from "./pages/dashboards/teacher/AssignmentsSection";
import StudentsSection from "./pages/dashboards/teacher/StudentsSection";
import RoutineSection from "./pages/dashboards/teacher/RoutineSection";
import MyAttendanceSection from "./pages/dashboards/teacher/MyAttendanceSection";
import AnnouncementDetail from "./pages/dashboards/student/AnnouncementDetail";
import DashboardHome from "./pages/dashboards/student/DashboardHome";
import StudentProfile from "./pages/dashboards/student/StudentProfile";
import StudentRoutineSection from "./pages/dashboards/student/StudentRoutineSection";
import StudentAttendanceSection from "./pages/dashboards/student/StudentAttendanceSection";
import StudentResultsSection from "./pages/dashboards/student/StudentResultsSection";
import StudentAssignmentsSection from "./pages/dashboards/student/StudentAssignmentsSection";
import StudentCalendarSection from "./pages/dashboards/student/StudentCalendarSection";
import StudentEventsSection from "./pages/dashboards/student/StudentEventsSection";
import StudentAnnouncementsSection from "./pages/dashboards/student/StudentAnnouncementsSection";
import StudentCertificatesSection from "./pages/dashboards/student/StudentCertificatesSection";
import EventDetail from "./pages/dashboards/student/EventDetail";
import StudentFinanceSection from "./pages/dashboards/student/StudentFinanceSection";
import StudentSupportSection from "./pages/dashboards/student/StudentSupportSection";
import StudentSyllabusSection from "./pages/dashboards/student/StudentSyllabusSection";
import ParentProfile from "./pages/dashboards/parent/ParentProfile";
import ParentAttendanceSection from "./pages/dashboards/parent/AttendanceSection";
import ParentResultsSection from "./pages/dashboards/parent/ResultsSection";
import ParentFinanceSection from "./pages/dashboards/parent/FinanceSection";
import ParentCommunicationSection from "./pages/dashboards/parent/CommunicationSection";
import ParentSecuritySection from "./pages/dashboards/parent/SecuritySection";
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Student Routes */}
        <Route path="/student" element={<PrivateRoute role="Student"><StudentDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="routine" element={<StudentRoutineSection />} />
          <Route path="grading" element={<StudentResultsSection />} />
          <Route path="attendance" element={<StudentAttendanceSection />} />
          <Route path="tasks" element={<StudentAssignmentsSection />} />
          <Route path="calendar" element={<StudentCalendarSection />} />
          <Route path="events" element={<StudentEventsSection />} />
          <Route path="announcements" element={<StudentAnnouncementsSection />} />
          <Route path="announcement/:id" element={<AnnouncementDetail />} />
          <Route path="events" element={<StudentEventsSection />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="finance" element={<StudentFinanceSection />} />
          <Route path="syllabus" element={<StudentSyllabusSection />} />
          <Route path="certificates" element={<StudentCertificatesSection />} />
          <Route path="support" element={<StudentSupportSection />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<PrivateRoute role="Parent"><ParentDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<ParentProfile />} />
          <Route path="profile" element={<ParentProfile />} />
          <Route path="attendance" element={<ParentAttendanceSection />} />
          <Route path="results" element={<ParentResultsSection />} />
          <Route path="finance" element={<ParentFinanceSection />} />
          <Route path="communication" element={<ParentCommunicationSection />} />
          <Route path="security" element={<ParentSecuritySection />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<PrivateRoute role="Teacher"><TeacherDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<RoutineSection />} />
          <Route path="routine" element={<RoutineSection />} />
          <Route path="attendance" element={<MyAttendanceSection />} />
          <Route path="classes" element={<ClassManagementSection />} />
          <Route path="students" element={<StudentsSection />} />
          <Route path="assignments" element={<AssignmentsSection />} />
          <Route path="grading" element={<GradingSection />} />
          <Route path="communication" element={<CommunicationSection />} />
          <Route path="profile" element={<TeacherProfileSection />} />
        </Route>

        {/* Principal Routes */}
        <Route path="/principal" element={<PrivateRoute role="Principal"><PrincipalDashboard /></PrivateRoute>}>
          <Route index element={<PrincipalHome />} />
          <Route path="dashboard" element={<PrincipalHome />} />
          <Route path="directory" element={<DirectorySection />} />
          <Route path="global" element={<GlobalManagementSection />} />
          <Route path="staff/add" element={<PrincipalAddStaff />} />
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="announcements/create" element={<CreateAnnouncement />} />
          <Route path="requests" element={<TeacherRequests />} />
          <Route path="request-detail" element={<RequestDetail />} />
          <Route path="performance" element={<StudentPerformance />} />
          <Route path="compare" element={<MultiClassComparison />} />
          <Route path="event-announcement" element={<EventAnnouncement />} />
          <Route path="teacher-analytics" element={<TeacherAnalytics />} />
          <Route path="event-published" element={<EventPublished />} />
          <Route path="events/create" element={<CreateNewEvent />} />
          <Route path="exam-routine" element={<ExamRoutineWizard />} />
          <Route path="find-teacher" element={<FindFreeTeacher />} />
          <Route path="exam-routine/create" element={<CreateExamRoutine />} />
          <Route path="library" element={<LibraryDashboard />} />
          <Route path="events" element={<EventsDashboard />} />
          <Route path="routine-selector" element={<RoutineSelector />} />
          <Route path="teacher-performance" element={<TeacherPerformanceDashboard />} />
          <Route path="teacher-performance/overview" element={<TeacherPerformanceOverview />} />
          <Route path="rooms/restore" element={<RestoreDeletedRooms />} />
          <Route path="exam-routine/review" element={<ReviewExamRoutine />} />
          <Route path="classes" element={<ManageClasses />} />
          <Route path="staff-attendance" element={<StaffAttendance />} />
          <Route path="staff-directory" element={<StaffDirectory />} />
          <Route path="school-performance" element={<SchoolPerformanceDashboard />} />
          <Route path="class-performance" element={<ClassPerformanceDetail />} />
          <Route path="library-staff" element={<LibraryStaffDashboard />} />
          <Route path="events/new" element={<CreateSchoolEvent />} />
          <Route path="teacher-schedule" element={<TeacherWeeklySchedule />} />
          <Route path="staff-qualifications" element={<StaffQualifications />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute role="Admin"><AdminDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<OperationsSection />} />
          <Route path="syllabus" element={<SyllabusManagement />} />
          <Route path="staff" element={<StaffProfiles />} />
          <Route path="routine" element={<RoutineOverview />} />
          <Route path="fees" element={<FeeManagement />} />
          <Route path="calendar" element={<SchoolCalendar />} />
          <Route path="events" element={<EventResults />} />
          <Route path="events/add" element={<AddEvent />} />
          <Route path="events/add-results" element={<AddEventResults />} />
          <Route path="certificates" element={<ECertificateLibrary />} />
          <Route path="certificates/create" element={<ECertificateCreator />} />
          <Route path="certificates/edit" element={<EditCertificate />} />
          <Route path="edit-results" element={<EditResults />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit" element={<EditStudentProfile />} />
          <Route path="students/document" element={<AddStudentDocument />} />
          <Route path="staff/add" element={<AddStaffMember />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="fees/upload" element={<UploadPayments />} />
          <Route path="scheduler" element={<ClassroomScheduler />} />
          <Route path="syllabus/review" element={<ReviewPublishSyllabus />} />
          <Route path="routine/confirm" element={<ConfirmRoutineSubmission />} />
          <Route path="operations" element={<OperationsSection />} />
          <Route path="scheduling" element={<SchedulingSection />} />
        </Route>

        {/* Librarian Routes */}
        <Route path="/librarian" element={<PrivateRoute role="Librarian"><LibrarianDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<LibrarianDashboardHome />} />
          <Route path="issue" element={<IssueBook />} />
          <Route path="return" element={<ReturnBook />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="students" element={<ManageStudents />} />
          {/* Legacy routes */}
          <Route path="inventory" element={<InventorySection />} />
          <Route path="circulation" element={<CirculationSection />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<PrivateRoute role="Staff"><StaffDashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<StaffProfileSection />} />
          <Route path="profile" element={<StaffProfileSection />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
