# 🧳 Travel Planner - Kế Hoạch Du Lịch Chia Sẻ

Ứng dụng web để lập kế hoạch và quản lý chuyến du lịch của bạn với đội nhóm, dữ liệu được lưu trữ chung trên Supabase.

## ✨ Tính Năng

- ✅ **Quản lý chuyến du lịch**: Tạo, sửa, xóa chuyến du lịch
- ✅ **Danh mục địa điểm**: Tổ chức địa điểm theo danh mục
- ✅ **Chi tiết địa điểm**: Thêm ảnh, giá, rating, link Maps/TikTok
- ✅ **Lịch trình**: Tạo kế hoạch theo ngày với địa điểm cụ thể
- ✅ **Thư viện ảnh**: Upload ảnh cho từng địa điểm
- ✅ **Chia sẻ dữ liệu**: Toàn bộ bạn bè cùng xem và sửa dữ liệu (với Supabase)
- ✅ **Đồng bộ thời gian thực**: Tự động cập nhật khi có thay đổi từ bạn bè
- ✅ **Chế độ tối**: Hỗ trợ dark mode
- ✅ **Responsive**: Hoạt động trên desktop, tablet, mobile
- ✅ **Backend Server**: Express.js server cho độ ổn định cao (NEW)

## 🚀 Deployment

### Frontend - Deploy lên GitHub Pages (Miễn Phí)

Xem chi tiết tại `DEPLOYMENT.md`

### Backend - Deploy lên Railway/Render

Xem chi tiết tại `SERVER_SETUP.md`

## 🚀 Quick Start (Local Development)

### 1. Start Backend Server

```bash
cd server
npm install              # First time only
npm run dev             # Start server (auto-reload)
```

**Expected output:**

```
🚀 Travel Planner Server running on http://localhost:3000
📝 Environment: development
✅ Health check: http://localhost:3000/health
```

### 2. Open Frontend

In a new terminal or browser:

```
file:///c:/Users/dell/Downloads/travel-planner-project/index.html
```

**Or** use VS Code Live Server extension

### 3. Test It

- ✅ Add trip, category, place
- ✅ Upload image
- ✅ Refresh page → Data persists
- ✅ All features work!

### 📚 Documentation

- `QUICK_START_SERVER.md` - Server quick start
- `SERVER_SETUP.md` - Complete server guide
- `DEPLOYMENT.md` - GitHub Pages deployment
- `IMPLEMENTATION_SUMMARY.md` - Technical overview

---

## ⚙️ Cấu Hình Supabase (Bắt Buộc)

1. **Vào Supabase** tại https://app.supabase.com
2. **Tạo project** hoặc sử dụng project đã tạo
3. **Tạo table `travel_planner_state`** (SQL Editor):

   ```sql
   create table travel_planner_state (
     id int8 primary key,
     created_at timestamptz default now(),
     data jsonb not null
   );

   insert into travel_planner_state (id, data)
   values (1, '{"trips": []}');
   ```

4. **Lấy Supabase URL và ANON KEY**:
   - Vào Settings → API
   - Copy **Project URL**
   - Copy **anon** key
5. **Thêm vào `index.html`** (dòng ~1733):

   ```javascript
   const SUPABASE_URL = "https://YOUR-PROJECT-ID.supabase.co";
   const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
   ```

6. **Push code mới lên GitHub**:

   ```bash
   git add index.html
   git commit -m "Add Supabase config"
   git push
   ```

7. Netlify sẽ tự động redeploy

## 📱 Sử Dụng

### Trên thiết bị của bạn

1. Mở site (localhost hoặc URL Netlify)
2. Thêm chuyến du lịch, danh mục, địa điểm
3. Thêm ảnh, thông tin chi tiết

### Chia sẻ với bạn bè

1. Gửi link URL Netlify cho bạn bè
2. Bạn bè mở link sẽ thấy **cùng 1 bộ dữ liệu**
3. Khi ai đó thêm/sửa/xóa, tất cả người khác sẽ thấy cập nhật tự động
4. Nếu chưa thấy, bấm nút **⟳ Làm mới**

## 🔧 Troubleshooting

### Lỗi "Supabase chưa cấu hình"

- Kiểm tra `SUPABASE_URL` và `SUPABASE_ANON_KEY` trong `index.html`
- Xác nhận không còn `YOUR_` trong code

### Dữ liệu không đồng bộ

- Kiểm tra kết nối internet
- Bấm nút **⟳ Làm mới** để tải lại
- Kiểm tra console (F12 → Console) xem có lỗi nào không

### Upload ảnh bị lỗi

- Ảnh được nén lại tự động, chỉ lưu dưới dạng base64 trên Supabase
- Nếu ảnh quá lớn, có thể chậm (>5MB)

## 📚 Cấu Trúc File

```
travel-planner-project/
├── index.html          # Toàn bộ ứng dụng (HTML + CSS + JS)
├── .gitignore
└── README.md           # File này
```

## 🛠️ Công Nghệ

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Database**: Supabase (PostgreSQL + REST API)
- **Hosting**: Netlify
- **Browser APIs**: LocalStorage, FileReader, Canvas

## 📝 License

Miễn phí sử dụng
