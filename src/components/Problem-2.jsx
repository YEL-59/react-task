import React, { useState, useEffect } from "react";

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const apiEndpoint = "https://contact.mediusware.com/api/contacts/";

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();

      const allCountries = data.results.map((contact) => contact.country.name);

      setCountries(allCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();

      const usContactsData = data.results.filter(
        (contact) => contact.country.name === "United States"
      );

      setUsContacts(usContactsData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const openModalA = () => {
    setModalAOpen(true);
    setModalBOpen(false);
    setModalCOpen(false);

    window.history.pushState({}, "", "/modalA");
  };

  const openModalB = () => {
    setModalAOpen(false);
    setModalBOpen(true);
    setModalCOpen(false);

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

    window.history.pushState({}, "", "/");
  };

  const closeModalB = () => {
    setModalBOpen(false);

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

    setTimeout(() => {
      filterContacts();
    }, 300);
  };

  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      filterContacts();
    }
  };

  const filterContacts = () => {
    const filteredApiEndpoint = `${apiEndpoint}?search=${searchTerm}`;

    fetch(filteredApiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (modalAOpen) {
          setContacts(data.results);
        } else if (modalBOpen) {
          setUsContacts(
            data.results.filter(
              (contact) => contact.country.name === "United States"
            )
          );
        }
      })
      .catch((error) =>
        console.error("Error fetching filtered contacts:", error)
      );
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
            style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
            style={{ backgroundColor: "#ff7f50", borderColor: "#ff7f50" }}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* modal A */}
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
              <p>All Countries:</p>
              <ul>
                {countries.map((country, index) => (
                  <li key={index} onClick={() => openModalC(country)}>
                    {country}
                  </li>
                ))}
              </ul>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search contacts"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchInputKeyPress}
              />
              <button
                className="btn "
                style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
                onClick={openModalA}
              >
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

      {/* modal B */}
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
              <p>US Contacts:</p>
              <ul>
                {usContacts.map((contact) => (
                  <li key={contact.id} onClick={() => openModalC(contact)}>
                    {contact.phone}
                  </li>
                ))}
              </ul>
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
              <button
                className="btn "
                onClick={openModalB}
                style={{ backgroundColor: "#ff7f50", borderColor: "#ff7f50" }}
              >
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

      {/* modal C */}
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
