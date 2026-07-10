TimeAura is a premium e-commerce platform for luxury watches, wallets and perfumes.

Primary audience:
- Pakistani customers

Admin Features
- Product management
- Category management
- Orders
- Customers
- Staff

Customer Features
- Browse products
- Cart
- Checkout
- Order tracking
- Authentication

Future Features
- Reviews
- Wishlist
- Coupons
- Recommendations


TECH STACK
Frontend
- Next.js 16
- React
- Tailwind
- TypeScript (future)

Backend
- Node.js
- Express
- Prisma

Database
- PostgreSQL

Infrastructure
- Docker
- Docker Compose

Authentication
- JWT
- Refresh Tokens
- Email OTP

Payments
- JazzCash
- Easypaisa
- Stripe (future)


Coding Standards
Never use floating prices.

Always store money in integer PKR.

Repository Pattern.

Service Layer.

Controller Layer.

Business logic never inside controller.

Prisma only inside repositories.

Use async/await everywhere.

Never mix CommonJS and ES Modules.

Always use environment variables.

Never expose secrets.



Folder Responsibilities
Frontend owns:

UI
Components
Pages
Hooks
API Client

Backend owns:

Controllers
Services
Repositories
Middleware
Database
Validation



Naming Convention
camelCase

PascalCase

kebab-case

UPPER_CASE

Database

singular models

plural tables

Repository

AuthRepository

Service

AuthService

Controller

AuthController



Auth Flow

Authentication Flow

Explain login flow.

Signup

↓

Generate OTP

↓

Email Verification

↓

Create User

↓

Login

↓

JWT Access Token

↓

Refresh Token

↓

Protected Routes