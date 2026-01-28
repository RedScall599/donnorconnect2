# DonorConnect - Donor Retention Platform

> **🎯 Production MVP**: A complete donor retention platform helping nonprofits solve the critical "first-to-second gift" conversion problem with AI-powered insights.

## 🚀 What This Platform Does

A fully functional donor retention platform that helps nonprofits manage donors, track donations, and improve retention through:

- **Multi-tenant donor management** with role-based access (Admin, Staff)
- **Campaign tracking** with donation recording and real-time analytics
- **AI-powered chatbot** using GPT-4o Mini for platform assistance
- **Dynamic donor segmentation** with automatic member counting
- **Session-based authentication** with secure HTTP-only cookies
- **Real-time dashboard** with interactive data visualization
- **Comprehensive admin tools** for full donor CRUD operations

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Session-based authentication** with HTTP-only cookies
- **Role-based access control** (Admin and Staff roles)
- **Protected routes** with automatic redirects
- **Password hashing** with bcrypt
- **Secure session management** with database storage

### 👥 Donor Management
- **Full CRUD operations** for donor records
- **Admin-exclusive editing** with comprehensive field access
- **Retention risk tracking** (Low, Moderate, High, Critical)
- **Donor status management** (Active, Lapsed, Inactive, Do Not Contact)
- **Contact information** including email, phone, and address
- **Delete functionality** with confirmation dialogs

### 💰 Donation Tracking
- **Email-based donation creation** for authenticated users
- **Campaign-linked donations** for performance tracking
- **Real-time donor metric updates** (total gifts, total amount, last gift date)
- **Payment type tracking** (Cash, Check, Credit Card, Bank Transfer, etc.)
- **Automatic donor creation** from user accounts when donating

### 📊 Campaign Analytics
- **Total raised calculation** per campaign
- **Donor participation lists** with amounts and dates
- **Campaign status tracking** (Planned, Active, Completed, Archived)
- **Goal progress visualization**
- **Annual Fund 2025** with updated campaign data

### 🎯 Dynamic Segmentation
- **Real-time member counting** based on donor criteria
- **First-Time Donors segment** (donors who gave exactly once)
- **Major Donors segment** ($1000+ lifetime giving)
- **High-Risk Retention segment** (donors at high/critical risk)
- **Lapsed Donors segment** (12+ months without giving)

### 🤖 AI-Powered Features
- **Intelligent chatbot assistant** using OpenAI GPT-4o Mini
- **Natural language platform guidance** for users
- **Context-aware responses** about donors, donations, campaigns
- **Secure API key management** with environment variables
- **Audit logging** for all AI interactions

### 📈 Dashboard Insights
- **Total donor count** across organization
- **Total donation tracking** with real-time updates
- **At-risk donor alerts** (admin-only)
- **Recent activity feed**
- **Role-specific views** (different metrics for admins vs. staff)

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **pnpm 10.18+** (recommended package manager)
- **PostgreSQL database** (local installation or cloud service like Neon)
- **Basic knowledge** of JavaScript, React, and SQL concepts

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd donor-connect
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your database connection:
   ```env
   # For local PostgreSQL
   DATABASE_URL="postgresql://username:password@localhost:5432/donor_connect?sslmode=disable"
   
   # For Neon (cloud)
   DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"
   ```

3. **Set up database:**
   ```bash
   # Generate Prisma client (creates /prisma/generated/)
   npx prisma generate

   # Run database migrations
   npx prisma migrate deploy

   # Load sample data (75 donors, 200+ donations, campaigns, etc.)
   npx prisma db seed
   ```

4. **Configure OpenAI API (for chatbot):**
   Add your OpenAI API key to `.env`:
   ```env
   OPENAI_API_KEY="sk-proj-your-api-key-here"
   ```

