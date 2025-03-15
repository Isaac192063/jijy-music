import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  User,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit,
  Save,
} from 'lucide-react';

// Definición de interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  phone: string;
  website: string;
  createdAt: string;
}

interface BillingInfo {
  plan: string;
  status: string;
  amount: number;
  nextBillingDate: string;
  paymentMethod: string;
  lastFour: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

export const Account: React.FC = () => {
  // Estado del perfil
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user-123',
    name: 'Carlos Martínez',
    email: 'carlos.martinez@ejemplo.com',
    username: 'carlosm',
    avatar: '',
    bio: 'Desarrollador web y entusiasta de la música',
    location: 'Madrid, España',
    phone: '+34 612 345 678',
    website: 'carlosmartinez.dev',
    createdAt: '12 de Marzo, 2023',
  });

  const [billing] = useState<BillingInfo>({
    plan: 'Pro',
    status: 'Activo',
    amount: 9.99,
    nextBillingDate: '15 de Abril, 2025',
    paymentMethod: 'Visa',
    lastFour: '4242',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    lastPasswordChange: '28 de Febrero, 2025',
  });

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    ...profile,
  });

  const handleProfileUpdate = () => {
    setProfile(editedProfile);
    setEditMode(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-xl">
                    {profile.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-gray-500">@{profile.username}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="mr-2 h-4 w-4" />
                Facturación
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Seguridad
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Perfil</CardTitle>
                  <CardDescription>Gestiona tu información personal</CardDescription>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <>
                      <Label>Nombre</Label>
                      <Input
                        name="name"
                        value={editedProfile.name}
                        onChange={handleProfileChange}
                      />
                      <Button onClick={handleProfileUpdate}>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-lg">{profile.name}</p>
                      <Button onClick={() => setEditMode(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                  <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Último cambio de contraseña: {security.lastPasswordChange}</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSecurity((prev) => ({
                        ...prev,
                        twoFactorEnabled: !prev.twoFactorEnabled,
                      }))
                    }
                  >
                    {security.twoFactorEnabled ? 'Desactivar 2FA' : 'Activar 2FA'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
