import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-['DM_Sans']">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#13A3B5] to-[#1739eb] inline-block text-transparent bg-clip-text">
            Do It Yourself
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <KanbanBoard />
      </main>
    </div>
  );
};

export default Index;