5. **Start development:**
   ```bash
   pnpm dev
   ```
   
   🎉 Open [http://localhost:3000](http://localhost:3000) to see the app!

### 🔑 Test Login Credentials

After seeding, log in with these credentials to explore the existing data:

- **Email:** `admin@hopefoundation.org`
- **Password:** `password123`

> **💡 Tip**: Use `npx prisma studio` to explore the database visually while developing.

## 📁 Project Architecture

```
donor-connect/
├── 🔧 Configuration
│   ├── prisma.config.js         # Prisma 7 configuration
│   ├── tailwind.config.js       # Tailwind CSS 4 setup
│   ├── vitest.config.js         # Testing configuration
│   └── next.config.js           # Next.js configuration
│
├── 🗄️ Database
│   ├── prisma/
│   │   ├── schema.prisma        # Complete nonprofit domain model
│   │   ├── seed.js              # Realistic test data (75 donors, 200+ donations)
│   │   └── migrations/          # Database version control
│   │
├── 📱 Application
│   ├── src/app/
│   │   ├── (auth)/              # 🔓 Public authentication pages
│   │   │   ├── login/page.jsx   # TODO: Login form with validation
│   │   │   └── register/page.jsx# TODO: Registration form
│   │   │
│   │   ├── (dashboard)/         # 🔐 Protected dashboard pages
│   │   │   ├── donors/          # TODO: Donor CRUD interface
│   │   │   ├── campaigns/       # TODO: Campaign management
│   │   │   ├── donations/       # TODO: Donation recording
│   │   │   ├── segments/        # TODO: Donor segmentation
│   │   │   └── workflows/       # TODO: Automation builder
│   │   │
│   │   ├── api/                 # 🔗 Backend API routes
│   │   │   ├── auth/            # TODO: Authentication endpoints
│   │   │   ├── donors/          # TODO: Donor CRUD operations
│   │   │   ├── donations/       # TODO: Donation tracking
│   │   │   └── [entity]/        # TODO: Standard REST endpoints
│   │   │
│   │   └── middleware.js        # TODO: Route protection & session validation
│   │
├── 🧩 Components
│   ├── src/components/
│   │   ├── ui/                  # ✅ shadcn/ui components (ready to use)
│   │   ├── donors/              # TODO: Donor-specific components
│   │   ├── campaigns/           # TODO: Campaign components
│   │   └── workflows/           # TODO: Workflow builder components
│   │
├── 🔧 Utilities
│   ├── src/lib/
│   │   ├── auth.js              # TODO: Authentication helpers
│   │   ├── session.js           # TODO: Session management
│   │   ├── db.js                # ✅ Prisma client singleton
│   │   ├── api/                 # TODO: Business logic functions
│   │   └── validation/          # TODO: Zod schemas for data validation
│   │
└── 🧪 Testing
    ├── tests/
    │   ├── e2e/                 # TODO: Playwright end-to-end tests
    │   ├── handlers/            # TODO: MSW mock handlers
    │   └── lib/                 # TODO: Unit tests for utilities
```

### 🎯 Implementation Status

| Module | Status | Description |
|--------|--------|-------------|
| **Configuration** | ✅ Complete | Production-ready configs for all tools |
| **Database Schema** | ✅ Complete | Full nonprofit domain model with Prisma 7 |
| **Seed Data** | ✅ Complete | 75 donors, 200+ donations, realistic test data |
| **UI Components** | ✅ Complete | shadcn/ui foundation with custom components |
| **Authentication** | ✅ Complete | Session-based auth with HTTP-only cookies |
| **API Routes** | ✅ Complete | RESTful endpoints for donors, donations, campaigns |
| **Dashboard Pages** | ✅ Complete | Full dashboard with role-based views |
| **Donor Management** | ✅ Complete | CRUD operations with admin editing & deletion |
| **Donation System** | ✅ Complete | Email-based creation with auto donor linking |
| **Campaign Tracking** | ✅ Complete | Analytics with donor lists and totals |
| **Segmentation** | ✅ Complete | Dynamic member counting with real-time updates |
| **AI Chatbot** | ✅ Complete | GPT-4o Mini integration with audit logging |
| **AI Policy** | ✅ Complete | Responsible AI documentation (bias, ethics, security, privacy) |

## 🛠 Development Workflow

### Essential Commands

```bash
# 🚀 Development
pnpm dev                         # Start dev server (http://localhost:3000)
pnpm build                       # Build for production
pnpm start                       # Start production server
pnpm lint                        # Run ESLint

# 🗄️ Database Operations  
npx prisma generate              # Generate client after schema changes
npx prisma migrate dev           # Create and apply new migrations
npx prisma studio                # Visual database browser (GUI)
npx prisma db seed               # Reload test data (resets database)

# 🧪 Testing
pnpm test                        # Run unit tests with Vitest
pnpm test:watch                  # Run tests in watch mode
pnpm test:ui                     # Open Vitest UI interface
pnpm test:e2e                    # Run Playwright E2E tests
```

### Development Tips

#### 🔄 Working with Database Changes
```bash
# After modifying schema.prisma:
npx prisma generate              # Updates TypeScript types
npx prisma migrate dev --name descriptive_name  # Creates migration

# To reset development database:
npx prisma migrate reset         # ⚠️  Destroys all data
npx prisma db seed               # Reload sample data
```

#### 🐛 Debugging & Troubleshooting
```bash
# View database in browser
npx prisma studio

# Reset everything if stuck
rm -rf node_modules pnpm-lock.yaml
pnpm install
npx prisma generate
npx prisma migrate reset

# Check what's running on port 3000
lsof -i :3000
```

#### 📊 Exploring Seed Data
The seed script creates realistic nonprofit data:
- **Organizations**: Hope Foundation, Green Earth Alliance  
- **Users**: 10 staff members with different roles
- **Donors**: 75 donors with varied giving patterns
- **Donations**: 200+ donations across multiple campaigns
- **Campaigns**: Annual fund, emergency response, major gifts
- **Segments**: First-time, loyal, lapsed, major gift prospects
- **Workflows**: Welcome series, retention campaigns

### Testing Setup & Strategy

```bash
# 🧪 Unit & Integration Tests (Vitest)
pnpm test                        # Run all tests once
pnpm test:watch                  # Watch mode for active development
pnpm test:ui                     # Visual test runner interface

# 🎭 End-to-End Tests (Playwright)  
npx playwright install          # Install browsers (one-time setup)
pnpm test:e2e                    # Run full user workflow tests
npx playwright test --ui         # Interactive test runner
```

#### Testing Architecture
- **Unit Tests**: Individual functions and utilities
- **Component Tests**: React components in isolation  
- **Integration Tests**: API routes and database operations
- **E2E Tests**: Complete user workflows (login → create donor → record donation)
- **MSW Mocking**: Mock external APIs for consistent testing

> **💡 Pro Tip**: Use test-driven development (TDD) - write tests first, then implement the feature!

## 📊 Domain Model & Business Logic

### 🏢 Core Entities

#### **Multi-Tenant Architecture**
```javascript
Organization  // Tenant boundary (Hope Foundation, Green Earth Alliance)
├── Users[]        // Staff members (admin, manager, user roles)
├── Donors[]       // Donor profiles with retention metrics  
├── Campaigns[]    // Fundraising campaigns
├── Donations[]    // Individual gifts linked to donors/campaigns
├── Segments[]     // Dynamic donor groupings based on rules
└── Workflows[]    // Automated engagement sequences
```

#### **Key Relationships**
- Every entity includes `organizationId` for data isolation
- Donors → Donations (one-to-many with calculated totals)
- Campaigns → Donations (track campaign performance)  
- Segments ↔ Donors (many-to-many via SegmentMember)
- Workflows → Tasks (automation creates follow-up tasks)

#### **Calculated Fields** 
Donors have auto-calculated metrics updated on each donation:
- `totalAmount` - Lifetime giving total
- `totalGifts` - Number of donations made
- `firstGiftDate` - Date of first donation  
- `lastGiftDate` - Date of most recent gift
- `averageGiftAmount` - Mean donation size
- `retentionRisk` - LOW/MEDIUM/HIGH based on giving patterns

### 🎯 Business Rules to Implement

#### **Retention Risk Calculation**
```javascript
// TODO: Implement in src/lib/api/donors.js
function calculateRetentionRisk(donor) {
  // First-time donors = HIGH risk
  // 2+ gifts, recent activity = LOW risk  
  // 2+ gifts, no activity 12+ months = HIGH risk
  // 1 gift, 6-12 months ago = MEDIUM risk
}
```

#### **Segmentation Logic**
```javascript
// TODO: Implement in src/lib/api/segments.js  
const segmentCriteria = {
  donorStatus: ['ACTIVE', 'LAPSED'],           // Filter by status
  retentionRisk: ['HIGH'],                     // Target high-risk donors
  lastGiftDateRange: { after: '2023-01-01' }, // Recent activity
  totalAmountRange: { min: 100, max: 1000 },  // Gift size range
  campaignParticipation: ['annual-fund-2024'] // Specific campaign
}
```

## 💾 Sample Data Overview

The seed script creates realistic nonprofit data for development and testing:

### 📈 **Organizations**
- **Hope Foundation** - Primary demo organization with 75 donors and $145K+ raised
- **Green Earth Alliance** - Environmental nonprofit with additional test data

### 👥 **Donor Distribution** (75 total donors)
- **40%** First-time donors (HIGH risk) - Need welcome series
- **30%** Two-gift donors (MODERATE risk) - Need retention campaign  
- **20%** Loyal donors (LOW risk) - Need upgrade cultivation
- **10%** Lapsed donors (CRITICAL risk) - Need reactivation outreach

### 💰 **Donation Patterns** (200+ donations)
Gift size distribution mirrors real nonprofits:
- **$10-50**: Online/monthly donors (65%)
- **$51-250**: Event/mail donors (25%)  
- **$251-1000**: Major gift prospects (8%)
- **$1000+**: Major donors (2%)

### 📊 **Campaign Performance**
- **Annual Fund 2025** - $67,500+ raised (active)
- **Emergency Response** - $23,400 raised (completed)  
- **Holiday Campaign** - $18,900 raised (completed)
- **Major Gifts Initiative** - $35,200 raised (active)

### 🎯 **Pre-built Segments**
- **First-Time Donors** - Welcome series candidates (30 members)
- **High-Risk Retention** - Donors needing engagement (30 members)
- **Major Donors** - $1000+ lifetime giving
- **Lapsed Donors** - 12+ months without giving

> **💡 Tip**: Use `npx prisma studio` to explore all data visually!
- **Lapsed Donors**: Reactivation targets  
- **Major Gift Prospects**: High-capacity individuals
- **Monthly Sustainers**: Recurring gift donors
- **Event Participants**: Engagement-based segment

> **💡 Development Tip**: Use `npx prisma studio` to explore this data visually while building features!

## 🏗 Technology Stack

### **Core Framework**
- **Next.js 16.0.10** (App Router) - React meta-framework with file-based routing
- **React 19.2.3** - UI library with modern hooks and server components
- **JavaScript** (no TypeScript) - Rapid development for MVP delivery

### **Database & ORM**
- **PostgreSQL** (Neon.tech) - Production cloud database with SSL
- **Prisma 7.1.0** - Type-safe ORM with migrations and client generation
- **@prisma/adapter-pg** - Neon PostgreSQL adapter for serverless deployment

### **AI Integration**
- **OpenAI GPT-4o Mini** - Intelligent chatbot assistant
- **openai** npm package - Official OpenAI SDK
- **Environment-based config** - Secure API key management

### **UI & Styling**
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **shadcn/ui** - Copy-paste React components built on Radix UI
- **Lucide React 0.561.0** - Beautiful, customizable icons

### **Forms & Validation**
- **React Hook Form 7.68.0** - Performant forms with minimal re-renders
- **Zod 4.2.0** - Runtime schema validation
- **@hookform/resolvers** - Integration layer for form validation

### **Authentication & Security**
- **bcryptjs** - Password hashing with salt rounds
- **HTTP-only cookies** - Secure session storage
- **Database sessions** - Server-side session management with audit trails

### **Development Tools**
- **pnpm 10.18.1** - Fast, space-efficient package manager  
- **Prisma Studio** - Visual database browser
- **Hot reloading** - Instant feedback during development
- **ESLint** - Code quality and consistency

### **Architecture Decisions**

#### Why JavaScript (Not TypeScript)?
- **Faster MVP development** and iteration
- **Lower learning curve** for rapid prototyping  
- **JavaScript + Zod** provides runtime validation
- **Production-ready** without type compilation overhead

#### Why Session-Based Auth?
- **More secure** with HTTP-only cookies vs. localStorage JWT
- **Server-side control** over session lifecycle
- **Better for MVP** - simpler to implement and debug
- **Audit trail** - all sessions tracked in database

#### Why Prisma 7?
- **Excellent developer experience** with IntelliSense
- **Built-in migrations** for database version control
- **Custom output directory** (prisma/generated/) for clean architecture
- **PostgreSQL adapter** for Neon serverless compatibility

#### Why GPT-4o Mini?
- **Cost-effective** AI solution for chatbots
- **Fast responses** with low latency
- **Sufficient capability** for platform assistance
- **OpenAI reliability** and uptime

## 🤖 AI Integration & Responsible Use

### AI-Powered Features

**Intelligent Chatbot Assistant**
- Powered by **OpenAI GPT-4o Mini** for natural language understanding
- Provides context-aware guidance about platform features
- Answers questions about donors, donations, campaigns, and workflows
- Available to all authenticated users

**Form Field Helpers** (Planned)
- AI-assisted guidance for completing donor and donation forms
- Context-aware suggestions based on field types

### Responsible AI Practices

We consider **bias, ethics, security, and data privacy** when building AI systems:

**🎯 Bias Mitigation**
- Regular audits of AI outputs for fairness
- Diverse team reviews of AI recommendations
- Fair treatment across all donor demographics

**⚖️ Ethical Design**
- Human-in-the-loop: AI provides recommendations, staff make decisions
- Transparent AI usage documented in AI Policy page
- Clear boundaries on AI capabilities

**🔒 Security**
- API keys stored in environment variables (never client-side)
- All AI API calls encrypted in transit (HTTPS)
- Audit logging for all AI interactions with timestamps and user context

**🛡️ Data Privacy**
- Data minimization: only necessary information sent to AI
- No PII transmitted without explicit organizational consent
- User data never used to train external AI models

View our complete [AI Policy](/ai-policy) for detailed information.

## � Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Database URL for Prisma 7 with Neon PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require&channel_binding=require"

# OpenAI API Key for Chatbot
OPENAI_API_KEY="sk-proj-your-openai-api-key-here"

# Application URLs (optional)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Security Notes
- Never commit `.env` file to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Enable Neon SSL for production database connections

## 📖 Additional Resources

### **Project Documentation**
- **[AI Policy Page](/ai-policy)** - Responsible AI usage documentation
- **[Evidence Page](/evidence)** - Project rubric evidence
- **[Reflection Page](/reflection)** - Development insights and lessons learned

### **External Resources**
- **[Next.js 16 Documentation](https://nextjs.org/docs)** - Framework fundamentals
- **[Prisma Documentation](https://www.prisma.io/docs)** - Database ORM guide
- **[OpenAI API Reference](https://platform.openai.com/docs)** - AI integration guide
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first styling

## 📄 License

This project is released under the **ISC License** for educational and nonprofit use.

---

## 🙏 Acknowledgments

Built with modern web technologies to help nonprofits improve donor retention and build lasting relationships with supporters.
