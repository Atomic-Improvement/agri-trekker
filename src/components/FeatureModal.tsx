
import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileJson, X, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// Function to generate cluster data for visualization
const generateClusterData = (centers, pointsPerCluster = 20, noiseLevel = 0.3) => {
  let data = [];
  centers.forEach((center, clusterIndex) => {
    for (let i = 0; i < pointsPerCluster; i++) {
      // Add random noise to each point around the center
      const noiseX = (Math.random() - 0.5) * noiseLevel;
      const noiseY = (Math.random() - 0.5) * noiseLevel;
      
      // Ensure points stay within the 0-1 range
      const x = Math.max(0, Math.min(1, center.x + noiseX));
      const y = Math.max(0, Math.min(1, center.y + noiseY));
      
      data.push({
        x,
        y,
        z: 1, // Used for ZAxis scaling in ScatterChart
        cluster: `Cluster ${clusterIndex + 1}`
      });
    }
  });
  return data;
};

const farmerData = [
  { month: 'Jan', registrations: 65, approvals: 53 },
  { month: 'Feb', registrations: 78, approvals: 70 },
  { month: 'Mar', registrations: 92, approvals: 85 },
  { month: 'Apr', registrations: 105, approvals: 90 },
  { month: 'May', registrations: 120, approvals: 110 },
  { month: 'Jun', registrations: 135, approvals: 125 },
];

const landData = [
  { region: 'Karnataka', area: 1200, parcels: 220 },
  { region: 'Maharashtra', area: 1800, parcels: 350 },
  { region: 'Tamil Nadu', area: 1450, parcels: 280 },
  { region: 'Punjab', area: 1650, parcels: 320 },
  { region: 'Uttar Pradesh', area: 2100, parcels: 420 },
];

const schemeData = [
  { scheme: 'PM Fasal Bima Yojana', applications: 320, approvals: 280, rejections: 40 },
  { scheme: 'PM Kisan Samman Nidhi', applications: 450, approvals: 390, rejections: 60 },
  { scheme: 'Krishi Sinchayee Yojana', applications: 280, approvals: 230, rejections: 50 },
  { scheme: 'Rashtriya Krishi Vikas Yojana', applications: 190, approvals: 150, rejections: 40 },
  { scheme: 'Kisan Credit Card', applications: 210, approvals: 180, rejections: 30 },
];

