import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#13A3B5] to-[#1739eb] inline-block text-transparent bg-clip-text">
          Do It Yourself
        </h1>
        <p className="text-xl text-gray-600">
          A simple and elegant Kanban board to organize your tasks and boost productivity
        </p>
        <Button 
          onClick={() => navigate('/board')} 
          className="bg-gradient-to-r from-[#13A3B5] to-[#1739eb] text-white px-8 py-6 text-lg rounded-xl hover:shadow-[0_8px_30px_rgba(19,163,181,0.3)] transition-all duration-300"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        Developed by: FarkasAtis - ArraboMarket
      </footer>
    </div>
  );
};

export default Landing;