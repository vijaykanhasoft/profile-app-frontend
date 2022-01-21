
import React from 'react';
import {
  Modal
} from 'antd';

const DeleteUser = (props) => {
  const { email, getProfileList, onCancel } = props;

  const deleteProfile = () => {
    let profileData = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
    localStorage.setItem("profileData", JSON.stringify(profileData.filter((obj) => obj.email !== email)));
    getProfileList();
  }

  return (
    <Modal
      title="Delete User"
      visible={email?true:false}
      onOk={deleteProfile}
      onCancel={onCancel}
    >
      Are you sure to delete this record?
    </Modal>
  )
}
export default DeleteUser;