import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CardFooter,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
  User,
  CreditCard,
  Shield,
  Edit,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react';
import { useUserStorage } from '@/store/perfilStore';
import { AvatarPerfilAccount } from '../components/avatarPerfilAcount';
import { UserService } from '@/shared/services/UserService';
import { User as UserType } from '@/shared/types/User';

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
  const navigate = useNavigate();
  // Estado del perfil
  const { deleteUser,  fetchUser, logout, user, updateUser } = useUserStorage();

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
  const [editedProfile, setEditedProfile] = useState<UserType | null>(user);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleProfileUpdate = async () => {
    if (!editedProfile || !user?.id) return;
    
    try {
      await updateUser(user.id, editedProfile);
      console.log("object");
      setEditMode(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setUpdateError("Error al actualizar el perfil. Inténtalo de nuevo.");
      setTimeout(() => setUpdateError(null), 3000);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      });
    }
  };



  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      setUpdateError("Error al eliminar la cuenta. Inténtalo de nuevo.");
      setTimeout(() => setUpdateError(null), 3000);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchUserEffect = async () => {
      const token = localStorage.getItem('token') || '';
      
      try {
        const id = atob(token.split('.')[1]);
        const id1 = JSON.parse(id);
        const userData = await UserService.getByEmail(id1.sub);
        if (userData && userData.id) {
          fetchUser(userData.id);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        navigate('/login');
      }
    };
    
    fetchUserEffect();
  }, [fetchUser, navigate]);

  useEffect(() => {
    if (user) {
      setEditedProfile(user);
    }
  }, [user]);

  
  if (!user) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>

      {updateSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-300">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>¡Éxito!</AlertTitle>
          <AlertDescription>Tu perfil ha sido actualizado correctamente.</AlertDescription>
        </Alert>
      )}

      {updateError && (
        <Alert className="mb-4 bg-red-50 border-red-300">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <AvatarPerfilAccount user={user} />

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
                <CardContent className="space-y-4">
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editedProfile?.name || ''}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editedProfile?.email || ''}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={editedProfile?.phone || ''}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Usuario</Label>
                          <Input
                            id="username"
                            name="username"
                            value={editedProfile?.username || ''}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                          <p className="text-lg">{user.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="text-lg">{user.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                          <p className="text-lg">{user.phone || 'No especificado'}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Usuario</h3>
                          <p className="text-lg">{user.username || 'No especificado'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editMode ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => {
                        setEditedProfile(user);
                        setEditMode(false);
                      }}>
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button onClick={handleProfileUpdate}>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setEditMode(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar cuenta
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>¿Estás seguro?</DialogTitle>
                            <DialogDescription>
                              Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button 
                              variant="destructive" 
                              onClick={handleDeleteAccount}
                              disabled={isDeleting}
                            >
                              {isDeleting ? 'Eliminando...' : 'Sí, eliminar mi cuenta'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Facturación</CardTitle>
                  <CardDescription>Administra tu suscripción y métodos de pago</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Plan actual</h3>
                      <p className="text-lg">{billing.plan}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                      <p className="text-lg">{billing.status}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Método de pago</h3>
                      <p className="text-lg">{billing.paymentMethod} **** {billing.lastFour}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Próximo cobro</h3>
                      <p className="text-lg">${billing.amount}/mes el {billing.nextBillingDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    Cambiar plan
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                  <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Último cambio de contraseña</h3>
                      <p className="text-lg">{security.lastPasswordChange}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Autenticación de dos factores</h3>
                      <p className="text-lg">{security.twoFactorEnabled ? 'Activada' : 'Desactivada'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant={security.twoFactorEnabled ? "outline" : "default"}
                    onClick={() =>
                      setSecurity((prev) => ({
                        ...prev,
                        twoFactorEnabled: !prev.twoFactorEnabled,
                      }))
                    }
                  >
                    {security.twoFactorEnabled ? 'Desactivar 2FA' : 'Activar 2FA'}
                  </Button>
                  <Button variant="outline">
                    Cambiar contraseña
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;