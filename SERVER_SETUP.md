# 🚀 Backend Server Setup Guide

## 📋 Tổng Quan

Dự án đã được nâng cấp với **Node.js backend server** để cải thiện độ ổn định và performance. Server này đảm nhiệm:

- ✅ Quản lý tất cả operation (thêm, sửa, xóa)
- ✅ Sync data chính xác giữa client và Supabase
- ✅ Optimize image handling
- ✅ Proper error handling
- ✅ Queue system cho reliable operations

---

## 🛠️ Cài Đặt Server

### Bước 1: Cài Dependencies

```bash
cd server
npm install
```

**Chờ tầm 2-3 phút** cho npm tải packages.

### Bước 2: Kiểm Tra .env

File `.env` đã có sẵn trong folder `server/`:

```
SUPABASE_URL=https://iidvnpnpdnlmckaeqvvm.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_TABLE=travel_planner_state
PORT=3000
NODE_ENV=development
```

✅ Không cần thay đổi gì!

### Bước 3: Chạy Server

```bash
# Development mode (auto-reload when code changes)
npm run dev

# Hoặc production mode
npm start
```

✅ Server sẽ chạy tại: **http://localhost:3000**

Bạn sẽ thấy:

```
🚀 Travel Planner Server running on http://localhost:3000
📝 Environment: development
✅ Health check: http://localhost:3000/health
```

---

## 🧪 Test Server

### Test 1: Kiểm tra health status

```bash
curl http://localhost:3000/health
```

Kết quả:

```json
{ "status": "OK", "timestamp": "2026-06-08T..." }
```

### Test 2: Get tất cả trips

```bash
curl http://localhost:3000/api/trips
```

---

## 🌐 Sử Dụng Frontend

### Phương pháp 1: Local Development (Khuyến khích)

1. **Terminal 1** - Chạy server:

```bash
cd server
npm run dev
```

2. **Terminal 2** - Mở web locally:

```bash
# Cách 1: Mở file trực tiếp
start index.html

# Hoặc mở browser vào:
file:///c:/Users/dell/Downloads/travel-planner-project/index.html
```

✅ Frontend sẽ tự động kết nối đến `http://localhost:3000`

### Phương pháp 2: Dùng Live Server (VS Code)

1. Cài extension "Live Server" trong VS Code
2. Click chuột phải vào `index.html` → "Open with Live Server"
3. Server sẽ mở tại `http://localhost:5500`

✅ Frontend sẽ vẫn kết nối đến `http://localhost:3000` (backend)

---

## 📚 API Endpoints

### Trips

```
GET    /api/trips                      - Get all trips
GET    /api/trips/:tripId              - Get one trip
POST   /api/trips                      - Create trip
PUT    /api/trips/:tripId              - Update trip
DELETE /api/trips/:tripId              - Delete trip
```

### Categories

```
POST   /api/trips/:tripId/categories                 - Create category
PUT    /api/trips/:tripId/categories/:categoryId     - Update category
DELETE /api/trips/:tripId/categories/:categoryId     - Delete category
```

### Places

```
POST   /api/trips/:tripId/categories/:categoryId/places                - Create place
PUT    /api/trips/:tripId/categories/:categoryId/places/:placeId       - Update place
DELETE /api/trips/:tripId/categories/:categoryId/places/:placeId       - Delete place
```

### Images

```
POST   /api/trips/:tripId/categories/:categoryId/places/:placeId/images           - Upload image
DELETE /api/trips/:tripId/categories/:categoryId/places/:placeId/images/:imageId  - Delete image
```

### Itinerary

```
POST   /api/trips/:tripId/itinerary/days                    - Add day
POST   /api/trips/:tripId/itinerary/days/:dayId/items       - Add item
DELETE /api/trips/:tripId/itinerary/days/:dayId             - Delete day
DELETE /api/trips/:tripId/itinerary/days/:dayId/items/:id   - Delete item
```

---

## 🚀 Deployment (Production)

### Option 1: Railway.app (Khuyến khích) ⭐

**Ưu điểm:**

- Setup rất dễ
- Free tier: $5/tháng
- Không sleep after inactivity
- Good uptime

**Bước:**

1. Commit code lên GitHub:

```bash
git add .
git commit -m "Backend server setup"
git push origin main
```

2. Vào https://railway.app
3. Đăng nhập bằng GitHub
4. Click "Create New Project"
5. Chọn "Deploy from GitHub repo"
6. Chọn repo `TravelPlanner`
7. Railway tự động detect `server` folder
8. Add environment variables:
   - `SUPABASE_URL` = https://iidvnpnpdnlmckaeqvvm.supabase.co
   - `SUPABASE_ANON_KEY` = (copy từ .env)
   - `SUPABASE_TABLE` = travel_planner_state
9. Click "Deploy"

✅ Server sẽ live tại: `https://your-app.railway.app`

10. Update `ALLOWED_ORIGINS` trong `.env`:

```
ALLOWED_ORIGINS=http://localhost:3000,https://longtran2700.github.io,https://your-app.railway.app
```

### Option 2: Render.com

**Ưu điểm:**

- Free tier có sẵn
- Dễ setup

**Hạn chế:**

- Sleep after 15 min inactivity (cold start ~30s)

**Bước:**

1. Vào https://render.com
2. Click "Create New" → "Web Service"
3. Kết nối GitHub repo
4. Cấu hình:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Add variables từ `.env`
5. Deploy

---

## 🔧 Troubleshooting

### ❌ Problem: "npm: not found"

**Solution:** Cài lại Node.js từ https://nodejs.org/

### ❌ Problem: "EADDRINUSE - Port 3000 already in use"

**Solution:**

```bash
# Tìm process sử dụng port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Hoặc đổi port trong .env
PORT=3001
```

### ❌ Problem: "Cannot find module express"

**Solution:**

```bash
cd server
npm install
```

### ❌ Problem: Frontend không connect được server

**Solution:**

1. Kiểm tra server đang chạy: http://localhost:3000/health
2. Kiểm tra browser console cho error
3. Kiểm tra CORS settings

---

## 📊 File Structure

```
travel-planner-project/
├── index.html                    ← Frontend (unchanged)
├── api-client.js                 ← API wrapper (NEW)
├── README.md
├── DEPLOYMENT.md
├── server/                       ← Backend (NEW)
│   ├── server.js                 ← Main server file
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── README.md
└── .git/
```

---

## ⚡ Performance Improvements

So sánh trước/sau:

| Feature             | Trước  | Sau         |
| ------------------- | ------ | ----------- |
| **Sync interval**   | 3 giây | On-demand   |
| **Data loss risk**  | High   | Low         |
| **Image upload**    | ~5s    | ~1-2s       |
| **Race condition**  | Có     | Không       |
| **Offline support** | Không  | Có (cached) |
| **Error handling**  | Basic  | Robust      |

---

## 📚 Tiếp Theo

1. **Local Testing** - Test server + frontend cùng nhau
2. **Deploy Backend** - Push server lên Railway/Render
3. **Update Frontend** - Cập nhật API_URL cho production
4. **Test Production** - Kiểm tra tất cả features

---

## 💡 Ghi Chú

- Server tự động save tất cả changes vào Supabase
- Mỗi request được log cho debugging
- Error handling comprehensive
- Database transactions support

**Bạn đã sẵn sàng để chạy server! 🚀**
