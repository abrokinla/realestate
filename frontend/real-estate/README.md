# Frontend - REAL ESTATTE (ARAOYE HOMES)

## Getting Setup

> _tip_: this frontend is designed to work with [Flask-based Backend](../backend) so it will not load successfully if the backend is not working or not connected. We recommend that you **stand up the backend first**, test using Postman or curl, update the endpoints in the frontend, and then the frontend should integrate smoothly.

### Installing Dependencies

1. **Installing Node and NPM**
   This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

2. **Installing project dependencies**
   This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `frontend` directory of this repository. After cloning, open your terminal and run:

```bash
npm install
```

> _tip_: `npm i`is shorthand for `npm install``


### Running Your Frontend in Dev Mode

The frontend app was built using vite. In order to run the app in development mode use `npm run dev`. You can change the script in the `package.json` file.

Open [http://localhost:5000](http://localhost:5000) to view it in the browser. The page will reload if you make edits.

```bash
npm start
```

### Optional: Styling

In addition, you may want to customize and style the frontend by editing the CSS in the `stylesheets` folder.


---

### Expected endpoints and behaviors

`GET '/properties'`

- Fetches a paginated set of properties.
- Request Arguments: None
- Returns: An object properties and total number of properties.

```json
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
```

---

`POST '/properties'`

- Creates a new property. Returns id of the created property and total number of properties.
- Request Arguments: None
- Returns: An object with 1the created property, id and total number of propoerties.

```json
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
```

---

`PATCH '/properties/${id}/'`

- Updates editted sections of property based on property_id.
- Request Arguments: `id` - integer
- Returns: An object with property_id and success prompt.

```json
}
  "property_id": 6,
  "sucess": true
}
```

---

`DELETE '/properties/${id}'`

- Deletes a specified property using the id of the property
- Request Arguments: `id` - integer
- Returns: Does not need to return anything besides the appropriate HTTP status code. Optionally can return the id of the property.

---

`POST '/agents'`

- Sends a post request in order to create a new agent account.
- Request Body:
- Returns: An object of created agent, total number of agents and success value

```json
{
  "created": 4,
  "sucess": true,
  "total_agents": 4
}
```

`GET '/agents/$id/properties'`

- Sends a get request to fetch all properties posted by a particular agent based on the agent_id/.
- Request Arguments: `id` - integer
- Returns: a single a paginated set of properties posted by an agent and the total numbe rof properties.

```json
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

```

`POST '/userss'`

- Sends a post request in order to create a new user account.
- Request Body:
- Returns: An object of created user, total number of users and success value

```json
{
  "created": 4,
  "sucess": true,
  "total_users": 4
}
```

