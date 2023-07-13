import "./App.css";
import { Form } from "./components/Form";
import { UserList } from "./components/UserList";
import Modal from "./components/Modal";
import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://crudapp-production-b3f0.up.railway.app";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <Form BASE_URL={BASE_URL} />
        <UserList BASE_URL={BASE_URL} />
      </div>
      <Modal open={isOpen} onclose={() => setIsOpen(false)}>
        fancy model
      </Modal>
    </>
  );
}

export default App;
