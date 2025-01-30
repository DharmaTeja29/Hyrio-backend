# Backend

This is an Express.js backend server. Follow the instructions below to set up and run it locally on your system.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/DharmaTeja29/Hyrio-backend.git
```

### 2. Navigate to the Project Directory

```sh
cd Hyrio-backend
```

### 3. Install Dependencies

Run the following command to install the required dependencies:

```sh
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables. Example:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
```

### 5. Start the Server

Run the following command to start the server:

```sh
npm start
```

The server should now be running at:

```
http://localhost:3500/
```

## Additional Commands

### Run in Development Mode

For automatic server restart on file changes, use:

```sh
npm run dev
```

## Contributing

If you want to contribute to this project, feel free to fork the repository and create a pull request.