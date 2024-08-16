import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DataKaryawan from './DataKaryawan'; // Import DataKaryawan component
import axios from 'axios';

Modal.setAppElement('#root');

const DataUser = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isKaryawanModalOpen, setIsKaryawanModalOpen] = useState(false);
  const [iAudusr, setIAudusr] = useState('null');
  const [message, setMessage] = useState('');
  const getRoleValue = (roleLabel) => {
    switch (roleLabel) {
      case 'ADMIN': return 0;
      case 'SPI': return 1;
      case 'AUDITEE': return 2;
      case 'AUDITOR': return 3;
      case 'ADMIN_IT': return 4;
      default: return null;
    }
  };
  const getRoleLabel = (roleValue) => {
    switch (parseInt(roleValue)) {
      case 0: return 'ADMIN';
      case 1: return 'SPI';
      case 2: return 'AUDITEE';
      case 3: return 'AUDITOR';
      case 4: return 'ADMIN_IT';
      default: return 'null';
    }
  };



  const [newUser, setNewUser] = useState({
    No: '',
    NIK: '',
    Name: '',
    Role: '',
    Organization: '',
    Email: '',
  });

  const fetchKaryawan = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HELP_DESK}/Admin/karyawan`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.payload === 'Data tidak ditemukan') {
        console.error('Data tidak ditemukan');
        return;
      }
      
      const mappedKaryawan = result.payload.map((item, index) => ({
        No: index + 1,
        NIK: item.n_audusr_usrnm,
        Name: item.n_audusr_nm,
        Role: getRoleLabel(item.role),
        Organization: item.organisasi,
        Email: item.i_audusr_email
      }));

      setOrders(mappedKaryawan);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);
  
  const handleAddUser = async () => {
    try {
      const roleValue = getRoleValue(newUser.Role);
      if (roleValue === null) {
        throw new Error('Peran yang dipilih tidak valid');
      }
  
      const bodyData = {
        key: newUser.NIK,
        key1: newUser.Name,
        key2: roleValue,
        key3: newUser.Email
      };
  
      console.log('Data yang dikirim:', bodyData);
  
      const response = await fetch(`${import.meta.env.VITE_HELP_DESK}/Admin/add-karyawan`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Terjadi kesalahan yang tidak diketahui');
      }
  
      const responseData = await response.json();
      console.log('Data respon:', responseData);
  
      alert('Pengguna berhasil ditambahkan');
      setIsAddUserModalOpen(false);
      fetchKaryawan(); // Refresh daftar karyawan
  
    } catch (error) {
      console.error('Error menambahkan pengguna:', error);
      alert(`Error menambahkan pengguna: ${error.message}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdateUser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HELP_DESK}/Admin/update-karyawan/n_audusr_usrnm${newUser.NIK}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                n_audusr_nm: newUser.Name,
                n_audusr_pswd: 'default_password',
                i_audusr_email: newUser.Email,
                c_audusr_role: newUser.Role,
                organasasi: newUser.Organization,
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
  try {
    const response = await axios.delete(`${import.meta.env.VITE_HELP_DESK}/Admin/delete-karyawan/${id}`);
    if (response.status === 200) {
      console.log('User berhasil dihapus');
      // Update state untuk menghapus user dari daftar
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } else {
      console.error('Gagal menghapus user:', response.data.message);
    }
  } catch (error) {
    console.error('Error saat menghapus user:', error);
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
              <tr key={`${order.NIK}-${index}`}>
                <td>{order.No}</td>
                <td>{order.NIK}</td>
                <td>{order.Name}</td>
                <td>{order.Role}</td>
                <td>{order.Organization}</td>
                <td>{order.Email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(order.id)}>Delete</button>
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
              <option value="">Pilih Peran</option>
              <option value="ADMIN">Admin</option>
              <option value="SPI">SPI</option>
              <option value="AUDITEE">Auditee</option>
              <option value="AUDITOR">Auditor</option>
              <option value="ADMIN_IT">Admin IT</option>
            </select>
          {/* <label>Organization</label>
          <input
            type="text"
            name="Organization"
            value={newUser.Organization}
            onChange={handleInputChange}
            className="modal-input"
          /> */}
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
