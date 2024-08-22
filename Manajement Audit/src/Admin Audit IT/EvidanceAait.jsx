import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../Admin/DataUser";
import "../App.css";

Modal.setAppElement("#root");

const EvidanceAait = () => {
  // const [orders, setOrders] = useState(() => {
  //   const savedOrders = localStorage.getItem("orders");
  //   return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  // });

  const [orders, setOrders] = useState([]);

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

  // --- DETAILING PROCESSING ADMIN AUDIT IT INPUT DAN AUDITEE --- //

  // -- MENAMPILKAN DATA SETELAH SPI EXCEL -- //
  const handleGetSelectedAuditee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HELP_DESK}/Admin/karyawan`);
      return response.data; 
    }catch (error) {
      console.error('Error fetching data evidence: ', error);
      throw error;
    }
  };
  useEffect(() => {
    handleGetSelectedAuditee();
  }, []);

 
// -- MENAMPILKAN DATA AUDITEE -- //
  const getAuditee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HELP_DESK}/Admin/karyawan`);
        return response.data;
    } catch (error) {
        console.error('Error fetching auditee data', error);
        throw error;
    }
  };
  useEffect(() => {
    getAuditee();
  }, []);

//-- MEMILIH AUDITEE -- // 
  const updateAuditee = async (key1, key2) => {
    try {
        const response = await axios.put(`${API_URL}/update-auditee`, { key1, key2 });
        return response.data;
    } catch (error) {
        console.error('Error updating auditee', error);
        throw error;
    }
  };
  useEffect(() => {
    updateAuditee();
  }, []);


  const getSelectedAuditee = async () => {
    try {
        const response = await axios.get(`${API_URL}/selected-auditee`);
        return response.data;
    } catch (error) {
        console.error('Error fetching selected auditee', error);
        throw error;
    }
  };

  useEffect(() => {
    getSelectedAuditee();
  }, []);

  const handdleGetEvidence = async () => {
    try {
        const response = await axios.get(`${API_URL}/selected-auditee`);
        return response.data;
    } catch (error) {
        console.error('Error fetching selected auditee', error);
        throw error;
    }
  };

  useEffect(() => {
    handdleGetEvidence();
  }, []);


// -- MENAMPILKAN DATA REMARKS BY AUDITEE : -- / 
  const fetchDataRemarks = async () => {
    try {
      const key = "some_key"; // Replace with the actual key you want to pass
      const response = await axios.get(`${import.meta.env.VITE_HELP_DESK}/Admin/getDataRemarks`, {
        params: { key }
      });
      setOrders(response.data.data); // Update state with data from backend
    } catch (error) {
      console.error("Error fetching data remarks:", error);
    }
  };

  const updateStatus = async (key) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HELP_DESK}/Admin/updateStatus`, {
        I_AUDEVD: key
      });
      console.log(response.data.message); // Display success message or handle as needed
      fetchDataRemarks(); // Refresh data to reflect changes
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  useEffect(() => {
    // Call getDataRemarks API when component mounts
    fetchDataRemarks();
  }, []);

  // Fungsi untuk mendapatkan title evidence berdasarkan ID
const getTitleEvidence = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HELP_DESK}/Admin/getTitle/${id}`);
    console.log("Title Evidence:", response.data.data);
    // Update state atau tampilkan di UI sesuai kebutuhan
  } catch (error) {
    console.error("Error fetching title evidence:", error);
  }
};
const handleGetTitleClick = () => {
  const id = "some_id"; // Ganti dengan ID yang sesuai
  getTitleEvidence(id);
};


// Fungsi untuk menambahkan komentar baru
const createComment = async (i_audevd, i_audevdcomnt, content) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_HELP_DESK}/Admin/createKomenBaru`, {
      i_audevd,
      i_audevdcomnt,
      content,
    });
    console.log("Comment Created:", response.data.message);
    // Update state atau tampilkan di UI sesuai kebutuhan
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};
const handleCreateComment = () => {
  createComment();
}
// Fungsi untuk menampilkan review evidence
const getReviewEvidence = async (key1) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HELP_DESK}/Admin/getReviewEvidence`, {
      params: { key1 },
    });
    console.log("Review Evidence:", response.data.data);
    // Update state atau tampilkan di UI sesuai kebutuhan
  } catch (error) {
    console.error("Error fetching review evidence:", error);
  }
};
const handlegetReviewEvidence = () => {
  getReviewEvidence();
}

// Fungsi untuk menampilkan balasan review evidence
const getBalasanReviewEvidence = async (i_audevd, i_audevdcomnt) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_HELP_DESK}/Admin/getBalasanReviewEvidence/${i_audevd}/${i_audevdcomnt}`);
    console.log("Balasan Review Evidence:", response.data.data);
    // Update state atau tampilkan di UI sesuai kebutuhan
  } catch (error) {
    console.error("Error fetching balasan review evidence:", error);
  }
};

const handlegetBalasanReviewEvidence = () => {
  getBalasanReviewEvidence();
}


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