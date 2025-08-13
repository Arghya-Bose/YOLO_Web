import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ArrowLeft, Award } from 'lucide-react';
import { exams, courses } from '../data/mockData';
import { useExamResults } from '../hooks/useExamResults';
import { useAuth } from '../contexts/AuthContext';

const ExamDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitExamResult, getExamResult, hasPassedExam } = useExamResults();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const exam = exams.find(e => e.courseId === courseId);
  const course = courses.find(c => c.id === courseId);
  const previousResult = exam ? getExamResult(exam.id) : null;
  const hasPassed = exam ? hasPassedExam(exam.id) : false;

  useEffect(() => {
    if (exam && examStarted && !examCompleted) {
      setTimeRemaining(exam.timeLimit * 60); // Convert minutes to seconds
    }
  }, [exam, examStarted, examCompleted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeRemaining]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!exam || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Exam not found</p>
          <button
            onClick={() => navigate('/exams')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setTimeRemaining(exam.timeLimit * 60);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitExam = async () => {
    if (!user || !exam) return;

    setSubmitting(true);
    let correctAnswers = 0;
    exam.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / exam.questions.length) * 100);
    const passed = finalScore >= exam.passingScore;
    
    // Submit to database
    await submitExamResult(exam.id, finalScore, passed, selectedAnswers);
    
    setScore(finalScore);
    setExamCompleted(true);
    setSubmitting(false);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
  const allQuestionsAnswered = exam.questions.every(q => selectedAnswers[q.id] !== undefined);

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/exams')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Exams
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-3xl font-bold mb-2">{exam.courseName} Exam</h1>
                  <p className="text-lg">Test your knowledge and earn your certificate</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{exam.timeLimit}</div>
                  <div className="text-gray-600">Minutes</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{exam.questions.length}</div>
                  <div className="text-gray-600">Questions</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{exam.passingScore}%</div>
                  <div className="text-gray-600">Passing Score</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Exam Instructions:</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• You have {exam.timeLimit} minutes to complete the exam</li>
                  <li>• Each question has only one correct answer</li>
                  <li>• You need {exam.passingScore}% to pass</li>
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>

              <button
                onClick={handleStartExam}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examCompleted) {
    const passed = score >= exam.passingScore;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {passed ? 'Congratulations!' : 'Exam Complete'}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {passed 
                ? 'You have successfully passed the exam!' 
                : `You scored ${score}%. You need ${exam.passingScore}% to pass.`
              }
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{score}%</div>
                  <div className="text-gray-600">Your Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {exam.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length}/{exam.questions.length}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{exam.passingScore}%</div>
                  <div className="text-gray-600">Passing Score</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!passed && !hasPassed && (
                <button
                  onClick={() => {
                    setExamStarted(false);
                    setExamCompleted(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setScore(0);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Retake Exam
                </button>
              )}
              <button
                onClick={() => navigate('/exams')}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Exams
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with timer */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{exam.courseName} Exam</h1>
              <p className="text-gray-600">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                {formatTime(timeRemaining)}
              </div>
              <p className="text-gray-600 text-sm">Time Remaining</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion.id] === index
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span className="ml-2">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}

              {previousResult && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Previous attempt: {previousResult.score}% 
                    {previousResult.passed ? ' (Passed)' : ' (Failed)'}
                  </p>
                </div>
              )}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {Object.keys(selectedAnswers).length} of {exam.questions.length} questions answered
              </p>
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmitExam}
                disabled={!allQuestionsAnswered || submitting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Overview</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[exam.questions[index].id] !== undefined
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;