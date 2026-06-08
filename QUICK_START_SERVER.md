# 🎯 QUICK START - Backend Server

## ⚡ Bước 1: Cài Đặt Dependencies (LẦN ĐẦU)

```bash
cd server
npm install
```

**Nếu bạn chưa cài Node.js:**

1. Tải từ: https://nodejs.org/ (chọn LTS)
2. Cài đặt (click Next → Next → Install)
3. Mở PowerShell/Terminal mới
4. Gõ `npm install`

---

## ✅ Bước 2: Chạy Server

```bash
cd server
npm run dev
```

Bạn sẽ thấy:

```
🚀 Travel Planner Server running on http://localhost:3000
📝 Environment: development
✅ Health check: http://localhost:3000/health
```

**✨ Server đang chạy!**

---

## 🌐 Bước 3: Chạy Frontend

**Terminal mới**, mở browser đến:

```
file:///c:/Users/dell/Downloads/travel-planner-project/index.html
```

**Hoặc** nếu có VS Code:

- Cài extension "Live Server"
- Click phải `index.html` → "Open with Live Server"

---

## 📚 Các Lệnh Khác

```bash
# Chạy server (production)
npm start

# Chạy với auto-reload (development)
npm run dev

# Kiểm tra server health
curl http://localhost:3000/health
```

---

## 🔧 Nếu Có Lỗi

### ❌ "npm: not found"

- Node.js chưa được cài đặt
- Tải từ https://nodejs.org/
- Cài lại, mở terminal MỚI
- Gõ `npm --version` để kiểm tra

### ❌ "Port 3000 already in use"

```bash
# Tìm process
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

### ❌ "Cannot find module express"

```bash
cd server
npm install
```

---

## 💡 Hệ Thống Hoạt Động Như Thế Nào

```
Frontend (index.html)
   ↓ (API calls)
Node.js Server (localhost:3000)
   ↓ (Supabase queries)
Supabase Database
```

**Lợi ích:**

- ✅ Data không bao giờ bị mất
- ✅ Thêm/sửa/xóa instant
- ✅ Upload ảnh nhanh hơn
- ✅ Hỗ trợ multiple users
- ✅ Offline caching

---

## 🚀 Deploy (Sau)

Khi bạn muốn share với người khác:

### Deploy Backend lên Railway:

1. Xem hướng dẫn trong `SERVER_SETUP.md`
2. Vào https://railway.app
3. Deploy from GitHub (5 phút)

### Update Frontend:

- Frontend sẽ tự động kết nối đến production server
- Không cần thay đổi code gì

---

**🎉 Bây giờ bạn đã sẵn sàng!**

Hãy:

1. Chạy `npm run dev` trong folder server
2. Mở index.html trong browser
3. Test thêm/sửa/xóa dữ liệu
4. Xem console để debug nếu cần

**Cần giúp?** Xem `SERVER_SETUP.md` để tìm troubleshooting!
