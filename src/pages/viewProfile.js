import { useHistory } from 'react-router-dom';
import React from 'react';
import {
  Button,
  Layout,
  Descriptions,
  Tag,
  Typography
} from 'antd';
import Header from '../components/layout/header';

const ViewProfile = (props) => {
  const history = useHistory();
  const { Content } = Layout;  
  const { Text, Link } = Typography
  const email = props?.location?.state?.email
  const profileData = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
  const user = profileData.find((obj) => obj.email === email);
  if (!user) {
    history.push('/')
  }

  return (
    <>
      <Header />
      <Content style={{ padding: '10px 50px' }}>
        <Button type='danger' key="back" onClick={() => history.push('/')} style={{ marginTop: "10px", marginBottom: "10px" }}>
          Back
        </Button>
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label="First Name">{user?.firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{user?.lastName}</Descriptions.Item>
          <br></br>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Tagline">{user?.tagline}</Descriptions.Item>
          <br></br>
          <Descriptions.Item label="Skills">
            {(user?.skills) && (user?.skills).map((obj, index)=>{
              return <Tag key={index} color="magenta">{obj}</Tag>
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Experience">
            {(user?.experience) && (user?.experience).map((obj, index)=>{
              return  <div>
                <Text type="success">Company: </Text>
                <span>{obj.company}</span> <br/>
                <Text type="success">Role: </Text>
                <span>{obj.role}</span> <br/>
                <Text type="success">Date: </Text>
                <span>{obj.start_date} - {obj.current_job ? 'Present':obj.end_date }</span> <br/>
                <Text type="success">Description: </Text>
                <span>{obj.description}</span>
                <hr />
              </div>
            })}
          </Descriptions.Item>
        </Descriptions>
      </Content>
    </>
  )
}

export default ViewProfile;