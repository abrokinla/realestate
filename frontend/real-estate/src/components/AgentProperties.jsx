import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import "../styles/agentproperties.css";

const AgentProperties = ({ agentId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);

    // Update the checked property of all checkboxes in the table
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Get the user_id from the decoded token
      const idToken = localStorage.getItem('idToken');
      const decodedToken = jwtDecode(idToken);
      const { agent_id } = decodedToken;

      // Fetch the properties for the given agent
      const response = await fetch(`http://localhost:5000/agents/${agentId}/properties`, {
        headers: {
          Authorization: `${idToken}`
        }
      });
      const data = await response.json();
      const propertylist = data.properties;
      
      setProperties(propertylist);
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
      <section id="table-contana">
        <section id="table-controls">
          <label>
          <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAll} />
            Select All
          </label>
          <p>View Selected</p>          
          <p>Delete Selected</p>
          <p>Edit Selected</p>
        </section>

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
                    
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  );
};

export default AgentProperties;
