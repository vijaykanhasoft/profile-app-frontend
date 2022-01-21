import React from 'react';
import {
  Layout,
} from 'antd';
import Header from '../components/layout/header';
import UserList from '../components/user/userList';

const Home = () => {
  const { Content } = Layout;

  return (
    <>
      <Header />
      <Content style={{ padding: '10px 50px' }}>
        <UserList />
      </Content>
    </>
  )
}

export default Home;