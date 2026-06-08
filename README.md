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

## 🚀 Deployment

### Cách 1: Deploy lên Netlify (Dễ nhất)

1. **Tạo tài khoản GitHub** nếu chưa có
2. **Push code lên GitHub**:

   ```bash
   cd c:\Users\dell\Downloads\travel-planner-project
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Đăng ký Netlify** tại https://app.netlify.com
4. **Click "New site from Git"**
   - Chọn GitHub
   - Chọn repository
   - Build command: (để trống)
   - Publish directory: (để trống - sẽ dùng root)
   - Click **Deploy**

5. **Sau vài phút**, Netlify sẽ cấp cho bạn URL công khai

### Cách 2: Deploy bằng Netlify Drop (Nhanh)

1. Vào https://app.netlify.com/drop
2. Kéo thả folder `travel-planner-project` vào
3. Netlify sẽ tự động publish

## ⚙️ Cấu Hình Supabase (Bắt Buộc)

Để chia sẻ dữ liệu chung:

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
