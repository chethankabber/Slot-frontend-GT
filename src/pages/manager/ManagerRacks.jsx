import React from "react";
import Containers from "../Containers"; // same component, allowed
                                         // BUT wrapped in manager layout

const ManagerRacks = ({ containers, setContainers, updateContainers }) => {
  return (
    <Containers
      containers={containers}
      setContainers={setContainers}
      updateContainers={updateContainers}
    />
  );
};

export default ManagerRacks;
