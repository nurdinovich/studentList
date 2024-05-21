import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { Button, Table, Modal, Form } from 'react-bootstrap';
import fetchUsers, { addUser, deleteUser } from '../../store/reducers/userCreator';
import classes from './StudentList.module.css';
import back from './img/back.svg';
import Profile from '../Register/Profile';


const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoadingUsers, usersError } = useSelector((state) => state.users);
  const onBackClick = () => navigate(-1)
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    number: '',
    admission: '',
    img: ''
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const onAddStudent = () => {
    dispatch(addUser(newStudent));
    setShowModal(false);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td><img src={user.img} alt="User" /></td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.number}</td>
        <td className={classes.actions}>
          {user.admission}
          <Button variant='outline-warning' className='mx-1'>
            <i className="fa-solid fa-pencil"></i>
          </Button>
          <Button variant='outline-warning' className='mx-1' onClick={() => onDelete(user.id)}>
            <i className='fa-solid fa-trash'></i>
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className={classes.nav}>
        <button onClick={onBackClick}><img src={back} alt="Back" /></button>
        <input type="text" placeholder='Search...' />
      </div>
      <div className={classes.header}>
        <h1>Students List</h1>
        <button onClick={() => setShowModal(true)}>ADD NEW STUDENT</button>
        <Profile/>
      </div>
      <hr />
      <div className={classes.container}>
        <Table className={classes.table}>
          <thead>
            <tr className='th'>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enroll Number</th>
              <th>Date of Admission</th>
            </tr>
          </thead>
          <tbody>{users.map(renderUserItem)}</tbody>
        </Table>
        {isLoadingUsers && 'Loading....'}
        {usersError && usersError}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newStudent.name}
                onChange={onChangeInput}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newStudent.email}
                onChange={onChangeInput}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                name="phone"
                value={newStudent.phone}
                onChange={onChangeInput}
              />
            </Form.Group>
            <Form.Group controlId="formNumber">
              <Form.Label>Enroll Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter enroll number"
                name="number"
                value={newStudent.number}
                onChange={onChangeInput}
              />
            </Form.Group>
            <Form.Group controlId="formAdmission">
              <Form.Label>Date of Admission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter date of admission"
                name="admission"
                value={newStudent.admission}
                onChange={onChangeInput}
              />
            </Form.Group>
            <Form.Group controlId="formImg">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="img"
                value={newStudent.img}
                onChange={onChangeInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={onAddStudent}>Add Student</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default StudentList;
