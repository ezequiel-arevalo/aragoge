import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/services/userService';

import HeaderSection from './components/HeaderSection';
import TabsSection from './components/TabsSection';
import ContentSection from './components/ContentSection';
import Loader from '@/components/Loader';

export const ProfilePublicPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(id);
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, [id]);

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (!user) return <Loader />;

  const isProfessional = user.professional_id !== null;

  return (
    <div>
      <HeaderSection user={user} />
      <div className="container mx-auto px-4 py-8">
        <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} isProfessional={isProfessional} />
        <ContentSection activeTab={activeTab} user={user} isProfessional={isProfessional} />
      </div>
    </div>
  );
};