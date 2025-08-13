import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ExamResult {
  id: string;
  exam_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  completed_at: string;
}

export const useExamResults = () => {
  const { user } = useAuth();
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`examResults_${user.id}`);
      if (stored) {
        setExamResults(JSON.parse(stored));
      }
    } else {
      setExamResults([]);
    }
    setLoading(false);
  }, [user]);

  const submitExamResult = async (
    examId: string,
    score: number,
    passed: boolean,
    answers: Record<string, number>
  ) => {
    if (!user) return false;

    const newResult: ExamResult = {
      id: Date.now().toString(),
      exam_id: examId,
      score,
      passed,
      answers,
      completed_at: new Date().toISOString()
    };
    
    const updatedResults = [...examResults, newResult];
    setExamResults(updatedResults);
    localStorage.setItem(`examResults_${user.id}`, JSON.stringify(updatedResults));
    return true;
  };

  const getExamResult = (examId: string) => {
    return examResults.find(result => result.exam_id === examId);
  };

  const hasPassedExam = (examId: string) => {
    const result = getExamResult(examId);
    return result?.passed || false;
  };

  const getBestScore = (examId: string) => {
    const results = examResults.filter(result => result.exam_id === examId);
    return results.length > 0 ? Math.max(...results.map(r => r.score)) : 0;
  };

  return {
    examResults,
    loading,
    submitExamResult,
    getExamResult,
    hasPassedExam,
    getBestScore,
    refetch: () => {}
  };
};