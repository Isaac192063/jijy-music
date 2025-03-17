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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  User,
  CreditCard,
  Shield,
  Edit,
  Save,
} from 'lucide-react';
import { IUserProfile, useUserStorage } from '@/store/perfilStore';
import { AvatarPerfilAccount } from '../../components/avatarPerfilAcount';

// Definición de interfaces

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
  const {user, setUser} = useUserStorage();

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
  const [editedProfile, setEditedProfile] = useState<IUserProfile>({
    ...user!,
  });

  const handleProfileUpdate = () => {
    setUser(editedProfile);
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
        <AvatarPerfilAccount  user={user!}/>

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
                      <p className="text-lg">{user?.name}</p>
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
