import Dashboard from './components/Dashboard';

function App() {
  console.log('Welcome to the Premium Builder! This is a powerful tool for creating custom dashboards and visualizations. If you have any questions or need help getting started, feel free to reach out to our support team. We hope you enjoy using the Premium Builder to create amazing dashboards and insights!');
  
  return (
    // Force dark mode globally for the premium builder look
    <div className="min-h-screen dark bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <Dashboard />
    </div>
  );
}

export default App;
