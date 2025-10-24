# Cấu trúc thư mục dự án ReactJS

## 📁 Cấu trúc tổng quan

```
my-react-app/
├── public/                     # Thư mục public (static files)
│   ├── index.html             # File HTML chính
│   ├── favicon.ico            # Icon trang web
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # SEO robots file
├── src/                       # Thư mục source code chính
│   ├── components/            # Các component tái sử dụng
│   │   ├── common/            # Component dùng chung
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── index.js
│   │   │   ├── Footer/
│   │   │   ├── Button/
│   │   │   └── Modal/
│   │   └── ui/                # UI components nhỏ
│   │       ├── Input/
│   │       ├── Card/
│   │       └── Loading/
│   ├── pages/                 # Các trang chính của app
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.module.css
│   │   │   └── index.js
│   │   ├── About/
│   │   ├── Contact/
│   │   └── Login/
│   ├── layouts/               # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   └── useLocalStorage.js
│   ├── services/              # API calls và external services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── dataService.js
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── context/               # React Context
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── AppContext.js
│   ├── store/                 # State management (Redux/Zustand)
│   │   ├── index.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── userSlice.js
│   │   └── middleware/
│   ├── assets/                # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── videos/
│   ├── styles/                # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── mixins.scss
│   │   └── themes/
│   ├── routes/                # Routing configuration
│   │   ├── AppRouter.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── config/                # Configuration files
│   │   ├── env.js
│   │   ├── firebase.js
│   │   └── constants.js
│   ├── tests/                 # Test files
│   │   ├── __mocks__/
│   │   ├── components/
│   │   └── utils/
│   ├── App.jsx                # Component chính
│   ├── App.css                # Styles cho App
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies và scripts
├── package-lock.json          # Lock file cho dependencies
├── README.md                  # Documentation
├── .gitignore                # Git ignore rules
├── .env                      # Environment variables
├── .env.example              # Environment template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
└── eslint.config.js          # ESLint configuration
```

## 📂 Mô tả chi tiết từng thư mục

### 🌐 `public/`
**Chức năng:** Chứa các file static không được xử lý bởi bundler
- `index.html`: File HTML template chính
- `favicon.ico`: Icon hiển thị trên tab browser
- `manifest.json`: Cấu hình cho Progressive Web App (PWA)
- `robots.txt`: Hướng dẫn cho search engine crawler

### 💻 `src/` - Thư mục source code chính

#### 🧩 `src/components/`
**Chức năng:** Chứa tất cả các React components có thể tái sử dụng

**Phân loại:**
- **`common/`**: Component dùng chung trong toàn app (Header, Footer, Navigation)
- **`ui/`**: Component UI cơ bản (Button, Input, Card, Modal)

**Cấu trúc mỗi component:**
```
ComponentName/
├── ComponentName.jsx     # Component chính
├── ComponentName.module.css # CSS modules (tùy chọn)
├── ComponentName.test.js # Unit tests
└── index.js             # Export default
```

#### 📄 `src/pages/`
**Chức năng:** Chứa các trang/màn hình chính của ứng dụng
- Mỗi page là một component lớn kết hợp nhiều component nhỏ
- Thường được sử dụng trong routing

#### 🎨 `src/layouts/`
**Chức năng:** Chứa các layout template
- `MainLayout`: Layout chính cho user thông thường
- `AuthLayout`: Layout cho các trang đăng nhập/đăng ký
- `AdminLayout`: Layout cho admin dashboard

#### 🎣 `src/hooks/`
**Chức năng:** Chứa custom React hooks
- Logic có thể tái sử dụng được tách thành hooks
- Ví dụ: `useAuth`, `useApi`, `useLocalStorage`

#### 🌐 `src/services/`
**Chức năng:** Chứa logic gọi API và tương tác external services
- `api.js`: Configuration API client (axios)
- `authService.js`: Các function liên quan authentication
- `dataService.js`: Các function CRUD data

