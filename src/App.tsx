import Dashboard from './components/Dashboard';

function App() {
  console.log('Hello world! This is a premium builder dashboard template built with React and Tailwind CSS. Feel free to explore the code and customize it to your needs. If you have any questions or need help, just ask!');
  
  return (
    // Force dark mode globally for the premium builder look
    <div className="min-h-screen dark bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <Dashboard />
    </div>
  );
}

export default App;
