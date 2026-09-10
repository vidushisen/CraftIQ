import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, ArtisanProfile } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeArtisan: ArtisanProfile;
  setActiveArtisanId: (id: string) => void;
  allArtisans: ArtisanProfile[];
  isSimpleMode: boolean;
  setIsSimpleMode: (simple: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('craftiq_user_role') as UserRole;
    return saved === 'artisan' || saved === 'buyer' || saved === 'admin' ? saved : 'artisan';
  });

  const [isSimpleMode, setIsSimpleModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('craftiq_simple_mode');
    return saved !== null ? saved === 'true' : true; // Default simple mode for artisans!
  });

  const [activeArtisan, setActiveArtisan] = useState<ArtisanProfile>(() => storageService.getActiveArtisan());
  const [allArtisans, setAllArtisans] = useState<ArtisanProfile[]>(() => storageService.getArtisans());

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('craftiq_user_role', newRole);
  };

  const setIsSimpleMode = (simple: boolean) => {
    setIsSimpleModeState(simple);
    localStorage.setItem('craftiq_simple_mode', String(simple));
  };

  const setActiveArtisanId = (id: string) => {
    storageService.setActiveArtisan(id);
    setActiveArtisan(storageService.getActiveArtisan());
  };

  useEffect(() => {
    const handleArtisanChange = () => {
      setActiveArtisan(storageService.getActiveArtisan());
      setAllArtisans(storageService.getArtisans());
    };
    window.addEventListener('craftiq_artisan_changed', handleArtisanChange);
    return () => window.removeEventListener('craftiq_artisan_changed', handleArtisanChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        activeArtisan,
        setActiveArtisanId,
        allArtisans,
        isSimpleMode,
        setIsSimpleMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
