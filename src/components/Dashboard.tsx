import { useState, useEffect, useRef, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import _ from 'lodash';
import { Users, DollarSign, Activity, ShoppingBag, Plus, ChevronDown } from 'lucide-react';
import Widget from './Widget';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import ActivityFeed from './ActivityFeed';
import RecentOrdersTable from './RecentOrdersTable';
import TrafficSourceChart from './TrafficSourceChart';
import ServerStatus from './ServerStatus';
import QuickActions from './QuickActions';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Configuration ---
const STORAGE_KEY = 'dashboard-layout-v10-compact';
const ROW_HEIGHT = 30;
const MARGIN: [number, number] = [16, 16];
const CONTAINER_PADDING: [number, number] = [16, 16];

// --- Types ---
type WidgetType = 'stat-revenue' | 'stat-users' | 'stat-sales' | 'stat-bounce' |
                  'graph-revenue' | 'graph-traffic' |
                  'table-orders' | 'list-activity' |
                  'stat-server' | 'action-bar';

interface DashboardItem {
  id: string;
  type: WidgetType;
}

// Define specific interface for our usages to avoid type conflicts with strict strict checking
interface GridLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// --- Initial Data ---
const initialItems: DashboardItem[] = [
  { id: 'stat1', type: 'stat-revenue' },
  { id: 'stat2', type: 'stat-users' },
  { id: 'stat3', type: 'stat-sales' },
  { id: 'stat4', type: 'stat-bounce' },
  { id: 'chart1', type: 'graph-revenue' },
  { id: 'chart2', type: 'graph-traffic' },
  { id: 'table1', type: 'table-orders' },
  { id: 'feed1', type: 'list-activity' },
  { id: 'server1', type: 'stat-server' },
  { id: 'actions1', type: 'action-bar' },
];

const initialLayouts: { lg: GridLayoutItem[] } = {
  lg: [
    // Compact Layout
    // Stats: h=4 -> (4*30) + (3*16) = 120 + 48 = 168px
    { i: 'stat1', x: 0, y: 0, w: 3, h: 4 },
    { i: 'stat2', x: 3, y: 0, w: 3, h: 4 },
    { i: 'stat3', x: 6, y: 0, w: 3, h: 4 },
    { i: 'stat4', x: 9, y: 0, w: 3, h: 4 },
    
    // Charts: h=8 -> (8*30) + (7*16) = 240 + 112 = 352px
    { i: 'chart1', x: 0, y: 4, w: 8, h: 8 },
    { i: 'chart2', x: 8, y: 4, w: 4, h: 8 },
    
    // Tables: h=9 -> 398px
    { i: 'table1', x: 0, y: 12, w: 8, h: 9 },
    { i: 'feed1', x: 8, y: 12, w: 4, h: 9 },
    
    // Utilities: h=5 -> (5*30) + (4*16) = 150 + 64 = 214px
    { i: 'server1', x: 0, y: 21, w: 4, h: 5 },
    { i: 'actions1', x: 4, y: 21, w: 4, h: 5 },
  ]
};

const Dashboard = () => {
  const [items, setItems] = useState<DashboardItem[]>(initialItems);
  const [layouts, setLayouts] = useState<any>(initialLayouts);
  const [mounted, setMounted] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // --- Initialization ---
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.items && parsed.layouts) {
          setItems(parsed.items);
          setLayouts(parsed.layouts);
        }
      } catch (e) {
        console.error("Failed to load layout", e);
      }
    }
  }, []);

  // --- Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Layout Change ---
  const onLayoutChange = useCallback((_currentLayout: any, allLayouts: any) => {
    if (!mounted) return;
    setLayouts(allLayouts);
    
    // Debounce save
    const save = _.debounce(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, layouts: allLayouts }));
    }, 500);
    save();
  }, [items, mounted]);

  const onResetLayout = () => {
    setItems(initialItems);
    setLayouts(initialLayouts);
    localStorage.removeItem(STORAGE_KEY);
  };

  const onAddItem = (type: WidgetType) => {
    const id = `new_${type}_${Date.now()}`;
    const newItem: DashboardItem = { id, type };
    
    // Determine default size (Compact)
    let w = 4;
    let h = 9;
    
    if (type.includes('stat') && !type.includes('server')) { w = 3; h = 4; }
    else if (type.includes('graph-revenue')) { w = 8; h = 8; }
    else if (type.includes('graph-traffic')) { w = 4; h = 8; }
    else if (type.includes('table')) { w = 8; h = 9; }
    else if (type.includes('server') || type.includes('action')) { w = 4; h = 5; }

    setItems(prev => [...prev, newItem]);
    
    // We let RGL handle the placement logic naturally or append to layouts
    setLayouts((prev: any) => ({
        ...prev,
        lg: [
            ...(prev.lg || []),
            { i: id, x: 0, y: Infinity, w, h }
        ]
    }));
    
    setIsAddMenuOpen(false);
  };

  const onRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // --- Render Helpers ---
  const renderWidgetContent = (type: WidgetType) => {
    switch (type) {
      case 'stat-revenue': return <StatCard title="Total Revenue" value="$45,231" trend="+20.1%" trendUp={true} icon={DollarSign} variant="emerald" />;
      case 'stat-users': return <StatCard title="Active Users" value="2,345" trend="+15%" trendUp={true} icon={Users} variant="blue" />;
      case 'stat-sales': return <StatCard title="New Sales" value="+574" trend="+5%" trendUp={true} icon={ShoppingBag} variant="purple" />;
      case 'stat-bounce': return <StatCard title="Bounce Rate" value="42.3%" trend="-4%" trendUp={true} icon={Activity} variant="orange" />;
      case 'graph-revenue': return <RevenueChart />;
      case 'graph-traffic': return <TrafficSourceChart />;
      case 'table-orders': return <RecentOrdersTable />;
      case 'list-activity': return <ActivityFeed />;
      case 'stat-server': return <ServerStatus />;
      case 'action-bar': return <QuickActions />;
      default: return <div>Unknown Widget</div>;
    }
  };

  const getWidgetTitle = (type: WidgetType) => {
     if (type.includes('stat') && !type.includes('server')) return 'Statistic';
     if (type === 'graph-revenue') return 'Revenue Analytics';
     if (type === 'graph-traffic') return 'Traffic Sources';
     if (type === 'table-orders') return 'Recent Orders';
     if (type === 'stat-server') return 'System Health';
     if (type === 'action-bar') return 'Quick Actions';
     return 'Widget';
  };

  return (
    <div className="relative min-h-screen p-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Control Center</h1>
          <p className="text-slate-400">Design your perfect workflow.</p>
        </div>
        
        <div className="flex gap-4 relative" ref={menuRef}>
           <div className="relative">
             <button 
               onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all font-semibold text-sm flex items-center gap-2"
             >
               <Plus size={18} />
               Add Widget
               <ChevronDown size={14} className={`transition-transform duration-200 ${isAddMenuOpen ? 'rotate-180' : ''}`} />
             </button>
             
             {isAddMenuOpen && (
               <div className="absolute right-0 top-full mt-3 w-56 bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden py-2">
                 {[
                   { id: 'stat-revenue', label: 'Stat: Revenue' },
                   { id: 'graph-revenue', label: 'Chart: Revenue' },
                   { id: 'graph-traffic', label: 'Chart: Traffic' },
                   { id: 'table-orders', label: 'Table: Orders' },
                   { id: 'list-activity', label: 'List: Activity' },
                 ].map((opt) => (
                    <button 
                        key={opt.id}
                        onClick={() => onAddItem(opt.id as WidgetType)} 
                        className="block w-full text-left px-5 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {opt.label}
                    </button>
                 ))}
               </div>
             )}
           </div>

           <button 
             onClick={onResetLayout}
             className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/5 transition-all font-medium text-sm backdrop-blur-md"
           >
             Reset Layout
           </button>
        </div>
      </div>

      {/* Grid */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={ROW_HEIGHT}
        margin={MARGIN}
        containerPadding={CONTAINER_PADDING}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
      >
        {items.map(item => (
            <div key={item.id}>
                <Widget
                    title={getWidgetTitle(item.type)}
                    className={item.type.includes('stat') && !item.type.includes('server') ? 'stat-widget' : ''}
                    onRemove={() => onRemoveItem(item.id)}
                >
                    {renderWidgetContent(item.type)}
                </Widget>
            </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
