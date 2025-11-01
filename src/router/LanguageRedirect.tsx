import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const LanguageRedirect: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/' && !sessionStorage.getItem('visited')) {
      const savedLang = localStorage.getItem('language');
      if (savedLang === 'uk') {
        sessionStorage.setItem('visited', 'true');
        navigate('/ua', { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
};
