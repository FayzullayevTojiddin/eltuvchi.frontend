
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Car, DollarSign, Calendar, Award } from 'lucide-react'

const TaxiParkAnalyticsPage = () => {
  // Demo ma'lumotlar
  const monthlyData = [
    { month: 'Yanvar', orders: 245, revenue: 36750000 },
    { month: 'Fevral', orders: 289, revenue: 43350000 },
    { month: 'Mart', orders: 312, revenue: 46800000 },
    { month: 'Aprel', orders: 278, revenue: 41700000 },
    { month: 'May', orders: 324, revenue: 48600000 },
    { month: 'Iyun', orders: 298, revenue: 44700000 },
  ]

  const driverStats = [
    { name: 'Faol haydovchilar', value: 45, color: '#22c55e' },
    { name: 'Nofaol haydovchilar', value: 12, color: '#f59e0b' },
    { name: 'Bloklangan', value: 3, color: '#ef4444' },
  ]

  const topDrivers = [
    { name: 'Bobur Umarov', orders: 89, revenue: 13350000, rating: 4.9 },
    { name: 'Aziz Karimov', orders: 76, revenue: 11400000, rating: 4.8 },
    { name: 'Jamshid Rahimov', orders: 68, revenue: 10200000, rating: 4.7 },
    { name: 'Sardor Aliyev', orders: 62, revenue: 9300000, rating: 4.6 },
    { name: 'Farrux Nazarov', orders: 58, revenue: 8700000, rating: 4.5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analitika</h1>
        <p className="text-muted-foreground">Takso parkingiz ishlash ko'rsatkichlari</p>
      </div>

      {/* Asosiy ko'rsatkichlar */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami buyurtmalar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,746</div>
            <p className="text-xs text-muted-foreground">
              +12% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol haydovchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +3 yangi haydovchi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umumiy daromad</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">261.9M</div>
            <p className="text-xs text-muted-foreground">
              +8% o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha reyting</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">
              +0.2 o'tgan oyga nisbatan
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Oylik buyurtmalar grafigi */}
        <Card>
          <CardHeader>
            <CardTitle>Oylik buyurtmalar</CardTitle>
            <CardDescription>So'nggi 6 oylik buyurtmalar statistikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daromad grafigi */}
        <Card>
          <CardHeader>
            <CardTitle>Oylik daromad</CardTitle>
            <CardDescription>So'nggi 6 oylik daromad dinamikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} so'm`, 'Daromad']} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Haydovchilar statistikasi */}
        <Card>
          <CardHeader>
            <CardTitle>Haydovchilar holati</CardTitle>
            <CardDescription>Haydovchilar faollik darajasi</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={driverStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {driverStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top haydovchilar */}
        <Card>
          <CardHeader>
            <CardTitle>Eng yaxshi haydovchilar</CardTitle>
            <CardDescription>Eng ko'p buyurtma bajargan haydovchilar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDrivers.map((driver, index) => (
                <div key={driver.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-muted-foreground">{driver.orders} ta buyurtma</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{driver.revenue.toLocaleString()} so'm</p>
                    <p className="text-sm text-muted-foreground">⭐ {driver.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TaxiParkAnalyticsPage
