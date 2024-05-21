import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLogin} from '../../store/reducers/authSlice';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteAccount = () => {
    Modal.confirm({
      title: 'Delete',
      content: 'Это действие нельзя будет отменить.',
      onOk: async () => {
        await dispatch(deleteLogin(user.id));
        navigate('/login');
      },
    });
  };

  return (
    <div>
      <h2><i className="fa-solid fa-user"></i></h2>
      <Button type="primary" danger onClick={onDeleteAccount}>
      <i className="fa-solid fa-trash"></i>
      </Button>
    </div>
  );
};

export default Profile;
