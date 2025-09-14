import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Downing Travel Agency. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          API running on: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;