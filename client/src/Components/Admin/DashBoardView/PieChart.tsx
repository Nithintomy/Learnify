import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



const COLORS = ['#8A2BE2', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);


    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${value}`}
    </text>
    );
};

function MyPieChart({counts}:any) {
    const data = [
        { name: 'Total Earnings', value: counts.totals },
        { name: 'Total Users', value: counts.totalUsersCount },
        { name: 'Total Tutors', value: counts.totalTutorCount },
        { name: 'Total Orders', value: counts.totalOrderCount },
    ];
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                       {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MyPieChart;
