import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Kanban Tábla</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <KanbanBoard />
      </main>
    </div>
  );
};

export default Index;