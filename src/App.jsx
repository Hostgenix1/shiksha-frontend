import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import { AdminDataProvider } from "./admin/context/AdminDataContext";
import ScrollToTop from "./components/ScrollToTop";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Colleges from "./pages/Colleges";
import Exams from "./pages/Exams";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CollegeDetail from "./pages/CollegeDetail";
import CourseDetail from "./pages/CourseDetail";
import ExamDetail from "./pages/ExamDetail";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLeads from "./admin/pages/AdminLeads";
import AdminLeadDetail from "./admin/pages/AdminLeadDetail";
import AdminPipeline from "./admin/pages/AdminPipeline";
import AdminTasks from "./admin/pages/AdminTasks";
import AdminStudents from "./admin/pages/AdminStudents";
import AdminApplications from "./admin/pages/AdminApplications";
import AdminCatalog from "./admin/pages/AdminCatalog";
import AdminInvoices from "./admin/pages/AdminInvoices";
import AdminReports from "./admin/pages/AdminReports";
import AdminContent from "./admin/pages/AdminContent";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminSettings from "./admin/pages/AdminSettings";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminDataProvider>
                  <AdminLayout />
                </AdminDataProvider>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="leads/:id" element={<AdminLeadDetail />} />
              <Route path="pipeline" element={<AdminPipeline />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="colleges" element={<AdminCatalog type="colleges" />} />
              <Route path="courses" element={<AdminCatalog type="courses" />} />
              <Route path="exams" element={<AdminCatalog type="exams" />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:id" element={<CollegeDetail />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:slug" element={<ExamDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
