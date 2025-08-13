import React, { useState } from 'react';
import { Clock, BookOpen, Star, Users, Filter } from 'lucide-react';
import { courses } from '../data/mockData';
import { useEnrollments } from '../hooks/useEnrollments';
import { useAuth } from '../contexts/AuthContext';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const { enrollInCourse, isEnrolled, loading: enrollmentLoading } = useEnrollments();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(courses.map(course => course.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover world-class courses designed to help you achieve your learning goals and advance your career.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filter by:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory === 'All' ? (
          Object.entries(groupedCourses).map(([category, categoryCourses]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                user={user}
                isEnrolled={isEnrolled(course.id)}
                onEnroll={() => enrollInCourse(course.id)}
                enrollmentLoading={enrollmentLoading}
              />
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ 
  course: typeof courses[0];
  user: any;
  isEnrolled: boolean;
  onEnroll: () => Promise<boolean>;
  enrollmentLoading: boolean;
}> = ({ course, user, isEnrolled, onEnroll, enrollmentLoading }) => {
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    setEnrolling(true);
    const success = await onEnroll();
    if (success) {
      // Show success message or update UI
    }
    setEnrolling(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{course.subcategory}</span>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            {course.enrolled}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-3 text-sm">{course.author}</p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.language}
          </div>
        </div>
        
        <button 
          onClick={handleEnroll}
          disabled={enrolling || enrollmentLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.02] ${
            isEnrolled 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {enrolling ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enrolling...
            </div>
          ) : isEnrolled ? (
            'Enrolled ✓'
          ) : (
            'Enroll Now'
          )}
        </button>
      </div>
    </div>
  );
};

export default Courses;