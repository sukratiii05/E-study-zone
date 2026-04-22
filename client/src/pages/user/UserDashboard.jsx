import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import './UserDashboard.css'
import { Link } from 'react-router-dom';
const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <Users size={20} />, label: "My Students" },
    { icon: <BookOpen size={20} />, label: "Courses" },
    { icon: <GraduationCap size={20} />, label: "Assessments" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];
  return (
    <>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <div className="logo-section">
              <div className="logo-icon">T</div>
              {isOpen && <span className="logo-text">TrainerPro</span>}
            </div>
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
              <Menu size={20} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <ul>

              <li className="active">
                <Link to="">
                  <span className="icon"><LayoutDashboard size={20} /> My Students </span>
                  {isOpen && <span className="text"></span>}
                </Link>
              </li>
              <li className="active">
                <Link to="">
                  <span className="icon"><BookOpen size={20} /> Courses </span>
                  {isOpen && <span className="text"></span>}
                </Link>
              </li>
              <li className="active">
                <Link to="">
                  <span className="icon"><GraduationCap size={20} /> Assessments </span>
                  {isOpen && <span className="text"></span>}
                </Link>
              </li>
              <li className="active">
                <Link to="">
                  <span className="icon"><Settings size={20} /> Settings </span>
                  {isOpen && <span className="text"></span>}
                </Link>
              </li>

            </ul>
          </nav>

          <div className="sidebar-footer">
            <Link to="#">
              <span className="icon"><LogOut size={20} /></span>
              {isOpen && <span className="text">Logout</span>}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`main-content ${isOpen ? "shifted" : "full"}`}>
          {/* Top Navbar */}
          <header className="top-nav">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search students, courses..." />
            </div>

            <div className="nav-actions">
              <button className="icon-btn"><Bell size={20} /></button>
              <div className="user-profile">
                <img src="https://ui-avatars.com/api/?name=Trainer+John&background=6366f1&color=fff" alt="Profile" />
                <div className="user-info">
                  <span className="user-name">Trainer John</span>
                  <span className="user-role">Senior Instructor</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Body */}
          <div className="dashboard-body">
            <div className="welcome-banner">
              <h1>Welcome back, John! 👋</h1>
              <p>Here's what's happening with your classes today.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue"><Users /></div>
                <div className="stat-details">
                  <h3>152</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple"><BookOpen /></div>
                <div className="stat-details">
                  <h3>12</h3>
                  <p>Active Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green"><GraduationCap /></div>
                <div className="stat-details">
                  <h3>89%</h3>
                  <p>Avg. Completion</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="content-section">
              <div className="card">
                <div className="card-header">
                  <h5>Upcoming Classes</h5>
                  <button className="btn-link">View All</button>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Time</th>
                        <th>Students</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>React Advanced Patterns</td>
                        <td>10:00 AM</td>
                        <td>24</td>
                        <td><span className="badge bg-success">Scheduled</span></td>
                      </tr>
                      <tr>
                        <td>UI/UX Fundamentals</td>
                        <td>02:30 PM</td>
                        <td>18</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default UserDashboard