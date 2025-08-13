import React from 'react';
import { Calendar, Users, Award, Play } from 'lucide-react';
import { jobs } from '../data/mockData';

const Jobs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Advance your career with our professional certification programs and live training sessions.
          </p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.type === 'YOLO Star' ? 'bg-yellow-100 text-yellow-800' :
                    job.type === 'Elite' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                {job.liveClass && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Starts: {new Date(job.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Certificate</span>
                  </div>
                </div>
                
                {job.liveClass ? (
                  <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center">
                    <Play className="h-5 w-5 mr-2" />
                    Join Live Class
                  </button>
                ) : (
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    <Users className="h-5 w-5 mr-2" />
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Job Types Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Career Path
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">YOLO Star</h3>
              <p className="text-gray-600 mb-6">
                Entry-level certification programs designed for beginners looking to start their tech career.
              </p>
              <ul className="text-left text-gray-600 text-sm space-y-2">
                <li>✓ Basic certification</li>
                <li>✓ Mentorship support</li>
                <li>✓ Job placement assistance</li>
                <li>✓ Community access</li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Elite</h3>
              <p className="text-gray-600 mb-6">
                Advanced programs for professionals seeking to enhance their skills and advance their careers.
              </p>
              <ul className="text-left text-gray-600 text-sm space-y-2">
                <li>✓ Advanced certification</li>
                <li>✓ Industry expert sessions</li>
                <li>✓ Real-world projects</li>
                <li>✓ Career coaching</li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Infinity Certification</h3>
              <p className="text-gray-600 mb-6">
                Master-level certification for experts who want to stay ahead with cutting-edge technologies.
              </p>
              <ul className="text-left text-gray-600 text-sm space-y-2">
                <li>✓ Master certification</li>
                <li>✓ Research opportunities</li>
                <li>✓ Innovation projects</li>
                <li>✓ Executive mentorship</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;