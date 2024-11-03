import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
            Kanban Tábla
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