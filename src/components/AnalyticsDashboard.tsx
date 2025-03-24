
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

// Sample data for agricultural statistics
const cropYieldData = [
  { name: 'Wheat', yield: 3.5 },
  { name: 'Rice', yield: 4.2 },
  { name: 'Corn', yield: 5.7 },
  { name: 'Soybeans', yield: 2.8 },
  { name: 'Cotton', yield: 1.9 },
  { name: 'Sugarcane', yield: 6.5 },
];

const landDistributionData = [
  { name: 'Crop Land', value: 58 },
  { name: 'Grazing Land', value: 22 },
  { name: 'Forest Land', value: 12 },
  { name: 'Fallow Land', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsDashboard = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground">
            Agricultural Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Data-Driven Agricultural Management
          </h2>
          <p className="text-muted-foreground text-lg">
            Leveraging real-time data to enhance farming operations and improve decision making across all agricultural processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Annual Crop Yield Analysis</CardTitle>
              <CardDescription>Average yield in tons per hectare for major crops</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  wheat: { color: "#0088FE" },
                  rice: { color: "#00C49F" },
                  corn: { color: "#FFBB28" },
                  soybeans: { color: "#FF8042" },
                  cotton: { color: "#8884d8" },
                  sugarcane: { color: "#82ca9d" },
                }}
                className="h-[300px]"
              >
                <BarChart data={cropYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Yield (tons/hectare)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="yield" fill="#2563eb" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agricultural Land Distribution</CardTitle>
              <CardDescription>Percentage breakdown of land usage types</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  cropland: { color: "#0088FE" },
                  grazingland: { color: "#00C49F" },
                  forestland: { color: "#FFBB28" },
                  fallowland: { color: "#FF8042" },
                }}
                className="h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={landDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {landDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
