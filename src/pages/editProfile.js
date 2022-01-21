import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/layout/header';
import ProfileForm from '../components/user/profileForm';
import {
  Button,
  Layout
} from 'antd';

const EditProfile = (props) => {
  const history = useHistory();
  const { Content } = Layout;
  const email = props?.location?.state?.email
  const profileData = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
  const user = profileData.find((obj) => obj.email === email);
  if(!user){
    history.push('/')
  }
  
  return (
    <>
      <Header />
      <Content style={{ padding: '10px 50px' }}>
        <Button type='danger' key="back" onClick={()=>history.push('/')}>
          Back
        </Button>
        <ProfileForm updateProfile={user}/>
      </Content>
    </>
  )
}

export default EditProfile;