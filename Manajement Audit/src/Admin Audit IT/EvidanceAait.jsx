import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../Admin/DataUser";
import "../App.css";

Modal.setAppElement("#root");

const EvidanceAait = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    no: "",
    dataAndDocumentNeeded: "",
    phase: "",
    status: "",
    deadline: "",
    remarksByAuditee: "",
    remarksByAuditor: "",
    auditee: "",
    auditor: "",
    statusComplete: "",
    action: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleAddUser = () => {
  //   if (editingUser) {
  //     setOrders((prev) =>
  //       prev.map((order) =>
  //         order.no === editingUser.no ? { ...editingUser, ...newUser } : order
  //       )
  //     );
  //     setEditingUser(null);
  //   } else {
  //     setOrders((prev) => [
  //       ...prev,
  //       { no: prev.length > 0 ? prev[prev.length - 1].no + 1 : 1, ...newUser },
  //     ]);
  //   }
  //   setIsModalOpen(false);
  //   resetNewUser();
  // };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    setOrders((prev) => {
      const updatedOrders = prev.filter(
        (order) => order.no !== userToDelete.no
      );

      return updatedOrders.map((order, index) => ({
        ...order,
        no: index + 1,
      }));
    });

    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const resetNewUser = () => {
    setNewUser({
      no: "",
      dataAndDocumentNeeded: "",
      phase: "",
      status: "",
      deadline: "",
      remarksByAuditee: "",
      remarksByAuditor: "",
      auditee: "",
      auditor: "",
      statusComplete: "",
      action: "",
    });
  };

  return (
    <div className="data-user">
      <h2>Data Evidence</h2>
      {/* <div className="AddUser">
          <button
            className="add-user-button"
            onClick={() => {
              setIsModalOpen(true);
              setNewUser();
              setEditingUser(null);
            }}
          >
            Add User
          </button>
        </div> */}
      <div className="data-user-content">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Data and Document Needed</th>
              <th>Phase</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Remarks by Auditee</th>
              <th>Remarks by Auditor</th>
              <th>Auditee</th>
              <th>Auditor</th>
              <th>Status Complete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.no}>
                <td>{order.no}</td>
                <td>{order.dataAndDocumentNeeded}</td>
                <td>{order.phase}</td>
                <td>{order.status}</td>
                <td>{order.deadline}</td>
                <td>{order.remarksByAuditee}</td>
                <td>{order.remarksByAuditor}</td>
                <td>{order.auditee}</td>
                <td>{order.auditor}</td>
                <td>{order.statusComplete}</td>
                <td>
                  <button onClick={() => handleDeleteUser(order)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditUser(order)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add User Modal"
        className="user-modal"
        overlayClassName="user-modal-overlay"
      >
        <div className="data-user-content">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>NIP</th>
                <th>Name</th>
                <th>Role</th>
                <th>Organization</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.no}>
                  <td>{order.no}</td>
                  <td>{order.NIP}</td>
                  <td>{order.Name}</td>
                  <td>{order.Role}</td>
                  <td>{order.Organization}</td>
                  <td>{order.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete User Modal"
        className="user-modal"
        overlayClassName="user-modal-overlay"
      >
        <h3>Are you sure you want to delete this user?</h3>
        <div className="modal-actions">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="modal-cancel"
          >
            Cancel
          </button>
          <button onClick={confirmDeleteUser} className="modal-delete">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EvidanceAait;
