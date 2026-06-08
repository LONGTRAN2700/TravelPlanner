# Travel Planner Server

Backend API server for Travel Planner application using Express.js and Supabase.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

The `.env` file is already configured with Supabase credentials.

### 3. Run Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will be available at `http://localhost:3000`

## 📚 API Endpoints

### Health Check

- `GET /health` - Server health status

### Trips

- `GET /api/trips` - Get all trips
- `GET /api/trips/:tripId` - Get specific trip
- `POST /api/trips` - Create trip
- `PUT /api/trips/:tripId` - Update trip
- `DELETE /api/trips/:tripId` - Delete trip

### Categories

- `POST /api/trips/:tripId/categories` - Add category
- `PUT /api/trips/:tripId/categories/:categoryId` - Update category
- `DELETE /api/trips/:tripId/categories/:categoryId` - Delete category

### Places

- `POST /api/trips/:tripId/categories/:categoryId/places` - Add place
- `PUT /api/trips/:tripId/categories/:categoryId/places/:placeId` - Update place
- `DELETE /api/trips/:tripId/categories/:categoryId/places/:placeId` - Delete place

### Images

- `POST /api/trips/:tripId/categories/:categoryId/places/:placeId/images` - Upload image
- `DELETE /api/trips/:tripId/categories/:categoryId/places/:placeId/images/:imageId` - Delete image

### Itinerary

- `POST /api/trips/:tripId/itinerary/days` - Add itinerary day
- `POST /api/trips/:tripId/itinerary/days/:dayId/items` - Add item to day
- `DELETE /api/trips/:tripId/itinerary/days/:dayId` - Delete day
- `DELETE /api/trips/:tripId/itinerary/days/:dayId/items/:itemId` - Delete item

### State

- `GET /api/state` - Get full state

## 🔧 Configuration

Edit `.env` file to customize:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins

## 📦 Technologies

- **Express.js** - Web framework
- **Supabase** - Backend database
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🚀 Deployment

### Deploy to Railway.app (Recommended)

1. Push code to GitHub
2. Go to https://railway.app
3. Click "Create New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repo
6. Add environment variables from `.env`
7. Deploy!

### Deploy to Render.com

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

## 📝 Notes

- All data is persisted to Supabase
- Images are stored as base64 in database (consider Supabase Storage for production)
- Max image size: 5MB
- Max images per place: 100
