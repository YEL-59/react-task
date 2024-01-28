import React, { useState, useEffect } from "react";

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Mock API endpoint, replace with the actual API endpoint
  const apiEndpoint = "https://contact.mediusware.com/api/contacts";

  useEffect(() => {
    // Fetch contacts from the API
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);
    // Update URL for Modal A
    window.history.pushState({}, "", "/modalA");
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);
    // Update URL for Modal B
    window.history.pushState({}, "", "/modalB");
  };

  const openModalC = (contact) => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(true);
    setSelectedContact(contact);
  };

  const closeModalA = () => {
    setModalAOpen(false);
    // Restore the URL to the initial state when closing Modal A
    window.history.pushState({}, "", "/");
  };

  const closeModalB = () => {
    setModalBOpen(false);
    // Restore the URL to the initial state when closing Modal B
    window.history.pushState({}, "", "/");
  };

  const closeModalC = () => {
    setModalCOpen(false);
  };

  const toggleOnlyEven = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };


  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    // Delayed filtering after 300 milliseconds (adjust the delay as needed)
    setTimeout(() => {
        filterContacts();
    }, 300);
};

const handleSearchInputKeyPress = (event) => {
    // Immediate filtering on hitting Enter key
    if (event.key === 'Enter') {
        filterContacts();
    }
};

const filterContacts = () => {
    // You may include the search term as a parameter in your API request
    // Replace the mock API endpoint with the actual API endpoint
    const filteredApiEndpoint = `${apiEndpoint}?search=${searchTerm}`;
    fetch(filteredApiEndpoint)
        .then(response => response.json())
        .then(data => setContacts(data))
        .catch(error => console.error('Error fetching filtered contacts:', error));
};

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
            style={{ backgroundColor: '#46139f', borderColor: '#46139f' }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
            style={{ backgroundColor: '#ff7f50', borderColor: '#ff7f50' }}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      <div
        className={`modal ${modalAOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: modalAOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal A</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModalA}
              ></button>
            </div>
            <div className="modal-body">
              {/* Content of Modal A goes here */}

              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search contacts"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleSearchInputKeyPress}
                            />
              <button className="btn "  style={{ backgroundColor: '#46139f', borderColor: '#46139f' }} onClick={openModalA}>
                Modal Button A
              </button>
              <button className="btn btn-secondary" onClick={openModalB}>
                Modal Button B
              </button>
              <button className="btn btn-danger" onClick={closeModalA}>
                Close
              </button>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkboxA"
                  checked={onlyEvenChecked}
                  onChange={toggleOnlyEven}
                />
                <label className="form-check-label" htmlFor="checkboxA">
                  Only even
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal B */}
      <div
        className={`modal ${modalBOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: modalBOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal B</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModalB}
              ></button>
            </div>
            <div className="modal-body">
              {/* Content of Modal B goes here */}
              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search contacts"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleSearchInputKeyPress}
                            />
              <button className="btn btn-primary" onClick={openModalA}>
                Modal Button A
              </button>
              <button className="btn " onClick={openModalB}  style={{ backgroundColor: '#ff7f50', borderColor: '#ff7f50' }}>
                Modal Button B
              </button>
              <button className="btn btn-danger" onClick={closeModalB}>
                Close
              </button>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkboxB"
                  checked={onlyEvenChecked}
                  onChange={toggleOnlyEven}
                />
                <label className="form-check-label" htmlFor="checkboxB">
                  Only even
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal C */}
      <div
        className={`modal ${modalCOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: modalCOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal C</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModalC}
              ></button>
            </div>
            <div className="modal-body">
              {selectedContact && (
                <div>
                  <p>Contact Details:</p>
                  <p>ID: {selectedContact.id}</p>
                  <p>Name: {selectedContact.name}</p>
                  {/* Add other contact details as needed */}
                </div>
              )}
              <button className="btn btn-danger" onClick={closeModalC}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
