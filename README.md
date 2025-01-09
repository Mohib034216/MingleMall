# MingleMall

MingleMall is an eCommerce platform designed with a full-stack architecture, using Django for the backend and React for the frontend.

## Features

- **Product Management**: Supports product variants and image galleries.
- **User Roles**: Admin and customer roles with distinct permissions.
- **Cart & Wishlist**: Users can manage items in their cart and wishlist.
- **Order Management**: End-to-end order processing system.
- **Checkout**: Secure and user-friendly checkout process.

## Tech Stack

- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Database**: PostgreSQL
- **Styling**: CSS, HTML
- **Deployment**: React and Django servers via `.bat` scripts

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohib034216/MingleMall.git
   ```
2. Navigate to the project folder:
   ```bash
   cd MingleMall
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Run the Django server:
   ```bash
   ./django_server.bat
   ```
6. Run the React development server:
   ```bash
   ./react_server.bat
   ```

## Contributing

Feel free to submit issues or pull requests to contribute to this project.

---

This structure will help others understand and use your project effectively.
