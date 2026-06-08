# 📚 Hướng Dẫn Deploy Lên GitHub Pages

## 🎯 Tổng Quan
Travel Planner đã được deploy lên **GitHub Pages** - một hosting miễn phí và ổn định từ GitHub.

---

## 📋 Bước 1: Chuẩn Bị (Chỉ làm lần đầu)

### 1.1 Kiểm tra repo GitHub
- Đảm bảo bạn đã push code lên GitHub: https://github.com/LONGTRAN2700/TravelPlanner
- Repository phải là **Public** (không phải Private)

### 1.2 Kiểm tra cấu trúc thư mục
```
travel-planner-project/
├── index.html          ✅ File chính
├── README.md
├── DEPLOYMENT.md
└── .git/               (Git repository)
```

---

## 🚀 Bước 2: Enable GitHub Pages (Lần Đầu)

### 2.1 Đăng nhập GitHub
1. Vào https://github.com/LONGTRAN2700/TravelPlanner
2. Đảm bảo đã đăng nhập với tài khoản của bạn

### 2.2 Truy cập Settings
1. Click tab **Settings** (cog icon ⚙️ bên phải cùng)
2. Chọn menu bên trái: **Pages**

### 2.3 Cấu hình Deploy
Trong mục **Build and deployment**:
- **Source**: Chọn `Deploy from a branch`
- **Branch**: Chọn `main`
- **Folder**: Chọn `/ (root)`
- Click **Save**

### 2.4 Chờ Deploy
- GitHub sẽ build và deploy tự động
- Chờ 2-3 phút, bạn sẽ thấy thông báo xanh:
  ```
  ✅ Your site is live at https://longtran2700.github.io/TravelPlanner
  ```

---

## 📤 Bước 3: Cập Nhật Code (Lần Sau)

### 3.1 Chỉnh sửa code locally
Sửa `index.html` hoặc các file khác trên máy

### 3.2 Commit và Push
```bash
# 1. Kiểm tra thay đổi
git status

# 2. Add tất cả thay đổi
git add .

# 3. Commit
git commit -m "Mô tả thay đổi của bạn"

# 4. Push lên GitHub
git push origin main
```

### 3.3 Tự động Deploy
- GitHub Pages sẽ **tự động phát hiện** push mới
- Build lại website (2-3 phút)
- Website sẽ cập nhật tại: https://longtran2700.github.io/TravelPlanner

---

## ✅ Kiểm Tra Deploy Status

### Cách 1: Từ GitHub Web
1. Vào https://github.com/LONGTRAN2700/TravelPlanner
2. Click **Settings** → **Pages**
3. Xem mục **Deployments** → Lịch sử deploy

### Cách 2: Kiểm tra Live URL
```
https://longtran2700.github.io/TravelPlanner
```
- Nếu thấy app → ✅ Deploy thành công
- Nếu lỗi → Kiểm tra lại code hoặc CSS

---

## 🔧 Troubleshooting

### ❌ Lỗi: Website không hiển thị
**Giải pháp:**
1. Kiểm tra `index.html` có lỗi CSS/JS không
   ```bash
   git status  # Kiểm tra file changes
   ```
2. Xem error logs:
   - Vào Settings → Pages
   - Xem "Deployments" → Click vào deploy gần nhất
   - Xem log details

### ❌ Lỗi: Thay đổi không cập nhật
**Giải pháp:**
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Truy cập lại: https://longtran2700.github.io/TravelPlanner
3. Nếu vẫn không được, chờ 5 phút và thử lại

### ❌ Lỗi: CSS không load
**Giải pháp:**
- Kiểm tra indentation trong `<style>` block
- Đảm bảo không có `}` dư thừa

---

## 📱 Thông Tin Quan Trọng

### ✅ Cái gì hoạt động:
- ✅ HTML/CSS/JavaScript
- ✅ Supabase Database (vẫn hoạt động bình thường)
- ✅ localStorage (lưu trữ dữ liệu cục bộ browser)
- ✅ File download (Excel export)

### ❌ Cái gì KHÔNG hoạt động:
- ❌ Backend server (Node.js, Python, etc.)
- ❌ Server-side database (MySQL, PostgreSQL, etc.)
- ❌ File upload lên server (nhưng có thể upload hình vào Supabase)

---

## 🔄 Quy Trình Phát Triển Thường Ngày

```
1. Sửa code → index.html
2. Test locally → Mở file:///path/index.html
3. Commit → git commit -m "..."
4. Push → git push origin main
5. GitHub Pages tự động deploy → 2-3 phút
6. Check live URL → https://longtran2700.github.io/TravelPlanner
```

---

## 📞 Liên Hệ & Support

- **Repo GitHub**: https://github.com/LONGTRAN2700/TravelPlanner
- **Live URL**: https://longtran2700.github.io/TravelPlanner
- **Documentation**: Xem README.md

---

## 📝 Lịch Sử Deploy

| Ngày | Thay đổi | Status |
|------|---------|--------|
| 2026-06-08 | Fix image upload limit | ✅ Deployed |
| 2026-06-08 | Fix Excel export | ✅ Deployed |
| 2026-06-08 | Fix CSS indentation | ✅ Deployed |

---

**Happy Deploying! 🚀**
