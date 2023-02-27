import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AgentProperties = ({ agentId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Get the user_id from the decoded token
      const idToken = localStorage.getItem('idToken');
      const decodedToken = jwtDecode(idToken);
      const { agent_id } = decodedToken;

      // Fetch the properties for the given agent
      const response = await fetch(`http://localhost:5000/agents/${agentId}/properties`);
      const data = await response.json();
      const propertylist = data.properties;

      // Filter the properties for the current user
      // const userProperties = propertylist.filter((property) => property.agent_id === agent_id);

      setProperties(userProperties);
      setLoading(false);
    }
    fetchData();
  }, [agentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!properties || properties.length === 0) {
    return <div>No properties found.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Location</th>
          <th>Number of Bed Space</th>
          <th>Number of Bathrooms</th>
          <th>Number of Toilet</th>
          <th>Property for</th>
          <th>Property Status</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.id}>
            <td>{property.description}</td>
            <td>{property.amount}</td>
            <td>{property.location}</td>
            <td>{property.bed}</td>
            <td>{property.bath}</td>
            <td>{property.toilet}</td>
            <td>{property.action}</td>
            <td>{property.status}</td>
            <td>
              <label>
                <input type="checkbox" name={property.description} value={property.id} />
                Select
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgentProperties;
