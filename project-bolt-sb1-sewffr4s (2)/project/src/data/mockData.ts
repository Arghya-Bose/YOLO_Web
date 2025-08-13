export interface Course {
  id: string;
  title: string;
  author: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  duration: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  enrolled: number;
  rating: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  questions: Question[];
  timeLimit: number; // in minutes
  passingScore: number; // percentage
}

export interface ReadingItem {
  id: string;
  title: string;
  category: 'News' | 'International' | 'Books';
  image: string;
  excerpt: string;
  author: string;
  publishDate: string;
}

export interface Job {
  id: string;
  title: string;
  type: 'YOLO Star' | 'Elite' | 'Infinity Certification';
  description: string;
  image: string;
  liveClass: boolean;
  startDate: string;
}

export const courses: Course[] = [
  // IT & Engineering
  {
    id: 'python-programming',
    title: 'Python Programming',
    author: 'Dr. Sarah Johnson',
    level: 'Beginner',
    language: 'English',
    duration: '8 weeks',
    category: 'IT & Engineering',
    subcategory: 'Programming',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn Python from scratch with hands-on projects and real-world applications.',
    enrolled: 1250,
    rating: 4.8
  },
  {
    id: 'blockchain-basics',
    title: 'Blockchain Basics',
    author: 'Prof. Michael Chen',
    level: 'Intermediate',
    language: 'English',
    duration: '6 weeks',
    category: 'IT & Engineering',
    subcategory: 'Blockchain',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Understanding blockchain technology and its applications in modern business.',
    enrolled: 890,
    rating: 4.6
  },
  {
    id: 'c-tutorial',
    title: 'C Programming Tutorial',
    author: 'John Martinez',
    level: 'Beginner',
    language: 'English',
    duration: '10 weeks',
    category: 'IT & Engineering',
    subcategory: 'Programming',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master C programming language with comprehensive tutorials and exercises.',
    enrolled: 2100,
    rating: 4.7
  },
  {
    id: 'embedded-c',
    title: 'Embedded C Programming',
    author: 'Emily Watson',
    level: 'Advanced',
    language: 'English',
    duration: '12 weeks',
    category: 'IT & Engineering',
    subcategory: 'Embedded Systems',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Advanced embedded C programming for microcontrollers and IoT devices.',
    enrolled: 450,
    rating: 4.9
  },

  // Business & Entrepreneurship
  {
    id: 'mathematical-optimization',
    title: 'Mathematical Optimization',
    author: 'Dr. Robert Kim',
    level: 'Intermediate',
    language: 'English',
    duration: '8 weeks',
    category: 'Business & Entrepreneurship',
    subcategory: 'Analytics',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Apply mathematical optimization techniques to solve business problems.',
    enrolled: 320,
    rating: 4.4
  },
  {
    id: 'import-export',
    title: 'Import & Export Business',
    author: 'Lisa Thompson',
    level: 'Beginner',
    language: 'English',
    duration: '6 weeks',
    category: 'Business & Entrepreneurship',
    subcategory: 'International Trade',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn the fundamentals of international trade and import-export business.',
    enrolled: 780,
    rating: 4.5
  },

  // Core to Future Tech
  {
    id: 'matlab-programming',
    title: 'Matlab Programming',
    author: 'Dr. Alex Rivera',
    level: 'Intermediate',
    language: 'English',
    duration: '10 weeks',
    category: 'Core to Future Tech',
    subcategory: 'Scientific Computing',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master MATLAB for scientific computing and data analysis.',
    enrolled: 560,
    rating: 4.6
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing',
    author: 'Prof. Maria Gonzalez',
    level: 'Advanced',
    language: 'English',
    duration: '14 weeks',
    category: 'Core to Future Tech',
    subcategory: 'Quantum Technology',
    image: 'https://images.pexels.com/photos/73833/wormhole-space-time-portal-vortex-73833.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Explore the fundamentals of quantum computing and quantum algorithms.',
    enrolled: 180,
    rating: 4.8
  },

  // Language + Soft Skill
  {
    id: 'spoken-english',
    title: 'Spoken English',
    author: 'Jennifer Davis',
    level: 'Beginner',
    language: 'English',
    duration: '8 weeks',
    category: 'Language + Soft Skill',
    subcategory: 'Communication',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Improve your English speaking skills with practical conversation practice.',
    enrolled: 1800,
    rating: 4.7
  },
  {
    id: 'soft-skills',
    title: 'Professional Soft Skills',
    author: 'Mark Wilson',
    level: 'Beginner',
    language: 'English',
    duration: '6 weeks',
    category: 'Language + Soft Skill',
    subcategory: 'Professional Development',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Develop essential soft skills for professional success.',
    enrolled: 950,
    rating: 4.5
  },

  // Yolo Extra Courses
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Mastery',
    author: 'Anna Rodriguez',
    level: 'Intermediate',
    language: 'English',
    duration: '8 weeks',
    category: 'Yolo Extra Courses',
    subcategory: 'Marketing',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Master digital marketing strategies and tools for modern businesses.',
    enrolled: 1100,
    rating: 4.6
  }
];

