import Dashboard from './components/Dashboard';

function App() {
  return (
    // Force dark mode globally for the premium builder look
    <div className="min-h-screen dark bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <Dashboard />
    </div>
  );
}

export default App;
