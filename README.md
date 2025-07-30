# URL Shortener

A modern URL shortener application with a sleek black-orange themed UI.

## Features

- ✨ Shorten long URLs instantly
- 📊 View click analytics
- 📋 Copy shortened URLs to clipboard
- 🎨 Beautiful black-orange themed interface
- 📱 Fully responsive design
- ⚡ Built with React + Vite and Node.js

## Tech Stack

**Frontend:**
- React with Vite
- Axios for API calls
- Lucide React for icons
- Modern CSS with CSS Variables

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- nanoid for generating short IDs

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or MongoDB Atlas connection

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/urlshortener
   PORT=5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## API Endpoints

- `POST /api/url` - Create a shortened URL
- `GET /api/url/analytics/:shortId` - Get analytics for a short URL
- `GET /:shortId` - Redirect to original URL (with tracking)

## Project Structure

```
url-shortener/
├── server/                 # Backend code
│   ├── app.js             # Main server file
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── model/             # Database models
│   └── routes/            # API routes
└── client/                # Frontend code
    ├── src/
    │   ├── components/    # React components
    │   ├── App.jsx        # Main App component
    │   └── App.css        # Styling
    └── public/            # Static assets
```

## Features in Detail

### URL Shortening
- Enter any valid URL to get a shortened version
- Automatically validates URL format
- Generates unique 8-character short IDs

### Analytics Dashboard
- View total click count
- See complete visit history with timestamps
- Beautiful data visualization

### User Experience
- Instant copy-to-clipboard functionality
- One-click URL opening in new tab
- Loading states and error handling
- Fully responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
