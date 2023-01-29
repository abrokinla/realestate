import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AgentProperties = ({ agent_Id }) => {
  const [properties, setProperties] = useState([]);
  const decodeAgentId = () => {
        if (localStorage.getItem('idToken')) {
            const idToken = localStorage.getItem('idToken');
            const decodedToken = jwtDecode(idToken);
            const { user_id } = decodedToken;
            agent_Id == user_id;
        }
      }

  decodeAgentId();

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