#### 🛠️ `src/utils/`
**Chức năng:** Chứa utility functions và helpers
- `helpers.js`: Các function helper thông dụng
- `constants.js`: Các hằng số dùng chung
- `formatters.js`: Format data (date, currency, etc.)
- `validators.js`: Validation functions

#### 🏪 `src/context/`
**Chức năng:** React Context cho state management
- Share state giữa các component không cần prop drilling
- Thường dùng cho theme, authentication, language

#### 📦 `src/store/`
**Chức năng:** State management (Redux Toolkit, Zustand)
- `slices/`: Các slice của Redux Toolkit
- `middleware/`: Custom middleware
- Quản lý global state phức tạp

#### 🖼️ `src/assets/`
**Chức năng:** Chứa các file tĩnh
- `images/`: Hình ảnh (jpg, png, svg)
- `icons/`: Icon files
- `fonts/`: Custom fonts
- `videos/`: Video files

#### 🎨 `src/styles/`
**Chức năng:** Global styles và theme
- `globals.css`: CSS toàn cục
- `variables.css`: CSS variables
- `themes/`: Các theme khác nhau

#### 🛣️ `src/routes/`
**Chức năng:** Cấu hình routing
- `AppRouter.jsx`: Main router configuration
- `PrivateRoute.jsx`: Protected routes
- `PublicRoute.jsx`: Public routes

#### ⚙️ `src/config/`
**Chức năng:** Configuration files
- `env.js`: Environment variables
- `firebase.js`: Firebase configuration
- `constants.js`: App constants

#### 🧪 `src/tests/`
**Chức năng:** Test files
- `__mocks__/`: Mock data cho testing
- Tổ chức theo cấu trúc tương tự src/

## 🔥 Best Practices

### 1. **Naming Convention**
- **Components**: PascalCase (`UserProfile.jsx`)
- **Files/Folders**: camelCase hoặc kebab-case
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase

### 2. **Component Organization**
```javascript
// ✅ Good - Mỗi component có thư mục riêng
components/
├── Button/
│   ├── Button.jsx
│   ├── Button.module.css
│   ├── Button.test.js
│   └── index.js

// ❌ Avoid - Tất cả trong một file
components/
├── Button.jsx
├── ButtonStyles.css
├── Input.jsx
└── InputStyles.css
```

### 3. **Import/Export Pattern**
```javascript
// index.js trong mỗi thư mục component
export { default } from './Button';

// Sử dụng
import Button from 'components/Button';
```

### 4. **Absolute Imports**
```javascript
// vite.config.js hoặc jsconfig.json
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  }
}

// Sử dụng
import Button from '@components/Button';
import { loginUser } from '@services/authService';
```

### 5. **Environment-based Structure**
```
src/
├── components/
├── pages/
├── services/
│   ├── api/
│   │   ├── development.js
│   │   ├── production.js
│   │   └── staging.js
└── config/
    ├── development.js
    ├── production.js
    └── index.js
```

## 🚀 Lợi ích của cấu trúc này

1. **Scalability**: Dễ mở rộng khi project lớn
2. **Maintainability**: Dễ bảo trì và debug
3. **Reusability**: Components có thể tái sử dụng
4. **Team Collaboration**: Team dễ làm việc cùng nhau
5. **Testing**: Dễ viết và maintain tests
6. **Performance**: Code splitting và lazy loading hiệu quả

## 💡 Tips bổ sung

- **Feature-based Structure**: Với project lớn, có thể tổ chức theo feature thay vì theo type
- **Storybook**: Sử dụng Storybook cho component documentation
- **Husky**: Pre-commit hooks cho code quality
- **Prettier + ESLint**: Code formatting và linting
- **TypeScript**: Thêm type safety cho project

Cấu trúc này giúp project ReactJS của bạn professional, dễ maintain và scale được! 🎉