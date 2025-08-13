import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, Target, Users } from 'lucide-react';
import { courses } from '../data/mockData';
import { useEnrollments } from '../hooks/useEnrollments';
import { useExamResults } from '../hooks/useExamResults';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { enrollments, getCourseProgress } = useEnrollments();
  const { examResults, hasPassedExam } = useExamResults();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter(course => 
    enrollments.some(enrollment => enrollment.course_id === course.id)
  );
  
  const totalProgress = enrollments.length > 0 
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  const completedCourses = enrollments.filter(e => e.completed).length;
  const passedExams = examResults.filter(r => r.passed).length;
  const totalHours = enrolledCourses.length * 8; // Estimate 8 hours per course

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Course Instructor', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'Michael Chen', role: 'Tech Mentor', avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'Emily Watson', role: 'Learning Advisor', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-12 relative z-10"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 text-lg">@{user.name.toLowerCase().replace(' ', '')}</p>
                <p className="text-gray-500 mt-2">{user.email}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
                <div className="text-3xl font-bold text-blue-600">{totalProgress}%</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Learning Progress</span>
                <span>{totalProgress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{enrolledCourses.length}</div>
                  <div className="text-gray-600 text-sm">Enrolled Courses</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{passedExams}</div>
                  <div className="text-gray-600 text-sm">Certificates Earned</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{totalHours}</div>
                  <div className="text-gray-600 text-sm">Hours Learned</div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
              
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 text-sm">{course.author}</p>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${getCourseProgress(course.id)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{getCourseProgress(course.id)}% Complete</div>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">San Francisco, CA</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                Edit Profile
              </button>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Goals</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Complete Python Course</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Master Blockchain Basics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Earn 3 Certificates</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Set New Goal
              </button>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Learning Team</h2>
              
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-gray-500 text-sm">{member.role}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Users className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;