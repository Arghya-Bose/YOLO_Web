import React, { useState } from 'react';
import { Calendar, User, ExternalLink, BookOpen, Newspaper, Globe } from 'lucide-react';
import { readingItems } from '../data/mockData';

const Reading: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'News', 'International', 'Books'];
  
  const filteredItems = selectedCategory === 'All' 
    ? readingItems 
    : readingItems.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'News':
        return <Newspaper className="h-5 w-5" />;
      case 'International':
        return <Globe className="h-5 w-5" />;
      case 'Books':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News':
        return 'bg-red-100 text-red-800';
      case 'International':
        return 'bg-blue-100 text-blue-800';
      case 'Books':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reading Library
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with our curated collection of articles, international news, and recommended books.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category !== 'All' && getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory === 'All' ? (
          // Show grouped by category
          categories.slice(1).map(category => {
            const categoryItems = readingItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(category)}
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                  </div>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map(item => (
                    <ReadingCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Show filtered items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <ReadingCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ReadingCard: React.FC<{ item: typeof readingItems[0] }> = ({ item }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'News':
        return <Newspaper className="h-4 w-4" />;
      case 'International':
        return <Globe className="h-4 w-4" />;
      case 'Books':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News':
        return 'bg-red-100 text-red-800';
      case 'International':
        return 'bg-blue-100 text-blue-800';
      case 'Books':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
            {getCategoryIcon(item.category)}
            <span>{item.category}</span>
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {item.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(item.publishDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group">
          <span>Read More</span>
          <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Reading;