const testDatasets = {
  dataset1: {
    name: "Rice Paddy Classification",
    description: "Classification of rice paddy fields in Karnataka region based on moisture content and vegetation health",
    explanation: "This dataset represents aerial imagery analysis of rice paddy fields in Karnataka. The clusters identify different zones based on water saturation and plant health indicators. Cluster 1 (red) shows areas with high moisture content, Cluster 2 (green) indicates healthy vegetation, and Cluster 3 (blue) represents drier areas that may need irrigation.",
    clusterColors: ['#ff5252', '#4caf50', '#2196f3'],
    data: [
      { x: 0.2, y: 0.3, z: 1, cluster: "Cluster 1" },
      { x: 0.3, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.25, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.35, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.3, y: 0.4, z: 1, cluster: "Cluster 1" },
      { x: 0.7, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.8, y: 0.1, z: 1, cluster: "Cluster 2" },
      { x: 0.75, y: 0.15, z: 1, cluster: "Cluster 2" },
      { x: 0.9, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.8, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.25, z: 1, cluster: "Cluster 2" },
      { x: 0.9, y: 0.1, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.6, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.4, y: 0.9, z: 1, cluster: "Cluster 3" },
      { x: 0.5, y: 0.9, z: 1, cluster: "Cluster 3" },
      { x: 0.6, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.4, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.5, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" }
    ]
  },
  dataset2: {
    name: "Crop Health Analysis",
    description: "Multi-spectral analysis of crop health in Maharashtra farming regions",
    explanation: "This visualization shows the results of multi-spectral imaging analysis of croplands in Maharashtra. The clusters identify different crop health conditions. Cluster 1 (purple) represents areas with potential pest infestation, Cluster 2 (orange) shows optimally growing crops, Cluster 3 (teal) indicates areas with nutrient deficiencies, and Cluster 4 (yellow) shows water-stressed regions. Farmers can use this data to target specific interventions in each zone.",
    clusterColors: ['#9c27b0', '#ff9800', '#009688', '#ffd600'],
    data: [
      { x: 0.1, y: 0.8, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.7, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.75, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.85, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.9, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.8, z: 1, cluster: "Cluster 1" },
      { x: 0.5, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.45, y: 0.25, z: 1, cluster: "Cluster 2" },
      { x: 0.55, y: 0.15, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.75, y: 0.75, z: 1, cluster: "Cluster 3" },
      { x: 0.85, y: 0.85, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.3, y: 0.4, z: 1, cluster: "Cluster 4" },
      { x: 0.2, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.25, y: 0.35, z: 1, cluster: "Cluster 4" },
      { x: 0.35, y: 0.45, z: 1, cluster: "Cluster 4" },
      { x: 0.3, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.2, y: 0.4, z: 1, cluster: "Cluster 4" }
    ]
  },
  dataset3: {
    name: "Soil Moisture Distribution",
    description: "Analysis of soil moisture levels across Tamil Nadu farmlands",
    explanation: "This clustering analysis visualizes soil moisture patterns across Tamil Nadu agricultural regions based on thermal and radar satellite imagery. Cluster 1 (red) shows severely dry areas requiring immediate irrigation, Cluster 2 (orange) indicates moderately dry soil, Cluster 3 (light blue) represents optimal moisture levels, and Cluster 4 (dark blue) shows areas with potential waterlogging issues. This information helps farmers implement precision irrigation strategies and prevent crop loss from drought or excess water.",
    clusterColors: ['#d32f2f', '#ff9800', '#29b6f6', '#0d47a1'],
    data: [
      { x: 0.1, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.15, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.25, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.4, y: 0.4, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.5, z: 1, cluster: "Cluster 2" },
      { x: 0.45, y: 0.45, z: 1, cluster: "Cluster 2" },
      { x: 0.55, y: 0.55, z: 1, cluster: "Cluster 2" },
      { x: 0.4, y: 0.5, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.4, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.75, y: 0.75, z: 1, cluster: "Cluster 3" },
      { x: 0.85, y: 0.85, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.9, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.8, y: 0.2, z: 1, cluster: "Cluster 4" },
      { x: 0.85, y: 0.25, z: 1, cluster: "Cluster 4" },
      { x: 0.95, y: 0.35, z: 1, cluster: "Cluster 4" },
      { x: 0.9, y: 0.2, z: 1, cluster: "Cluster 4" },
      { x: 0.8, y: 0.3, z: 1, cluster: "Cluster 4" }
    ]
  }
};

const initialClusterCenters = [
  { x: 0.2, y: 0.2 },
  { x: 0.8, y: 0.2 },
  { x: 0.5, y: 0.8 }
];

const dashboardData = {
  farmers: 3240,
  lands: 12758,
  schemes: 48,
  images: 5429,
  recentApplications: [
    { id: 1, farmer: 'Rajesh Kumar', scheme: 'PM Fasal Bima Yojana', date: '2023-05-10', status: 'Approved' },
    { id: 2, farmer: 'Priya Sharma', scheme: 'PM Kisan Samman Nidhi', date: '2023-05-11', status: 'Pending' },
    { id: 3, farmer: 'Amit Patel', scheme: 'Krishi Sinchayee Yojana', date: '2023-05-12', status: 'Rejected' },
    { id: 4, farmer: 'Sunita Verma', scheme: 'Rashtriya Krishi Vikas Yojana', date: '2023-05-13', status: 'Approved' },
    { id: 5, farmer: 'Vikram Singh', scheme: 'Kisan Credit Card', date: '2023-05-14', status: 'Pending' },
  ]
};

const aerialClusterColors = ['#ff5252', '#4caf50', '#2196f3', '#ff9800', '#9c27b0'];

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
  } | null;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, feature }) => {
  const [clusterData, setClusterData] = useState(() => 
    generateClusterData(initialClusterCenters, 30)
  );
  const [clusterCount, setClusterCount] = useState(3);
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedJson, setSelectedJson] = useState<string | null>(null);
  const [currentDataset, setCurrentDataset] = useState<string | null>(null);
  const [datasetDescription, setDatasetDescription] = useState<string>("");
  const [datasetExplanation, setDatasetExplanation] = useState<string>("");
  const [datasetColors, setDatasetColors] = useState<string[]>(aerialClusterColors);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('aerialImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    
    const savedJson = localStorage.getItem('clusterData');
    if (savedJson) {
      try {
        setSelectedJson(savedJson);
      } catch (error) {
        console.error("Error parsing saved JSON:", error);
      }
    }
  }, []);

  const regenerateClusters = () => {
    const centers = Array.from({ length: clusterCount }, () => ({
      x: Math.random(),
      y: Math.random()
    }));
    
    setClusterData(generateClusterData(centers, 30, noiseLevel / 100));
    toast.success("Clusters regenerated successfully!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        localStorage.setItem('aerialImage', result);
        toast.success(`Image "${file.name}" uploaded and stored locally`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          JSON.parse(result);
          setSelectedJson(result);
          localStorage.setItem('clusterData', result);
          toast.success(`JSON data "${file.name}" uploaded and stored locally`);
        } catch (error) {
          toast.error("Invalid JSON file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const loadTestDataset = (datasetKey: string) => {
    const dataset = testDatasets[datasetKey as keyof typeof testDatasets];
    if (dataset) {
      setCurrentDataset(datasetKey);
      setClusterData(dataset.data);
      setClusterCount(dataset.clusterColors.length);
      setDatasetDescription(dataset.description);
      setDatasetExplanation(dataset.explanation);
      setDatasetColors(dataset.clusterColors);
      toast.success(`Loaded ${dataset.name} dataset`);
    }
  };

  const downloadTestDataset = (datasetKey: string) => {
    const dataset = testDatasets[datasetKey as keyof typeof testDatasets];
    if (dataset) {
      const jsonData = {
        name: dataset.name,
        description: dataset.description,
        explanation: dataset.explanation,
        clusterColors: dataset.clusterColors,
        data: dataset.data
      };
      
      const dataStr = JSON.stringify(jsonData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${datasetKey}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded ${dataset.name} dataset`);
    }
  };

  const renderFeatureContent = () => {
    if (!feature) return null;

    switch (feature.title) {
      case 'Farmer Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="records">Farmer Records</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Farmer Registration Trends</CardTitle>
                    <CardDescription>Monthly farmer registrations and approvals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <LineChart data={farmerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="registrations" stroke="#2563eb" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="approvals" stroke="#10b981" />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="records">
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Farmer Records</CardTitle>
                    <CardDescription>Personal and financial information for registered farmers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-secondary/50">
                          <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Age</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Land (ha)</th>
                            <th className="px-4 py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="px-4 py-2">Rajesh Kumar</td>
                            <td className="px-4 py-2">45</td>
                            <td className="px-4 py-2">Bengaluru, Karnataka</td>
                            <td className="px-4 py-2">5.2</td>
                            <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">Priya Sharma</td>
                            <td className="px-4 py-2">38</td>
                            <td className="px-4 py-2">Mysuru, Karnataka</td>
                            <td className="px-4 py-2">3.8</td>
                            <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">Amit Patel</td>
                            <td className="px-4 py-2">52</td>
                            <td className="px-4 py-2">Mangaluru, Karnataka</td>
                            <td className="px-4 py-2">7.5</td>
                            <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">Sunita Verma</td>
                            <td className="px-4 py-2">41</td>
                            <td className="px-4 py-2">Hubli, Karnataka</td>
                            <td className="px-4 py-2">4.2</td>
                            <td className="px-4 py-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">Vikram Singh</td>
                            <td className="px-4 py-2">49</td>
                            <td className="px-4 py-2">Dharwad, Karnataka</td>
                            <td className="px-4 py-2">6.7</td>
                            <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Land Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Land Statistics</TabsTrigger>
                <TabsTrigger value="map">Land Mapping</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Land Distribution</CardTitle>
                    <CardDescription>Land area and parcel counts by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <BarChart data={landData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="area" name="Area (hectares)" fill="#2563eb" />
                        <Bar yAxisId="right" dataKey="parcels" name="Number of Parcels" fill="#10b981" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle>Land Parcel Mapping</CardTitle>
                    <CardDescription>Interactive map of registered land parcels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100 border">
                      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/topographic-contour-lines-map-seamless-pattern_1284-52862.jpg')] bg-cover opacity-20"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center">
                        <div className="text-center p-6 bg-white/80 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2">Karnataka Region Map</h3>
                          <p className="text-gray-600 mb-4">A full map visualization would be implemented here with markers for each land parcel, allowing users to click for detailed information.</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 p-3 rounded-md">
                              <div className="font-medium text-blue-700">Total Area</div>
                              <div className="text-xl font-bold">8,200 hectares</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-md">
                              <div className="font-medium text-green-700">Total Parcels</div>
                              <div className="text-xl font-bold">1,590 parcels</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Scheme Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Scheme Statistics</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheme Application Status</CardTitle>
                    <CardDescription>Application statistics by scheme type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <BarChart data={schemeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="scheme" type="category" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="approvals" stackId="a" fill="#10b981" name="Approved" />
                        <Bar dataKey="rejections" stackId="a" fill="#ef4444" name="Rejected" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Agricultural Schemes</CardTitle>
                    <CardDescription>Details of current schemes and eligibility criteria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {schemeData.map((scheme, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg">{scheme.scheme}</h3>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Active</span>
                          </div>
                          <p className="text-muted-foreground mt-1 mb-2">
                            {scheme.scheme === 'PM Fasal Bima Yojana' ? 'Crop insurance scheme that provides coverage for farmers against crop loss or damage' : 
                             scheme.scheme === 'PM Kisan Samman Nidhi' ? 'Income support scheme providing farmers with ₹6,000 per year in three equal installments' :
                             scheme.scheme === 'Krishi Sinchayee Yojana' ? 'Irrigation scheme to improve farm productivity through efficient water usage' :
                             scheme.scheme === 'Rashtriya Krishi Vikas Yojana' ? 'Assistance for agricultural development projects to boost production' :
                             'Provides farmers with credit cards for short-term credit for cultivation and other needs'}
                          </p>
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="text-muted-foreground">Applications:</span> {scheme.applications}
                            </div>
                            <div>
                              <span className="text-green-600">Approved:</span> {scheme.approvals}
                            </div>
                            <div>
                              <span className="text-red-600">Rejected:</span> {scheme.rejections}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Aerial Analytics':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aerial Image Clustering Analysis</CardTitle>
                <CardDescription>
                  {currentDataset ? datasetDescription : "Interactive clustering visualization of aerial field patterns"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(testDatasets).map(([key, dataset]) => (
                      <div key={key} className="flex gap-2">
                        <Button 
                          onClick={() => loadTestDataset(key)} 
                          variant={currentDataset === key ? "default" : "outline"}
                          className="flex-1"
                        >
                          {dataset.name}
                        </Button>
                        <Button 
                          onClick={() => downloadTestDataset(key)} 
                          variant="outline" 
                          size="icon"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <ChartContainer config={{}} className="h-[300px]">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="x" name="X" domain={[0, 1]} />
                      <YAxis type="number" dataKey="y" name="Y" domain={[0, 1]} />
                      <ZAxis type="number" dataKey="z" range={[100, 100]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                      <Legend />
                      {Array.from({ length: clusterCount }).map((_, i) => (
                        <Scatter 
                          key={i}
                          name={`Cluster ${i + 1}`} 
                          data={clusterData.filter(d => d.cluster === `Cluster ${i + 1}`)}
                          fill={datasetColors[i % datasetColors.length]} 
                        />
                      ))}
                    </ScatterChart>
                  </ChartContainer>

                  <div className="space-y-4">
                    {!currentDataset && (
                      <>
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Number of Clusters</label>
                            <span className="text-sm">{clusterCount}</span>
                          </div>
                          <Slider 
                            value={[clusterCount]} 
                            min={2} 
                            max={5} 
                            step={1} 
                            onValueChange={(values) => setClusterCount(values[0])}
                            className="cursor-pointer"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Cluster Density (Noise Level)</label>
                            <span className="text-sm">{noiseLevel}%</span>
                          </div>
                          <Slider 
                            value={[noiseLevel]} 
                            min={10} 
                            max={80} 
                            step={5} 
                            onValueChange={(values) => setNoiseLevel(values[0])}
                            className="cursor-pointer"
                          />
                        </div>

                        <Button onClick={regenerateClusters} className="w-full">
                          Regenerate Clusters
                        </Button>
                      </>
                    )}

                    <div className="flex gap-4">
                      <input 
                        type="file" 
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        className="w-1/2"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>

                      <input 
                        type="file" 
                        ref={jsonInputRef}
                        onChange={handleJsonUpload}
                        accept=".json"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        className="w-1/2"
                        onClick={() => jsonInputRef.current?.click()}
                      >
                        <FileJson className="mr-2 h-4 w-4" /> Upload JSON
                      </Button>
                    </div>

                    {selectedImage && (
                      <div className="mt-4 p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Uploaded Image</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedImage(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <img 
                          src={selectedImage} 
                          alt="Uploaded aerial image" 
                          className="max-h-40 mx-auto rounded" 
                        />
                      </div>
                    )}

                    <div className="bg-muted p-4 rounded-md text-sm">
                      <h4 className="font-medium mb-2">Cluster Analysis Explanation</h4>
                      <p className="text-muted-foreground">
                        {currentDataset 
                          ? datasetExplanation 
                          : "This visualization demonstrates K-means clustering applied to aerial farm imagery from Indian agricultural regions. Each point represents a feature detected in the image (such as vegetation health, soil moisture, etc.). Points are grouped into clusters based on similarity. In a real implementation, these clusters would help identify different zones in fields for precision agriculture applications, allowing farmers to optimize resource usage."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'Role-Based Access':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control</CardTitle>
                <CardDescription>Multi-level authentication system with specific permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Admin', 'Officer', 'Farmer'].map((role) => (
                      <div key={role} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            role === 'Admin' ? 'bg-purple-100 text-purple-500' : 
                            role === 'Officer' ? 'bg-blue-100 text-blue-500' : 
                            'bg-green-100 text-green-500'
                          }`}>
                            {role.charAt(0)}
                          </div>
                          <h3 className="font-semibold">{role}</h3>
                        </div>
                        <ul className="text-sm space-y-2">
                          {role === 'Admin' ? (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Full system access</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>User management</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Scheme approval</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Report generation</span>
                              </li>
                            </>
                          ) : role === 'Officer' ? (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Farmer registration</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Land verification</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Application review</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">×</span>
                                <span>System configuration</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Profile management</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Land registration</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Scheme application</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">×</span>
                                <span>Other farmer records</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-medium mb-2">Authentication Flow</h4>
                    <div className="flex justify-between items-center">
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">1</div>
                        <div className="text-sm">Login</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">2</div>
                        <div className="text-sm">Role Check</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">3</div>
                        <div className="text-sm">Permission Assignment</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">4</div>
                        <div className="text-sm">Access Control</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'Dashboards':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Comprehensive system overview for administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-500 text-sm font-medium">Registered Farmers</div>
                    <div className="text-2xl font-bold mt-1">{dashboardData.farmers.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-500 text-sm font-medium">Land Parcels</div>
                    <div className="text-2xl font-bold mt-1">{dashboardData.lands.toLocaleString()}</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-amber-500 text-sm font-medium">Active Schemes</div>
                    <div className="text-2xl font-bold mt-1">{dashboardData.schemes}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-purple-500 text-sm font-medium">Processed Images</div>
                    <div className="text-2xl font-bold mt-1">{dashboardData.images.toLocaleString()}</div>
                  </div>
                </div>

                <h4 className="font-medium mb-3">Recent Scheme Applications</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm">ID</th>
                        <th className="px-4 py-2 text-left text-sm">Farmer</th>
                        <th className="px-4 py-2 text-left text-sm">Scheme</th>
                        <th className="px-4 py-2 text-left text-sm">Date</th>
                        <th className="px-4 py-2 text-left text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentApplications.map((app) => (
                        <tr key={app.id} className="border-t">
                          <td className="px-4 py-2 text-sm">{app.id}</td>
                          <td className="px-4 py-2 text-sm">{app.farmer}</td>
                          <td className="px-4 py-2 text-sm">{app.scheme}</td>
                          <td className="px-4 py-2 text-sm">{app.date}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              app.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-6 text-center text-gray-500">
            No content available for this feature.
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        {feature && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full inline-flex items-center justify-center bg-secondary mb-1">
                  {feature.icon}
                </div>
                <div>
                  <DialogTitle className="text-2xl">{feature.title}</DialogTitle>
                  <DialogDescription className="text-base mt-1">
                    {feature.description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              {renderFeatureContent()}
            </div>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
