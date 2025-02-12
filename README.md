# Project Setup

## Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. **Clone the repository**:  
   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:  
   ```sh
   cd <project-directory>
   ```

3. **Install dependencies**:  
   ```sh
   npm install
   ```

## Running the Project

To start the project, run both the backend and frontend servers:

- **Start the backend server**:  
  ```sh
  node server.js
  ```

- **Start the React development server**:  
  ```sh
  npm start
  ```

## Configuration

Modify the `SetID.js` file to use the correct API URL for local development:

- **Uncomment** the localhost URL:  
  ```js
  // const apiUrl = "http://localhost:8080/";
  ```

- **Comment out** the Render deployment URL:  
  ```js
  const apiUrl = "https://tt-s1kv.onrender.com/";
  ```

## Usage

Once the servers are running, access the application at:  
👉 [http://localhost:3000](http://localhost:3000) (or the configured port).

