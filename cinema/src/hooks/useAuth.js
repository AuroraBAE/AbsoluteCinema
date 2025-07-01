import { useState, useEffect } from 'react';
import useUserStore from '../store/useUserStore';
import { supabase } from '../libs/supabase';
import Swal from 'sweetalert2';

export default function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUserStore();

  const BASE_URL = "/";

  

  useEffect(() => {
    // Ambil sesi saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || null);
      setLoading(false);
    });

    // Dengarkan perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cek status auth pertama kali
    checkAuth();

    // Bersihkan listener saat komponen unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleLoginWithGoogle = async () => {
    const { data: _user, error: _errorLogin } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${BASE_URL}`,
      },
    });
  };

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setUser(null);
    } else {
      setUser(user);
    }
  };

  return { session, loading, logout, handleLoginWithGoogle, checkAuth };
}