export const exams: Exam[] = [
  {
    id: 'python-exam',
    courseId: 'python-programming',
    courseName: 'Python Programming',
    timeLimit: 60,
    passingScore: 70,
    questions: [
      {
        id: '1',
        question: 'What is the correct way to create a list in Python?',
        options: ['list = []', 'list = ()', 'list = {}', 'list = ""'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: 'Which keyword is used to create a function in Python?',
        options: ['function', 'def', 'create', 'func'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: 'What does the len() function do?',
        options: ['Returns the length of an object', 'Creates a new list', 'Converts to string', 'None of the above'],
        correctAnswer: 0
      },
      {
        id: '4',
        question: 'How do you insert comments in Python code?',
        options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '<!-- This is a comment -->'],
        correctAnswer: 2
      },
      {
        id: '5',
        question: 'What is the output of print(2 ** 3)?',
        options: ['6', '8', '9', '5'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'blockchain-exam',
    courseId: 'blockchain-basics',
    courseName: 'Blockchain Basics',
    timeLimit: 45,
    passingScore: 75,
    questions: [
      {
        id: '1',
        question: 'What is a blockchain?',
        options: ['A type of database', 'A distributed ledger', 'A cryptocurrency', 'A mining algorithm'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: 'Who created Bitcoin?',
        options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charlie Lee', 'Roger Ver'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: 'What is a smart contract?',
        options: ['A legal document', 'Self-executing contract with code', 'A mining contract', 'A trading agreement'],
        correctAnswer: 1
      }
    ]
  }
];

export const readingItems: ReadingItem[] = [
  // News
  {
    id: 'news-1',
    title: 'The Future of Artificial Intelligence in Education',
    category: 'News',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'How AI is transforming the learning experience and making education more personalized...',
    author: 'Tech Today',
    publishDate: '2024-01-15'
  },
  {
    id: 'news-2',
    title: 'Online Learning Trends for 2024',
    category: 'News',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Discover the latest trends shaping online education and e-learning platforms...',
    author: 'Education Weekly',
    publishDate: '2024-01-10'
  },

  // International
  {
    id: 'international-1',
    title: 'Global Education Initiatives Making Impact',
    category: 'International',
    image: 'https://images.pexels.com/photos/6209509/pexels-photo-6209509.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Exploring educational programs that are making a difference worldwide...',
    author: 'World Education Report',
    publishDate: '2024-01-12'
  },
  {
    id: 'international-2',
    title: 'Cross-Cultural Learning in the Digital Age',
    category: 'International',
    image: 'https://images.pexels.com/photos/6207584/pexels-photo-6207584.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'How technology is breaking down barriers in international education...',
    author: 'Global Learning Network',
    publishDate: '2024-01-08'
  },

  // Books
  {
    id: 'books-1',
    title: 'Essential Books for Tech Professionals',
    category: 'Books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'A curated list of must-read books for anyone in the technology field...',
    author: 'Book Review Digest',
    publishDate: '2024-01-14'
  },
  {
    id: 'books-2',
    title: 'Learning Through Literature: A New Approach',
    category: 'Books',
    image: 'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'How classic literature can enhance modern learning experiences...',
    author: 'Literary Education Review',
    publishDate: '2024-01-11'
  }
];

export const jobs: Job[] = [
  {
    id: 'yolo-star-1',
    title: 'YOLO Star Certification Program',
    type: 'YOLO Star',
    description: 'Become a certified expert in your field with our comprehensive certification program.',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400',
    liveClass: true,
    startDate: '2024-02-01'
  },
  {
    id: 'elite-1',
    title: 'Elite Professional Development',
    type: 'Elite',
    description: 'Advanced professional development for industry leaders and senior professionals.',
    image: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=400',
    liveClass: true,
    startDate: '2024-02-15'
  },
  {
    id: 'infinity-1',
    title: 'Infinity Tech Certification',
    type: 'Infinity Certification',
    description: 'Master cutting-edge technologies with our advanced certification track.',
    image: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=400',
    liveClass: false,
    startDate: '2024-03-01'
  },
  {
    id: 'yolo-star-2',
    title: 'YOLO Star Leadership Program',
    type: 'YOLO Star',
    description: 'Develop leadership skills and advance your career with our exclusive program.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    liveClass: true,
    startDate: '2024-02-20'
  }
];

export const communityStats = {
  activeStudents: 15420,
  faculties: 180,
  technicalControllers: 25
};