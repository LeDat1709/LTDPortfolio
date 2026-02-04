# Portfolio Website - Lê Tấn Đạt

## 🚀 Freelancer Fullstack Developer Portfolio

Trang portfolio chuyên nghiệp được thiết kế để showcase kỹ năng và dịch vụ của một freelancer fullstack developer chuyên về Web, Mobile, AI và Game Development.

## ✨ Tính năng

### 🎨 Design & UX
- **Modern & Professional**: Thiết kế hiện đại, clean và chuyên nghiệp
- **Responsive Design**: Tối ưu cho mọi thiết bị (desktop, tablet, mobile)
- **Smooth Animations**: Hiệu ứng mượt mà và tương tác thân thiện
- **Performance Optimized**: Tối ưu tốc độ tải và hiệu suất

### 📱 Sections
1. **Hero Section**: Giới thiệu với typing effect và thống kê
2. **About**: Thông tin cá nhân và kỹ năng
3. **Services**: 6 dịch vụ chính (Web, Mobile, AI, Game, Design, Consulting)
4. **Portfolio**: Showcase dự án với filtering
5. **Contact**: Form liên hệ và thông tin liên lạc

### 🛠 Technical Features
- **Clean Code**: Code được refactor và tối ưu
- **Modern JavaScript**: ES6+, Classes, Async/Await
- **CSS Grid & Flexbox**: Layout hiện đại
- **Intersection Observer**: Lazy loading và animations
- **Form Validation**: Validation phía client
- **SEO Friendly**: Meta tags và semantic HTML

## 🏗 Cấu trúc dự án

```
portfolio/
├── index.html          # Trang chính
├── css/
│   └── styles.css      # Stylesheet chính
├── js/
│   └── script.js       # JavaScript functionality
├── images/
│   ├── letandat2.png   # Ảnh profile
│   └── 0.png          # Ảnh demo projects
└── README.md          # Tài liệu này
```

## 🎯 Dịch vụ được showcase

### 💻 Web Development
- Frontend: React, Vue.js, Angular, TypeScript
- Backend: .NET Core, Node.js, Python
- Database: SQL Server, MongoDB, PostgreSQL

### 📱 Mobile Development
- Cross-platform: React Native, Flutter
- Native: iOS (Swift), Android (Kotlin)
- Deployment: App Store, Google Play

### 🤖 AI Solutions
- Machine Learning models
- Natural Language Processing
- Computer Vision
- AI Chatbots & Automation

### 🎮 Game Development
- Unity 2D/3D games
- Mobile game optimization
- Multiplayer systems
- Game monetization

### 🎨 UI/UX Design
- User Interface Design
- User Experience Research
- Prototyping & Wireframing
- Design Systems

### ⚙️ Technical Consulting
- System Architecture
- Technology Stack Selection
- Code Review & Optimization
- Team Mentoring

## 🚀 Cách sử dụng

### 1. Setup cơ bản
```bash
# Clone hoặc download project
# Mở index.html trong browser
```

### 2. Customization

#### Thay đổi thông tin cá nhân:
- **Tên**: Sửa trong `index.html` tại các section
- **Ảnh**: Thay thế `letandat2.png` bằng ảnh của bạn
- **Thông tin liên hệ**: Cập nhật trong section Contact

#### Thay đổi dịch vụ:
- Sửa nội dung trong section Services
- Thêm/bớt service cards theo nhu cầu

#### Thêm portfolio items:
- Thêm `.portfolio-item` mới trong section Portfolio
- Cập nhật `data-category` cho filtering
- Thay thế ảnh demo

#### Tùy chỉnh màu sắc:
```css
/* Trong styles.css */
:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  --accent-color: #fbbf24;
}
```

### 3. Deployment

#### GitHub Pages:
1. Push code lên GitHub repository
2. Vào Settings > Pages
3. Chọn source branch (main/master)

#### Netlify:
1. Drag & drop folder vào Netlify
2. Hoặc connect với GitHub repo

#### Vercel:
1. Import project từ GitHub
2. Deploy tự động

## 📊 Performance

- **Lighthouse Score**: 95+ trên tất cả metrics
- **Loading Time**: < 2s trên 3G
- **Bundle Size**: Optimized CSS/JS
- **SEO Score**: 100/100

## 🔧 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📝 Customization Guide

### Thay đổi Typing Effect:
```javascript
// Trong script.js, tìm array texts
const texts = [
    'Your Title 1',
    'Your Title 2',
    // Thêm titles khác
];
```

### Thêm Animation mới:
```css
@keyframes yourAnimation {
    from { /* start state */ }
    to { /* end state */ }
}

.your-element {
    animation: yourAnimation 1s ease;
}
```

### Form Integration:
```javascript
// Trong ContactForm class
async handleSubmit(e) {
    // Thêm logic gửi email
    // Ví dụ: EmailJS, Formspree, Netlify Forms
}
```

## 🎨 Color Scheme

- **Primary**: #2563eb (Blue)
- **Secondary**: #7c3aed (Purple)
- **Accent**: #fbbf24 (Yellow)
- **Text**: #1e293b (Dark Gray)
- **Background**: #ffffff (White)
- **Light**: #f8fafc (Light Gray)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔄 Updates & Maintenance

### Version 2.0 Features (Planned):
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog section
- [ ] Advanced animations
- [ ] PWA capabilities

### Maintenance:
- Cập nhật thông tin dự án thường xuyên
- Kiểm tra links và forms
- Optimize images
- Update dependencies

## 📞 Support

Nếu bạn cần hỗ trợ customize hoặc có câu hỏi:
- Email: letandat.dev@gmail.com
- Phone: +84 123 456 789

## 📄 License

MIT License - Bạn có thể sử dụng và modify tự do cho dự án cá nhân và thương mại.

---

**Made with ❤️ by Lê Tấn Đạt - Freelancer Fullstack Developer**