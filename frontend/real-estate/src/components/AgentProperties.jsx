import React, { useState, useEffect, Component } from 'react';

const AgentProperties = ({ agentId }) => {
  const [properties, setProperties] = useState([]);
//   const agentId = localStorage.getItem("agentId");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/agents/${agentId}/properties`);
      const data = await response.json();
      const propertylist = data.properties;
      console.log(propertylist);
      setProperties(propertylist);
    }
    fetchData();
  }, [agentId]);

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
