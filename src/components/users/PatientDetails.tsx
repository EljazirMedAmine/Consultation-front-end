// src/components/users/PatientDetails.tsx
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Mail, Phone, UserCircle, Calendar, BadgeCheck, AlertCircle, Clock,
  MapPin, Droplet, FileText, Shield, User, Ruler, Weight, Heart,
  Pill, FileWarning, ChevronRight, XCircle
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserRole {
  id: number;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Patient {
  id: number;
  user_id: number;
  birth_day: string | null;
  gender: string;
  blood_group: string | null;
  allergies: string | null;
  chronic_diseases: string | null;
  current_medications: string | null;
  weight: number | null;
  height: number | null;
  insurance_number: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  role_id: number;
  full_name: string;
  telephone: string | null;
  email: string;
  status: 'new' | 'validated' | 'to_validate' | 'rejected' | 'blocked';
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: UserRole;
  patient: Patient;
}

interface PatientDetailsProps {
  user: User;
}

export const PatientDetails = ({ user }: PatientDetailsProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (e) {
      return 'Date invalide';
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validated':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">
            <BadgeCheck className="w-3.5 h-3.5 mr-1" />
            Validé
          </Badge>
        );
      case 'to_validate':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200">
            <Clock className="w-3.5 h-3.5 mr-1" />
            À valider
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5 mr-1" />
            Bloqué
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200">
            <XCircle className="w-3.5 h-3.5 mr-1" />
            Rejeté
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
            Nouveau
          </Badge>
        );
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'Homme';
      case 'female':
        return 'Femme';
      default:
        return gender;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec avatar et informations essentielles */}
      <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src="" alt={user.full_name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-xl">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold">{user.full_name}</h2>
              {getStatusBadge(user.status)}
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
                {user.role.name}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.telephone && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{user.telephone}</span>
                </div>
              )}
              {user.patient?.birth_day && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Né(e) le {formatDate(user.patient.birth_day)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informations personnelles */}
        <Card className="md:col-span-2 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 pb-3 pt-4">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-medium">Informations personnelles</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium">{user.full_name}</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {user.email}
                </p>
              </div>

              {user.patient && (
                <>
                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">Genre</p>
                    <p className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {getGenderLabel(user.patient.gender)}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">Date de naissance</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(user.patient.birth_day)}
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {user.telephone || 'Non renseigné'}
                </p>
              </div>

              {user.patient?.insurance_number && (
                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground">Numéro d'assurance</p>
                  <p className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {user.patient.insurance_number}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statut et compte */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 pb-3 pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-medium">Compte</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Rôle</p>
                <p className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {user.role.name}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Statut</p>
                <div className="mt-1">{getStatusBadge(user.status)}</div>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Date d'inscription</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(user.created_at)}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(user.updated_at)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations médicales */}
        {user.patient && (
          <Card className="md:col-span-3 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 pb-3 pt-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg font-medium">Informations médicales</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user.patient.blood_group && (
                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">Groupe sanguin</p>
                    <div className="bg-red-50 text-red-700 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium">
                      <Droplet className="h-4 w-4" />
                      {user.patient.blood_group}
                    </div>
                  </div>
                )}

                {user.patient.height && (
                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">Taille</p>
                    <p className="font-medium flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      {user.patient.height} cm
                    </p>
                  </div>
                )}

                {user.patient.weight && (
                  <div className="space-y-1.5">
                    <p className="text-sm text-muted-foreground">Poids</p>
                    <p className="font-medium flex items-center gap-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      {user.patient.weight} kg
                    </p>
                  </div>
                )}

                {user.patient.allergies && (
                  <div className="md:col-span-3 space-y-1.5">
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                      <p className="font-medium">{user.patient.allergies}</p>
                    </div>
                  </div>
                )}

                {user.patient.chronic_diseases && (
                  <div className="md:col-span-3 space-y-1.5">
                    <p className="text-sm text-muted-foreground">Maladies chroniques</p>
                    <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                      <p className="font-medium">{user.patient.chronic_diseases}</p>
                    </div>
                  </div>
                )}

                {user.patient.current_medications && (
                  <div className="md:col-span-3 space-y-1.5">
                    <p className="text-sm text-muted-foreground">Médicaments actuels</p>
                    <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
                      <p className="font-medium">{user.patient.current_medications}</p>
                    </div>
                  </div>
                )}

                {!user.patient.allergies && !user.patient.chronic_diseases && !user.patient.current_medications && (
                  <div className="md:col-span-3 p-6 border border-dashed rounded-md flex flex-col items-center justify-center text-center">
                    <FileWarning className="h-10 w-10 text-muted-foreground mb-2 opacity-40" />
                    <h3 className="text-muted-foreground font-medium">Aucune information médicale spécifique</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Le patient n'a pas encore renseigné ses informations médicales complètes.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};