# SIP Tracker & Portfolio Valuation System

A backend-driven mutual fund SIP management and portfolio valuation platform built using Node.js, Express.js, TypeScript, and PostgreSQL.

The system enables investor management, SIP tracking, NAV updates, transaction processing, portfolio analytics, and real-time holdings valuation through RESTful APIs.

---

# Core Features

- Investor Management
- Mutual Fund & AMC Management
- SIP Creation and Processing
- NAV History Tracking
- Holdings & Portfolio Valuation
- Investor Analytics
- Dashboard Summary APIs
- Transaction History Tracking
- JWT-based Authentication
- REST API Architecture
- PostgreSQL Database Integration

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- pg Driver

## Authentication

- JSON Web Tokens (JWT)

## Development Tools

- tsx
- TypeScript Compiler
- Postman

---

# Project Structure

SIP_TRACKER
│
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utility
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore

---

# Database Tables

The system uses a normalized PostgreSQL relational schema.

### Main Tables

- investors
- amcs
- mutual_funds
- nav_history
- sips
- transactions

---

# API Endpoints

## Investor APIs

| Method | Endpoint                                | Description              |
| ------ | --------------------------------------- | ------------------------ |
| POST   | `/api/investors`                      | Create Investor          |
| GET    | `/api/investors`                      | Fetch All Investors      |
| GET    | `/api/investors/analytics`            | Investor Analytics       |
| GET    | `/api/investors/:investorId`          | Fetch Investor Details   |
| GET    | `/api/investors/:investorId/holdings` | Fetch Investor Holdings  |
| GET    | `/api/investors/:investorId/networth` | Fetch Investor Net Worth |
| POST   | `/api/investors/login`                | Investor Login           |
| POST   | `/api/investors/logout`               | Investor Logout          |

---

## Fund APIs

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/api/funds`             | Create Mutual Fund |
| GET    | `/api/funds`             | Fetch All Funds    |
| PUT    | `/api/funds/:fundId/nav` | Update Fund NAV    |

---

## SIP APIs

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| POST   | `/api/sips`                     | Create SIP              |
| GET    | `/api/sips/:sipId`              | Fetch SIP Details       |
| POST   | `/api/sips/:sipId/process`      | Process SIP Transaction |
| GET    | `/api/sips/:sipId/transactions` | Fetch SIP Transactions  |

---

## Dashboard APIs

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | `/api/dashboard/summary`      | Dashboard Summary   |
| GET    | `/api/dashboard/transactions` | Recent Transactions |

---

# SIP Processing Workflow

When a SIP transaction is processed:

1. Latest NAV for the mutual fund is fetched
2. Units are calculated based on investment amount
3. Transaction entry is created
4. Portfolio holdings are updated

### Formula

Units Allocated = Transaction Amount / Latest NAV

---

# Holdings Valuation

Portfolio valuation is calculated using:

Current Value = Total Units × Latest NAV

---

# Database Design

The database schema is normalized up to Third Normal Form (3NF).

### Benefits

- Reduced Data Redundancy
- Better Data Consistency
- Improved Referential Integrity
- Scalable Relational Structure

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/vamshiburgula/sipTracker.git
```

## 2. Install Dependencies

npm install

### 3. Configure Environment Variables

#Create a `.env` file in the project root.

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=your_port_number

#### 4 Run Development Server

npm run dev

##### 5 Build TypeScript Project

npm run build

###### 6 Start Production Server

npm start

# PostgreSQL Integration

The backend uses PostgreSQL with connection pooling through the `pg` library.

Database configuration is managed inside:

src/utility/dbManager.ts


# Authentication

JWT-based authentication is implemented for secure login and session validation.


# Example API Request

## Create Investor

### Endpoint

POST /api/investors

### Request Body

{
  "investor_id": "INV001",
  "first_name": "Vinod",
  "last_name": "Kumar",
  "email": "vinod@gmail.com",
  "phone": "9876543210",
  "pan_number": "ABCDE1234F"
}


# API Testing

Postman Collection:

[https://web.postman.co/workspace/My-Workspace~cc6b6694-3105-4ad3-87ce-1f574b875989/collection/30473883-95c4d36b-5859-4710-bf37-d6c2d0bb2d03?action=share&amp;source=copy-link&amp;creator=30473883](Postman Collection)


# Future Improvements

* Request Validation Middleware
* Password Hashing
* Database Indexing
* Role-Based Authorization
* Swagger/OpenAPI Documentation
* Docker Deployment
* Automated Unit & Integration Testing
* CI/CD Pipeline Integration


# Author

Burgula Krishna Vamshi

* GitHub: [https://github.com/vamshiburgula](https://github.com/vamshiburgula)
* LinkedIn: [https://linkedin.com/in/vamshiburgula]()
