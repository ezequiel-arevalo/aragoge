import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/services/userService';
import ConnectionError from '@/components/ui/ConnectionError'
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

  if (error) {
    return (
      <div className='max-w-[500px] mx-auto mt-5'>
        <ConnectionError />
      </div>
    );
  }

  if (!user) return <Loader />;

  const isProfessional = user.professional_id !== null;

  return (
    <>
      <HeaderSection user={user} />
      <div className="container mx-auto px-4 py-8">
        <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} isProfessional={isProfessional} />
        <ContentSection activeTab={activeTab} user={user} isProfessional={isProfessional} />
      </div>
    </>
  );
};