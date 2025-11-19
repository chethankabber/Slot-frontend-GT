import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mockContainers } from "../data/Mockdata";
import SlotCard from "../components/admin/racks/SlotCard";
import { Modal, Button, Form } from "react-bootstrap";


const ContainerDetail = () => {
  const {id} = useParams(); //Get ID From URL

  const navigate = useNavigate();                             //Searches in mockContainers
  const container = mockContainers.find((c) => c.id === id); //Finds the container with id that matches the URL

  const [selectedSlot, setSelectedSlot] = useState(null);          //Stores which slot number was clicked
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);     //Controls if “Add Item” popup is open
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);//Controls if the “Slot Item Details” popup is open

  const [newItem, setNewItem] = useState({
    name: "",
    takenBy: "",
    status: "occupied",
    returnDate: "",
  });

  if (!container) {               //If container not found
    return (
      <div className="container py-5">
        <p className="text-muted">Container not found</p>
      </div>
    );
  }

  const handleSlotClick = (slotNumber) => {                    //Function runs when slot is clicked
    const slot = container.slots.find((s) => s.slotNumber === slotNumber);
    setSelectedSlot(slotNumber);       //Stores which slot was clicked

    if (slot?.item) setIsDetailModalOpen(true);    //If slot has item → open Item Detail modal
    else setIsAddModalOpen(true);                    //If slot empty → open Add Item modal
  };

  const handleAddItem = () => {
    alert(`${newItem.name} added to Slot ${selectedSlot}`);   //For demo, just alert the item added
    setIsAddModalOpen(false);
    setNewItem({ name: "", takenBy: "", status: "occupied", returnDate: "" });
  };

  const selectedSlotData = container.slots.find(   //Gets the slot the user clicked
    (s) => s.slotNumber === selectedSlot
  );

  return (
    <div className="container py-4" >
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" onClick={() => navigate("/admin")}>  {/*Back button → takes you to admin”*/}
          <ArrowLeft size={18} className="me-1" />
          Back
        </Button>
        <div className="ms-3" >
          <h3 className="fw-bold mb-0">{container.name}</h3>
          <small className="text-muted">
            {container.slots.filter((s) => s.item).length} of{" "}
            {container.slots.length} slots occupied
          </small>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="row" >
        {container.slots.map((slot) => (
          <div
            key={slot.slotNumber}
            className="col-6 col-md-4 col-lg-3 mb-3"
            onClick={() => handleSlotClick(slot.slotNumber)}
            style={{ cursor: "pointer" }}
          >
            <SlotCard slot={slot} />
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        show={isDetailModalOpen}
        onHide={() => setIsDetailModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Slot {selectedSlot} - Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSlotData?.item ? (
            <>
              <div className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <p className="fw-semibold mb-0">{selectedSlotData.item.name}</p>
              </div>
              <div className="mb-3">
                <Form.Label>Status</Form.Label>
                <p className="text-capitalize mb-0">
                  {selectedSlotData.item.status.replace("-", " ")}
                </p>
              </div>
              <div className="mb-3">
                <Form.Label>Taken By</Form.Label>
                <p className="mb-0">{selectedSlotData.item.takenBy}</p>
              </div>
              {selectedSlotData.item.takenDate && (
                <div className="mb-3">
                  <Form.Label>Taken Date</Form.Label>
                  <p className="mb-0">
                    {new Date(
                      selectedSlotData.item.takenDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
              {selectedSlotData.item.returnDate && (
                <div className="mb-3">
                  <Form.Label>Expected Return</Form.Label>
                  <p className="mb-0">
                    {new Date(
                      selectedSlotData.item.returnDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted">No item found in this slot.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Add Item Modal */}
      <Modal
        show={isAddModalOpen}
        onHide={() => setIsAddModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item to Slot {selectedSlot}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Taken By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={newItem.takenBy}
                onChange={(e) =>
                  setNewItem({ ...newItem, takenBy: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newItem.status}
                onChange={(e) =>
                  setNewItem({ ...newItem, status: e.target.value })
                }
              >
                <option value="occupied">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </Form.Select>
            </Form.Group>

            {newItem.status === "occupied" && (
              <Form.Group className="mb-3">
                <Form.Label>Return Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newItem.returnDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, returnDate: e.target.value })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContainerDetail;


// It reads container ID from URL

// Finds that container from mock data

// Shows all slot cards

// Clicking a slot:

// If empty → let user add item

// If has item → show item details

// It uses Bootstrap modals for popups

// Saving item currently only shows alert (no real data)