import React, { useState, useEffect } from 'react';

const AgentProperties = ({ agent_Id }) => {
  const [properties, setProperties] = useState([]);
  agent_Id = localStorage.getItem("agentId");
  // let agent_Id ="1";

  if(!agent_Id) {
    alert('Agent does not exist');
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/agents/${agent_Id}/properties`);
      const data = await response.json();
      const propertylist = data.properties;
      console.log(propertylist);
      setProperties(propertylist);
    }
    fetchData();
  }, [agent_Id]);

  return (
    <div>
      {properties.map((property) => (
        <label key={property.id}>
          <input type="checkbox" name={property.name} value={property.id} />
          {property.name}
        </label>
      ))}
    </div>
  );
}

export default AgentProperties;
