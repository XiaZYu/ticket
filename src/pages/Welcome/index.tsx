import { PageContainer } from '@ant-design/pro-components';
import { useAccess, useModel } from '@umijs/max';
import React from 'react';
import AdminWelcome from './AdminWelcome';
import UserWelcome from './UserWelcome';


const Welcome: React.FC = () => {
  
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const access = useAccess();
  return (
    <PageContainer title={currentUser?.role === "admin" ? undefined : false}>
      {access.canUser && (
        <UserWelcome />
      )}
      {access.canAdmin && (
        <AdminWelcome />
      )}
    </PageContainer>
  );
};

export default Welcome;
