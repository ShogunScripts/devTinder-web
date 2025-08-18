import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthRedirect({ children }) {
  const userData = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      navigate('/feed', { replace: true });
    }
  }, [userData, navigate]);

  return children;
}