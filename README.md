# Essenté - Luxury Brand MERN Stack Application

A modular, AI-ready web application for the Essenté luxury brand, built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Key Features
- **Modern UI/UX**: Responsive design using Tailwind CSS, inspired by luxury aesthetics.
- **RESTful API**: Secure and scalable backend with Express and MongoDB.
- **Product Management**: CRUD operations for products (Admin).
- **Authentication**: JWT-based authentication for users and admins.
- **AI-Ready Architecture**: Structural placeholders for LLM integration (e.g., personalized shopping assistant).
- **Security**: Rate limiting, Helmet, Data Sanitization.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Swiper.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Security**: Helmet, XSS-Clean, HPP, Rate Limit, CORS.
- **Tools**: Git, npm.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1.  **Clone the repository** (if applicable)

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in `server/` with the following:
      ```env
      NODE_ENV=development
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/essente
      JWT_SECRET=your_jwt_secret
      # OPENAI_API_KEY=your_key_here  # Future AI integration
      ```
    - Start the server:
      ```bash
      npm run dev
      ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    ```
    - Start the development server:
      ```bash
      npm run dev
      ```
    - The app should be running at `http://localhost:5173`.

## 🤖 AI Integration Guide
This application is designed to be "AI-Ready". The structure allows for easy integration of LLMs (Large Language Models) like OpenAI GPT or Google Gemini.

### How to Enable AI Features
1.  **Backend Controller**: Located at `server/src/controllers/aiController.js`.
    - Function: `chatWithAI`
    - Logic: Currently returns a mock response. Integration involves uncommenting the TODO section and calling your LLM provider's API.
2.  **Route**: `POST /api/v1/ai/chat`.
3.  **Frontend Integration**:
    - Build a Chat UI component in `client/src/components/common/Chat.jsx`.
    - Use `client/src/services/api.js` to send user messages to the backend endpoint.

### Example Use Cases
- **Style Advisor**: "What goes well with the Merino Wool Coat?"
- **Sustainability Bot**: "Tell me about the materials used."
- **Customer Support**: Automated handling of returns/shipping queries.

## 📂 Project Structure
```
essente-web/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views
│   │   ├── services/       # API integration
│   │   └── hooks/          # Custom Hooks
│   └── ...
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/         # DB and Env config
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose Schemas
│   │   ├── routes/         # API Routes
│   │   └── middleware/     # Auth, Error, Security
│   └── ...
└── README.md
```

## 🛡️ Security Best Practices Implemented
- **Helmet**: Sets various HTTP headers for security.
- **Rate Limiting**: Prevents brute-force attacks.
- **Mongo Sanitize**: Prevents NoSQL injection.
- **JWT**: Stateless authentication.
