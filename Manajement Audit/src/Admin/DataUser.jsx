import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DataKaryawan from './DataKaryawan'; // Import DataKaryawan component

Modal.setAppElement('#root');

const DataUser = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isKaryawanModalOpen, setIsKaryawanModalOpen] = useState(false);
  const roleMapping = {
    1: 'Admin',
    2: 'SPI',
    3: 'Auditee',
    4: 'Auditor',
    5: 'Admin IT'
  };

  const [newUser, setNewUser] = useState({
    No: '',
    NIK: '',
    Name: '',
    Role: '',
    Organization: '',
    Email: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3100/Admin/karyawan');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        
        // Pemetaan data dari backend ke frontend
        const mappedOrders = result.map((item, index) => ({
          No: index + 1,
          NIK: item.n_audusr_usrnm,
          Name: item.n_audusr_nm,
          Role: item.c_audusr_role,
          Organization: item.c_audusr_audr,
          Email: item.i_audusr_email
        }));
  
        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchOrders();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      console.log('Sending data:', {
        n_audusr_usrnm: newUser.NIK,
        n_audusr_nm: newUser.Name,
        n_audusr_pswd: 'default_password',
        i_audusr_email: newUser.Email,
        c_audusr_role: roleMapping[newUser.Role],
        c_audusr_audr: newUser.Organization,
        i_entry: 'some_entry_user',
        d_entry: new Date().toISOString(),
      });

      const response = await fetch('http://localhost:3100/Admin/add-karyawan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          n_audusr_usrnm: newUser.NIK,
          n_audusr_nm: newUser.Name,
          n_audusr_pswd: 'default_password',
          i_audusr_email: newUser.Email,
          c_audusr_role: roleMapping[newUser.Role],
          c_audusr_audr: newUser.Organization,
          i_entry: 'some_entry_user',
          d_entry: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      setOrders((prev) => [
        ...prev,
        { ...newUser, No: newUser.NIK, Role: roleMapping[newUser.Role] },
      ]);
      setIsAddUserModalOpen(false);
      setNewUser({ No: '', NIK: '', Name: '', Role: '', Organization: '', Email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
        const response = await fetch(`http://localhost:3100/Admin/update-karyawan/n_audusr_usrnm${newUser.NIK}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                n_audusr_nm: newUser.Name,
                n_audusr_pswd: 'default_password',
                i_audusr_email: newUser.Email,
                c_audusr_role: roleMapping[newUser.Role],
                c_audusr_audr: newUser.Organization,
            }),
        });

        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Network response was not ok: ${errorData}`);
        }

        await fetchOrders();
        setIsAddUserModalOpen(false);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const handleEditUser = (user) => {
    setNewUser(user);
    setIsAddUserModalOpen(true);
};


// Fungsi untuk menghapus user
const handleDeleteUser = async (id) => {

    // Pastikan id adalah angka
    const numericId = Number(id);
    
    if (isNaN(numericId)) {
        console.error('Invalid ID format');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3100/Admin/delete-karyawan/:i_audusr${numericId}`, {
            method: 'DELETE',
        });

        if (response.headers.get('content-type')?.includes('application/json')) {
            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                console.log('User deleted successfully');
            } else {
                throw new Error(data.error || 'Error');
            }
        } else {
            const text = await response.text();
            console.error('Unexpected response:', text);
            throw new Error('Unexpected response format.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Panggil handleDeleteUser dengan ID yang sesuai





  

  const openKaryawanModal = () => {
    setIsAddUserModalOpen(false);
    setIsKaryawanModalOpen(true);
  };

  const handleKaryawanSelect = (karyawan) => {
    setNewUser({
      No: karyawan.no,
      NIK: karyawan.nik,
      Name: karyawan.nama,
      Organization: karyawan.organisasi,
      Email: karyawan.email,
    });
    setIsKaryawanModalOpen(false);
  };

  return (
    <div className="data-user">
      <h2>Data User</h2>
      <div className="AddUser">
        <button
          className="add-user-button"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          Add User
        </button>
      </div>
      <div className="data-user-content">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Name</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
                <tr key={`${order.NIK}-${index}`}> {/* Kombinasikan NIK dan index untuk membuat kunci unik */}
                    <td>{order.i_audusr}</td>
                    <td>{order.NIK}</td>
                    <td>{order.Name}</td>
                    <td>{order.Role}</td>
                    <td>{order.Organization}</td>
                    <td>{order.Email}</td>
                    <td>
                        <button onClick={() => handleDeleteUser(order.i_audusr)}>Delete</button>
                        <button onClick={() => handleEditUser(order)}>Edit</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onRequestClose={() => setIsAddUserModalOpen(false)}
        contentLabel="Add User Modal"
        className="user-modal"
        overlayClassName="user-modal-overlay"
      >
        <h3>{newUser.No ? 'Edit' : 'Add'} Data User</h3>
        <div className="modal-content">
          <label>NIK</label>
          <input
            type="text"
            name="NIK"
            value={newUser.NIK}
            onClick={openKaryawanModal}
            readOnly
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
          <button onClick={() => setIsAddUserModalOpen(false)} className="modal-cancel">Cancel</button>
          <button onClick={newUser.No ? handleUpdateUser : handleAddUser} className="modal-add">
            {newUser.No ? 'Update' : 'Add'}
          </button>
        </div>
      </Modal>

      {/* Data Karyawan Modal */}
      <Modal
        isOpen={isKaryawanModalOpen}
        onRequestClose={() => setIsKaryawanModalOpen(false)}
        contentLabel="Data Karyawan Modal"
        className="karyawan-modal"
        overlayClassName="karyawan-modal-overlay"
      >
        <h3>Data Karyawan</h3>
        <DataKaryawan onSelectKaryawan={handleKaryawanSelect} />
        <button onClick={() => setIsKaryawanModalOpen(false)} className="modal-cancel">Close</button>
      </Modal>
    </div>
  );
};

export default DataUser;
