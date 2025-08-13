import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress: number;
  completed: boolean;
}

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`enrollments_${user.id}`);
      if (stored) {
        setEnrollments(JSON.parse(stored));
      }
    } else {
      setEnrollments([]);
    }
    setLoading(false);
  }, [user]);

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    if (!user) return false;

    // Check if already enrolled
    if (enrollments.some(e => e.course_id === courseId)) {
      return true;
    }

    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      user_id: user.id,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress: 0,
      completed: false
    };
    
    const updatedEnrollments = [...enrollments, newEnrollment];
    setEnrollments(updatedEnrollments);
    localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(updatedEnrollments));
    return true;
  };

  const isEnrolled = (courseId: string): boolean => {
    return enrollments.some(e => e.course_id === courseId);
  };

  const getCourseProgress = (courseId: string): number => {
    const enrollment = enrollments.find(e => e.course_id === courseId);
    return enrollment?.progress || 0;
  };

  const updateProgress = async (courseId: string, progress: number): Promise<boolean> => {
    if (!user) return false;

    const updatedEnrollments = enrollments.map(e => 
      e.course_id === courseId 
        ? { ...e, progress, completed: progress >= 100 }
        : e
    );
    
    setEnrollments(updatedEnrollments);
    localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(updatedEnrollments));
    return true;
  };

  return {
    enrollments,
    loading,
    enrollInCourse,
    isEnrolled,
    getCourseProgress,
    updateProgress,
    refetch: () => {}
  };
};