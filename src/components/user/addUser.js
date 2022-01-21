import React from 'react';
import {
  Modal,
  Button
} from 'antd'; 
import ProfileForm from './profileForm';

const AddUser = (props) => {
  const { addModal, onOk, onCancel, profileKey, getProfileList } = props;
  return (
    <Modal
      title="Add User"
      visible={addModal}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>
      ]}
    >
      <ProfileForm profileKey={profileKey} getProfileList={getProfileList} />
    </Modal>
  )
}
export default AddUser;