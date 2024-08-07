import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";

Modal.setAppElement("#root");

const DataUser = () => {
  // Menyimpan data di local Orders
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    NIP: "",
    Name: "",
    Role: "",
    Organization: "",
    Email: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  // end menyimpan data

  // star input data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (editingUser !== null) {
      setOrders((prev) =>
        prev.map((order) =>
          order.no === editingUser.no ? { ...order, ...newUser } : order
        )
      );
      setEditingUser(null);
    } else {
      setOrders((prev) => [
        ...prev,
        {
          no: prev.length + 1,
          ...newUser,
        },
      ]);
    }
    setIsModalOpen(false);
    setNewUser({ NIP: "", Name: "", Role: "", Organization: "", Email: "" });
  };
  // end input

  //Start Fungsi Edit
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      NIP: user.NIP,
      Name: user.Name,
      Role: user.Role,
      Organization: user.Organization,
      Email: user.Email,
    });
    setIsModalOpen(true);
  };
  // End Fungsi Edit

  // Start Delete
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    setOrders((prev) => prev.filter((order) => order.no !== userToDelete.no));
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };
  // End Delete

  return (
    <div className="data-user">
      <h2>Data User</h2>
      <div className="AddUser">
        <button
          className="add-user-button"
          onClick={() => {
            setIsModalOpen(true);
            setNewUser({
              NIP: "",
              Name: "",
              Role: "",
              Organization: "",
              Email: "",
            });
            setEditingUser(null);
          }}
        >
          Add User
        </button>
      </div>
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
        <h3>{editingUser ? "Edit Data User" : "Add Data User"}</h3>
        <div className="modal-content">
          <label>NIP</label>
          <input
            type="text"
            name="NIP"
            value={newUser.NIP}
            onChange={handleInputChange}
            className="modal-input"
          />
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={newUser.Name}
            onChange={handleInputChange}
            className="modal-input"
          />
          <label>Role</label>
          <select
            name="Role"
            value={newUser.Role}
            onChange={handleInputChange}
            className="modal-select"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="SPI">SPI</option>
            <option value="AUDITEE">Auditee</option>
            <option value="AUDITOR">Auditor</option>
            <option value="ADMIN_IT">Admin IT</option>
          </select>
          <label>Organization</label>
          <input
            type="text"
            name="Organization"
            value={newUser.Organization}
            onChange={handleInputChange}
            className="modal-input"
          />
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={newUser.Email}
            onChange={handleInputChange}
            className="modal-input"
          />
        </div>
        <div className="modal-actions">
          <button
            onClick={() => setIsModalOpen(false)}
            className="modal-cancel"
          >
            Cancel
          </button>
          <button onClick={handleAddUser} className="modal-add">
            {editingUser ? "Save" : "Add"}
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation Modal"
        className="delete-modal"
        overlayClassName="delete-modal-overlay"
      >
        <h3>Delete Data User</h3>
        <p>
          Are you sure you want to delete this data user? This action cannot be
          undone.
        </p>
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

export default DataUser;
