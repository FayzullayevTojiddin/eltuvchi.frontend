import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Lock, LogIn, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DispatcherLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Demo dispatcher accounts
  const demoDispatchers = [
    {
      email: "dispatcher1@eltuvchi.uz",
      password: "dispatcher123",
      name: "Aziz Karimov",
      region: "Toshkent"
    },
    {
      email: "dispatcher2@eltuvchi.uz", 
      password: "dispatcher456",
      name: "Madina Saidova",
      region: "Samarqand"
    },
    {
      email: "dispatcher3@eltuvchi.uz",
      password: "dispatcher789", 
      name: "Bobur Rashidov",
      region: "Buxoro"
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo authentication
    const dispatcher = demoDispatchers.find(
      d => d.email === email && d.password === password
    );

    setTimeout(() => {
      if (dispatcher) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'dispatcher');
        localStorage.setItem('userName', dispatcher.name);
        localStorage.setItem('userRegion', dispatcher.region);
        
        toast({
          title: "Muvaffaqiyat!",
          description: `Xush kelibsiz, ${dispatcher.name}!`,
        });
        
        navigate('/dispatcher');
      } else {
        toast({
          title: "Xatolik!",
          description: "Email yoki parol noto'g'ri",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (dispatcher: typeof demoDispatchers[0]) => {
    setEmail(dispatcher.email);
    setPassword(dispatcher.password);
    
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'dispatcher');
      localStorage.setItem('userName', dispatcher.name);
      localStorage.setItem('userRegion', dispatcher.region);
      
      toast({
        title: "Demo kirish!",
        description: `${dispatcher.name} sifatida kirildi`,
      });
      
      navigate('/dispatcher');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Dispatcher Panel</h1>
          <p className="text-white/80">Dispetcherlar uchun kirish paneli</p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Tizimga kirish</CardTitle>
            <CardDescription className="text-center">
              Dispatcher hisobingizga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="dispatcher@eltuvchi.uz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Tekshirilmoqda...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Kirish
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="space-y-3">
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  Demo hisoblar
                </Badge>
              </div>
              
              <Alert>
                <AlertDescription className="text-sm">
                  Quyidagi demo hisoblardan birini tanlang:
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                {demoDispatchers.map((dispatcher, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleDemoLogin(dispatcher)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{dispatcher.name}</div>
                      <div className="text-xs text-muted-foreground">{dispatcher.region} - {dispatcher.email}</div>
                    </div>
                    <LogIn className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Main Login */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/login')}
          >
            Boshqa rol sifatida kirish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DispatcherLoginPage;