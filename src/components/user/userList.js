import { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';
import DeleteUser from './deleteUser';
import AddUser from './addUser';

const UserList = () => {
  const history = useHistory();
  const [allProfiles, setAllProfiles] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState("");
  
  const showModal = () => {
    setAddModal(true);
  };

  useEffect(() => {
    getProfileList();
  }, [])

  const getProfileList = () => {
    const profiles = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
    setAllProfiles(profiles);
    setAddModal(false);
    setDeleteProfile("");
  };

  const columns = [
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tagline',
      dataIndex: 'tagline',
      key: 'tagline',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <EyeFilled className="action-icon" onClick={()=> history.push('/view-profile', {email: record.email})} />
          <EditFilled className="action-icon" onClick={()=> history.push('/edit-profile', {email: record.email})} />
          <DeleteFilled className="action-icon error-message" onClick={()=>setDeleteProfile(record.email)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginTop: "10px", marginBottom: "20px" }}>
        Add Profile
      </Button>
      <Table columns={columns} dataSource={allProfiles} />
      {addModal &&
        <AddUser addModal={addModal} onCancel={() => setAddModal(false)} getProfileList={getProfileList}/>
      }
      {deleteProfile &&
        <DeleteUser email={deleteProfile} onCancel={() => setDeleteProfile("")} getProfileList={getProfileList} />
      }
    </>
  )
}

export default UserList;