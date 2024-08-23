import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement("#root");

const EvidenceAait = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
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
    publishingYear: "",
  });
  const [currentEditOrder, setCurrentEditOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleAddUser = () => {
    setOrders((prev) => [
      ...prev,
      { no: prev.length > 0 ? prev[prev.length - 1].no + 1 : 1, ...newUser, publishingYear: new Date().getFullYear() },
    ]);
    setIsModalOpen(false);
    resetNewUser();
  };

  const handleEditUser = (order) => {
    setCurrentEditOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.no === currentEditOrder.no ? currentEditOrder : order
      )
    );
    setIsEditModalOpen(false);
    setCurrentEditOrder(null);
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
      publishingYear: "",
    });
  };

  const handleYearChange = (date) => {
    const year = date ? getYear(date) : "";
    setSelectedYear(year);
  };

  const filteredOrders = selectedYear
    ? orders.filter((order) => order.publishingYear === parseInt(selectedYear))
    : orders;

  useEffect(() => {
    const fetchDataByYear = async () => {
      if (selectedYear) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_HELP_DESK}/AuditIT/tmau-devd`, {
            params: { year: selectedYear }
          });

          if (response.data && Array.isArray(response.data.data)) {
            const formattedData = response.data.data.map(item => ({
              no: item.i_audevd,
              dataAndDocumentNeeded: item.n_audevd_title,
              phase: item.n_audevd_phs,
              status: item.c_audevd_stat,
              deadline: new Date(item.d_audevd_ddl).toLocaleDateString(),
              remarksByAuditee: item.i_entry,
              remarksByAuditor: item.d_entry,
              auditee: item.n_audevd_audr,
              auditor: item.i_audevd_aud,
              statusComplete: item.c_audevd_statcmpl,
              publishingYear: new Date(item.c_audevd_yr).getFullYear(),
            }));

            setOrders(formattedData);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchDataByYear();
  }, [selectedYear]);

  return (
    <div className="evidence-content">
      <h2>Data Evidence</h2>
      <div className="filter-year-evidence">
        <label>Filter Berdasarkan Tahun Penerbitan: </label>
        <DatePicker
          selected={selectedYear ? new Date(`${selectedYear}-01-01`) : null}
          onChange={handleYearChange}
          showYearPicker
          dateFormat="yyyy"
          placeholderText="Select year"
        />
      </div>

      <div className="add-evidence">
        <button
          className="add-evidence-button"
          onClick={() => {
            setIsModalOpen(true);
            resetNewUser();
          }}
        >
          Add User
        </button>
      </div>

      <div className="evidence-table">
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
              <th>Publishing Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={order.no || index}>
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
                  <td>{order.publishingYear}</td>
                  <td>
                    <button onClick={() => handleEditUser(order)}>Edit</button>
                    <button onClick={() => handleDeleteUser(order)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">Tidak ada data untuk ditampilkan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add User Modal"
        className="evidence-modal"
        overlayClassName="evidence-modal-overlay"
      >
        <div className="evidence-content">
          <h2>Add User</h2>
          <form>
            <label>
              Data and Document Needed:
              <input
                type="text"
                value={newUser.dataAndDocumentNeeded}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    dataAndDocumentNeeded: e.target.value,
                  }))
                }
              />
            </label>
            {/* Add other fields here as needed */}
            <button type="button" onClick={handleAddUser}>
              Add User
            </button>
          </form>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit User Modal"
        className="evidence-modal"
        overlayClassName="evidence-modal-overlay"
      >
        <div className="evidence-content">
          <h2>Edit User</h2>
          {currentEditOrder && (
            <form>
              <label>
                Data and Document Needed:
                <input
                  type="text"
                  value={currentEditOrder.dataAndDocumentNeeded}
                  onChange={(e) =>
                    setCurrentEditOrder((prev) => ({
                      ...prev,
                      dataAndDocumentNeeded: e.target.value,
                    }))
                  }
                />
              </label>
              {/* Add other fields here as needed */}
              <button type="button" onClick={handleSaveEditUser}>
                Save
              </button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EvidenceAait;
