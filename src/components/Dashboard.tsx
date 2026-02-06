import { useState, useEffect } from 'react';
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout/legacy';
import _ from 'lodash';
import { Users, DollarSign, Activity, ShoppingBag } from 'lucide-react';
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

interface DashboardItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: 'stat-revenue' | 'stat-users' | 'stat-bounce' | 'stat-sales' |
    'graph-revenue' | 'graph-traffic' |
    'list-activity' | 'table-orders' |
    'stat-server' | 'action-bar';
}

const initialLayouts: { lg: DashboardItem[] } = {
    lg: [
        // Top row stats
        { i: 'stat1', x: 0, y: 0, w: 3, h: 4, type: 'stat-revenue' },
        { i: 'stat2', x: 3, y: 0, w: 3, h: 4, type: 'stat-users' },
        { i: 'stat3', x: 6, y: 0, w: 3, h: 4, type: 'stat-sales' },
        { i: 'stat4', x: 9, y: 0, w: 3, h: 4, type: 'stat-bounce' },
        // Middle row (Charts)
        { i: 'chart1', x: 0, y: 4, w: 8, h: 10, type: 'graph-revenue' },
        { i: 'chart2', x: 8, y: 4, w: 4, h: 10, type: 'graph-traffic' },
        // Bottom row (Table & Activity)
        { i: 'table1', x: 0, y: 14, w: 8, h: 9, type: 'table-orders' },
        { i: 'feed1', x: 8, y: 14, w: 4, h: 14, type: 'list-activity' }, // Taller feed
        // Bottom small widgets
        { i: 'server1', x: 0, y: 23, w: 4, h: 5, type: 'stat-server' },
        { i: 'actions1', x: 4, y: 23, w: 4, h: 5, type: 'action-bar' },
    ],
};

const Dashboard = () => {
    const [items, setItems] = useState<DashboardItem[]>(initialLayouts.lg);
    const [layouts, setLayouts] = useState<{ [key: string]: Layout }>(initialLayouts);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLayout = localStorage.getItem('dashboard-layout-v3');
        if (savedLayout) {
            try {
                const parsed = JSON.parse(savedLayout);
                if (parsed.items) setItems(parsed.items);
                if (parsed.layouts) setLayouts(parsed.layouts);
            } catch (e) {
                console.error("Failed to load layout", e);
            }
        }
    }, []);

    const onLayoutChange = (currentLayout: Layout, allLayouts: { [key: string]: Layout | undefined }) => {
        if (!mounted) return;
        setLayouts(allLayouts as any);

        // Defer saving to avoid potential loop or excessive writes
        setTimeout(() => {
            const newItems = items.map(item => {
                // Layout item from react-grid-layout might not align perfectly with custom props
                const layoutItem = currentLayout.find((l: any) => l.i === item.i);
                if (layoutItem) {
                    return { ...item, ...layoutItem, type: item.type };
                }
                return item;
            });
            localStorage.setItem('dashboard-layout-v3', JSON.stringify({ items: newItems, layouts: allLayouts }));
        }, 100);
    };

    const onResetLayout = () => {
        setItems(initialLayouts.lg);
        setLayouts(initialLayouts);
        localStorage.removeItem('dashboard-layout-v3');
    };

    const renderContent = (item: DashboardItem) => {
        switch (item.type) {
            case 'stat-revenue':
                return <StatCard title="Total Revenue" value="$45,231" trend="+20.1%" trendUp={true} icon={DollarSign} color="bg-emerald-500" />;
            case 'stat-users':
                return <StatCard title="Active Users" value="2,345" trend="+15%" trendUp={true} icon={Users} color="bg-blue-500" />;
            case 'stat-sales':
                return <StatCard title="New Sales" value="+574" trend="+5%" trendUp={true} icon={ShoppingBag} color="bg-purple-500" />;
            case 'stat-bounce':
                return <StatCard title="Bounce Rate" value="42.3%" trend="-4%" trendUp={true} icon={Activity} color="bg-orange-500" />;
            case 'graph-revenue':
                return <RevenueChart />;
            case 'graph-traffic':
                return <TrafficSourceChart />;
            case 'table-orders':
                return <RecentOrdersTable />;
            case 'list-activity':
                return <ActivityFeed />;
            case 'stat-server':
                return <ServerStatus />;
            case 'action-bar':
                return <QuickActions />;
            default:
                return <div>Unknown Widget</div>;
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, here is what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onResetLayout}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-all shadow-sm font-medium text-sm"
                    >
                        Reset Layout
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-sm">
                        Download Report
                    </button>
                </div>
            </div>

            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                onLayoutChange={onLayoutChange}
                draggableHandle=".drag-handle"
                margin={[16, 16]}
            >
                {items.map(item => (
                    <div key={item.i} data-grid={item}>
                        <Widget
                            title={
                                item.type.includes('stat') ? 'Statistic' :
                                    item.type === 'graph-revenue' ? 'Revenue Analytics' :
                                        item.type === 'graph-traffic' ? 'Traffic Sources' :
                                            item.type === 'table-orders' ? 'Recent Orders' :
                                                item.type === 'stat-server' ? 'System Health' :
                                                    item.type === 'action-bar' ? 'Quick Actions' :
                                                        'Recent Activity'
                            }
                            className={item.type.includes('stat') && !item.type.includes('server') ? 'stat-widget' : ''}
                            onRemove={() => { }}
                        >
                            {renderContent(item)}
                        </Widget>
                    </div>
                ))}
            </ResponsiveGridLayout>

            <style>{`
        .stat-widget .drag-handle {
           display: none; 
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
