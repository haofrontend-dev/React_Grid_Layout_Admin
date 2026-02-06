import { BadgeCheck, Clock, XCircle } from 'lucide-react';

const orders = [
    { id: '#ORD-7235', customer: 'Alex Thompson', product: 'Premium Plan', amount: '$49.00', status: 'Paid', date: '2 min ago' },
    { id: '#ORD-7234', customer: 'Sarah Miller', product: 'Basic Plan', amount: '$19.00', status: 'Pending', date: '15 min ago' },
    { id: '#ORD-7233', customer: 'Michael Chen', product: 'Pro Plan', amount: '$99.00', status: 'Paid', date: '1 hour ago' },
    { id: '#ORD-7232', customer: 'Emma Wilson', product: 'Basic Plan', amount: '$19.00', status: 'Failed', date: '3 hours ago' },
    { id: '#ORD-7231', customer: 'James Taylor', product: 'Premium Plan', amount: '$49.00', status: 'Paid', date: '5 hours ago' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        Failed: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800',
    }[status] || 'bg-slate-100 text-slate-700';

    const Icon = {
        Paid: BadgeCheck,
        Pending: Clock,
        Failed: XCircle,
    }[status] || Clock;

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles}`}>
            <Icon size={12} />
            {status}
        </span>
    );
};

const RecentOrdersTable = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                            <th className="py-3 px-4 font-medium">Order ID</th>
                            <th className="py-3 px-4 font-medium">Customer</th>
                            <th className="py-3 px-4 font-medium">Product</th>
                            <th className="py-3 px-4 font-medium text-right">Amount</th>
                            <th className="py-3 px-4 font-medium text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="text-sm border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-200">{order.id}</td>
                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{order.customer}</td>
                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{order.product}</td>
                                <td className="py-3 px-4 text-right font-medium text-slate-900 dark:text-slate-200">{order.amount}</td>
                                <td className="py-3 px-4 flex justify-center">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
