import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, CheckCircle } from 'lucide-react';
import { exams, courses } from '../data/mockData';

const Exams: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course Examinations
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Test your knowledge and earn certificates by taking our comprehensive course examinations.
          </p>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map(exam => {
            const course = courses.find(c => c.id === exam.courseId);
            if (!course) return null;

            return (
              <div key={exam.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <FileText className="h-12 w-12 mx-auto mb-2" />
                      <span className="text-lg font-semibold">Examination</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {exam.courseName} Exam
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    Test your understanding of {course.title} concepts and earn your completion certificate.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{exam.questions.length} Questions</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span>{exam.timeLimit} Minutes</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-orange-600" />
                      <span>{exam.passingScore}% Passing Score</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/exams/${exam.courseId}`}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 block text-center"
                  >
                    Start Exam
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {exams.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No examinations available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;