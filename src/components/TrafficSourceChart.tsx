import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
    { name: 'Direct', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Organic', value: 300 },
    { name: 'Referral', value: 200 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

const TrafficSourceChart = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-sm text-slate-600 dark:text-slate-300 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrafficSourceChart;
