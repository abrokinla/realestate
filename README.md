# REAL ESTATE PROJECT
A Real Estate website to display properties available for rent to sale.

# INTRODUCTION
Welcome to the repository for my real estate web application! This application allows users to search for and browse listings of properties for sale or rent. It has a frontend built with React and a backend powered by a Python Flask API.

Some of the features of the application include:

- Agent and users account
- Listings with detailed information and photos
- Advanced search functionality

I hope you find this project useful. If yo# REAL ESTATE PROJECT
A Real Estate website to display properties available for rent to sale.
# GETTING STARTED

- Base URL: AT the moment, the app can only run locally. The backend is hosted at the default http://127.0.0.1:5000/

# ERROR HANDLING
Erros were returned as json in the following format:
@app.errorhandler(404)
def not_found(error):
    return jsonify({
            "success": False, 
            "error": 404, 
            "message": "resource not found"
            }), 404

The API will return these error types when requests fail.

404 -Not Found
400 - Bad Request
422 - Unprocessable 
405 - method not allowed
500 - Internal Server Error

# ENDPOINTS

## GET /properties

- General:
    - Returns a list of propertylist objects, success value, and total number of properties.
    - Results are paginated in groups of 10.

- Sample: $ curl http://127.0.0.1:5000/properties
{
  "property": [
    {
      "action": "rent",
      "amount": 20000,
      "bath": 2,
      "bed": 2,
      "description": "sample description of a property",
      "id": 3,
      "location": "sample location",
      "status": "renovated",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 4,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 5,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 6,
      "location": "Port Harcort",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 7,
      "location": "Port Harcort",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 8,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 9,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 10,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 11,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 12,
      "location": "Lagos",
      "status": "new",
      "toilet": 2
    }
  ],
  "success": true,
  "total_properties": 12
}

## POST /properties

- General:
    - It creates a new property. Returns the id of the created property, success value, total properties, and property list based on current page number

- Sample: (windows) $ curl http://127.0.0.1:5000/properties -X POST -H "Content-Type:application/json" -d "{\"description\":\"2 bed room apartment for sale.\",\"amount\":\"20000000\", \"location\":\"Uyo\",\"bed\":\"2\", \"bath\":\"2\", \"toilet\":\"2\", \"action\":\"sale\",\"status\":\"new\", \"agent_id\":\"1\", \"rating\":\"2\"}"

  "created": 4,
  "properties": [
    {
      "action": "rent",
      "amount": 20000,
      "bath": 2,
      "bed": 2,
      "description": "sample description of a property",
      "id": 3,
      "location": "sample location",
      "status": "renovated",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for sale.",
      "id": 4,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    }
  ],
  "success": true,
  "total_properties": 2
}

## PATCH /properties/{property_id}

- General:
    - If property_id is provided, it updates the editted sections of the specified property. Returns the success value and id of the modified property.

- Sample: (windows) $ curl http://127.0.0.1:5000/properties/6 -X PATCH -H "Content-Type: application/json" -d "{\"location\":\"Ibadan\"}"
}
  "property_id": 6,
  "sucess": true
}

## DELETE /properties/{property_id}

- General:
    - Deletes the whole of a given property if the id exists.
    - Returns id of the deleted property, success value, total properties, and property list based on current page number

- Sample: $ curl -X DELETE http://127.0.0.1:5000/properties/6

{
  "deleted": 6,
  "properties": [
    {
      "action": "rent",
      "amount": 20000,
      "bath": 2,
      "bed": 2,
      "description": "sample description of a property",
      "id": 3,
      "location": "sample location",
      "status": "renovated",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 4,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 5,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 7,
      "location": "Port Harcort",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 8,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 9,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 10,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 11,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 12,
      "location": "Lagos",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 13,
      "location": "Lagos",
      "status": "new",
      "toilet": 2
    }
  ],
  "success": true,
  "total_properties": 11
}


## POST /agents

- General:
    - It creates a new agent. 
    - Returns the id of the created agent, success value, total agents.

- Sample: $ curl http://127.0.0.1:5000/agents -X POST -H "Content-Type:application/json" -d "{\"first_name\":\"John\", \"last_name\":\"Ackerty\", \"business_name\":\"Ackerty Properties\", \"email\":\"myemail@email.com\", \"password\":\"mypassword\", \"tel\":\"+2348190907787\", \"agent_call_number\":\"+2348190907787\", \"whatsapp\":\"+2348190907787\", \"business_web\":\"ackertyproperties.com\"}"

{
  "created": 4,
  "sucess": true,
  "total_agents": 4
}

## GET /agents/{agent_id}

- General:
    - It fetches agent details with matching agent_id.
    - Returns agent object, success value.

- Sample: $ curl http://127.0.0.1:5000/agents/5
{
  "agent": {
    "agent_call_number": "08078667654",
    "business_name": "AraoyeHomes",
    "business_web": "https://araoyehomes.netlify.app",  
    "email": "abrokinla@gmail.com",
    "first_name": "Abraham",    "id": 5,
    "last_name": "Abiola",  
    "tel": "08078667654",   
    "whatsapp": "08078667654"
  },
  "success": true
}
## GET /agents/{agent_id}/properties

- General:
    - It fetches all properties posted by particular agent with matching agent_id.
    - Returns agent id, success value, paginated list of properties and total number of properties.

- Sample: $ curl http://127.0.0.1:5000/agents/1/properties
{
  "agent_id": 1,
  "properties": [
    {
      "action": "rent",
      "amount": 20000,
      "bath": 2,
      "bed": 2,
      "description": "sample description of a property",
      "id": 3,
      "location": "sample location",
      "status": "renovated",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 4,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 5,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 7,
      "location": "Port Harcort",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 8,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 9,
      "location": "Kaduna",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 10,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 11,
      "location": "Abuja",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 12,
      "location": "Lagos",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 13,
      "location": "Lagos",
      "status": "new",
      "toilet": 2
    }
  ],
  "success": true,
  "total_properties": 11
}

## POST /users

- General:
    - It creates a new user. 
    - Returns the id of the created user, success value, total users.
- Sample: (windows) $ curl http://127.0.0.1:5000/users -X POST -H "Content-Type:application/json" -d "{\"first_name\":\"John\", \"last_name\":\"Ackerty\", \"email\":\"araoyefarms@email.com\", \"pword\":\"mypassword\", \"tel\":\"+2348190907787\", \"user_role\":\"user\", \"signup_type\":\"email\"}"

{
 "created": 2,
  "sucess": true,
  "total_users": 2
}

## POST /properties/search_Term

- General:
    - It searches for a property by location using the serach term.
    - Returns the results, success value and total properties.

- Sample: $ curl -X POST -H "Content-Type: application/json" -d '{"search_Term":"Uyo"}' http://localhost:5000/search
{
  "properties": [
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 4,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    },
    {
      "action": "sale",
      "amount": 20000000,
      "bath": 2,
      "bed": 2,
      "description": "2 bed room apartment for 
sale.",
      "id": 5,
      "location": "Uyo",
      "status": "new",
      "toilet": 2
    }
  ],
  "success": true,
  "total_properties": 2
}


u have any questions or feedback, please don't hesitate to reach out