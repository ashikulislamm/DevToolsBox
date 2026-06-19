export const MARKDOWN_TEMPLATES = {
  blog: `# Sample Blog Post

Welcome to my **awesome** blog post! Here's what you'll learn:

## Key Topics

- Getting started with Markdown
- Best practices for writing
- Tips and tricks

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> "The best way to learn is by doing!" - Someone wise

Happy coding! 🚀`,

  readme: `# Project README

Brief description of your amazing project.

## Installation

\`\`\`bash
npm install your-project
\`\`\`

## Usage

\`\`\`javascript
import YourProject from 'your-project';

const project = new YourProject();
project.start();
\`\`\`

## Features

- ✅ Feature 1
- ✅ Feature 2
- 🔄 Feature 3 (coming soon)

## Contributing

Pull requests are welcome!

## License

MIT © Your Name`,

  notes: (date) => `# Quick Notes

## Today's Tasks

- [ ] Review documentation
- [x] Fix bug #123
- [ ] Update dependencies
- [x] Write tests

## Important Links

- [Documentation](https://example.com/docs)
- [GitHub Repo](https://github.com/user/repo)

## Code Snippet

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

---

*Last updated: ${date}*`,

  apiDocs: `# API Documentation

## Overview
This API provides endpoints for managing user data and authentication.

## Authentication
All requests require an API key in the header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /api/users
Get all users

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
\`\`\`

### POST /api/users
Create a new user

**Request Body:**
\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

## Error Codes
| Code | Description |
|------|-------------|
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Server Error |`,

  meetingNotes: (date) => `# Meeting Notes - ${date}

## Attendees
- John Smith (Project Manager)
- Sarah Johnson (Developer)
- Mike Chen (Designer)

## Agenda
1. Project status update
2. Upcoming deadlines
3. Resource allocation
4. Next steps

## Discussion Points

### Project Status
- ✅ Phase 1 completed on schedule
- 🟡 Phase 2 in progress (75% complete)
- 🔴 Phase 3 delayed due to resource constraints

### Action Items
| Task | Assignee | Due Date | Status |
|------|----------|----------|--------|
| Update user interface | Mike | Oct 15 | In Progress |
| Fix login bug | Sarah | Oct 12 | Not Started |
| Review requirements | John | Oct 10 | Complete |

## Decisions Made
1. Extend Phase 2 deadline by 1 week
2. Hire additional developer for Phase 3
3. Schedule weekly check-ins

## Next Meeting
**Date:** October 16, 2025  
**Time:** 2:00 PM  
**Location:** Conference Room B`,

  tutorial: `# Tutorial: Getting Started with React

## Prerequisites
- Node.js (v14 or higher)
- Basic JavaScript knowledge
- Text editor (VS Code recommended)

## Step 1: Setup
First, create a new React application:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Step 2: Understanding Components
React is built around components. Here's a basic component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Step 3: State Management
Use the \`useState\` hook to manage component state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Key Concepts
- **JSX**: JavaScript XML syntax
- **Props**: Data passed to components
- **State**: Component's internal data
- **Hooks**: Functions that let you use React features

## Next Steps
1. Learn about useEffect hook
2. Explore React Router for navigation
3. Practice building small projects
4. Join the React community

> **Tip:** Practice regularly and build real projects to solidify your understanding!`,

  changelog: (date) => `# Project Changelog

## [2.1.0] - ${date}

### Added ✨
- New user dashboard with analytics
- Dark mode support
- Email notification system
- Export data to CSV functionality

### Changed 🔄
- Updated user interface design
- Improved loading performance by 40%
- Enhanced mobile responsiveness
- Streamlined onboarding process

### Fixed 🐛
- Fixed login redirect issue
- Resolved memory leak in data processing
- Corrected timezone display problems
- Fixed broken links in documentation

### Security 🔒
- Updated all dependencies to latest versions
- Implemented rate limiting for API endpoints
- Added input validation for all forms
- Enhanced password encryption

---

## [2.0.0] - 2024-09-15

### Added ✨
- Complete redesign of user interface
- REST API for third-party integrations
- Multi-language support (EN, ES, FR)
- Advanced search and filtering

### Breaking Changes ⚠️
- API endpoints have changed (see migration guide)
- Minimum Node.js version is now 16
- Database schema updates required

### Deprecated 📋
- Old API v1 endpoints (will be removed in v3.0)
- Legacy authentication method

---

## [1.5.2] - 2024-08-01

### Fixed 🐛
- Critical security vulnerability in authentication
- Performance issues with large datasets
- Browser compatibility problems

## Migration Guide
For upgrading from v1.x to v2.x, please see our [migration guide](docs/migration.md).`,

  prd: (date) => `# Product Requirements Document

## Product Overview
**Product Name:** DevToolsBox  
**Version:** 3.0  
**Date:** ${date}  
**Owner:** Product Team

## Executive Summary
Brief description of the product and its main purpose.

## Goals & Objectives
### Primary Goals
1. Increase user engagement by 50%
2. Reduce customer support tickets by 30%
3. Improve user onboarding completion rate

### Success Metrics
- Monthly Active Users (MAU)
- User Retention Rate
- Customer Satisfaction Score (CSAT)

## User Stories

### Epic 1: User Authentication
**As a** new user  
**I want to** easily create an account  
**So that** I can access the platform features

#### Acceptance Criteria
- [ ] User can register with email and password
- [ ] Email verification is required
- [ ] Password meets security requirements
- [ ] Social login options available

### Epic 2: Dashboard
**As a** logged-in user  
**I want to** see a personalized dashboard  
**So that** I can quickly access relevant information

#### Acceptance Criteria
- [ ] Dashboard loads within 2 seconds
- [ ] Shows relevant widgets based on user role
- [ ] Customizable layout options
- [ ] Mobile-responsive design

## Technical Requirements
### Performance
- Page load time < 3 seconds
- 99.9% uptime
- Support for 10,000 concurrent users

### Security
- HTTPS encryption
- Data encryption at rest
- Regular security audits
- GDPR compliance

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Timeline
| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | 4 weeks | User authentication |
| Phase 2 | 6 weeks | Core dashboard |
| Phase 3 | 4 weeks | Testing & optimization |

## Dependencies
- Design team mockups
- API development completion
- Third-party service integrations

## Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Delayed API development | High | Start with mock data |
| Resource constraints | Medium | Prioritize core features |
| Browser compatibility | Low | Regular testing |`,

  weeklyReport: (date, nextDate) => `# Weekly Report - Week of ${date}

## Executive Summary
This week focused on completing Phase 2 deliverables and preparing for the upcoming product launch. Overall progress is on track with minor adjustments to timeline.

## Key Accomplishments ✅

### Development Team
- ✅ Completed user authentication system
- ✅ Implemented dashboard UI components
- ✅ Fixed 12 critical bugs
- ✅ Added unit tests (coverage: 85%)

### Design Team
- ✅ Finalized mobile app wireframes
- ✅ Created brand style guide
- ✅ Conducted 5 user interviews
- ✅ Updated design system components

### Marketing Team
- ✅ Launched social media campaign
- ✅ Created product demo video
- ✅ Updated website content
- ✅ Scheduled 3 customer interviews

## Metrics & KPIs 📊

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Active Users | 1,250 | 1,180 | +5.9% |
| Bug Reports | 8 | 15 | -46.7% |
| Feature Requests | 23 | 19 | +21.1% |
| Customer Satisfaction | 4.2/5 | 4.0/5 | +5% |

## Challenges & Blockers 🚨

### Technical Issues
- **Database Performance**: Query optimization needed for large datasets
- **Mobile Compatibility**: iOS Safari rendering issues identified
- **Third-party Integration**: API rate limits causing delays

### Resource Constraints
- Need additional QA engineer for testing phase
- Design review bottleneck due to team availability

## Upcoming Priorities (Next Week) 🎯

### High Priority
1. Resolve database performance issues
2. Complete mobile app testing
3. Finalize product launch checklist
4. Conduct stakeholder review meeting

### Medium Priority
- Update documentation
- Prepare marketing materials
- Schedule customer onboarding sessions
- Review and update project timeline

## Budget & Resource Update 💰
- **Budget Utilized**: 78% of quarterly allocation
- **Team Capacity**: Running at 95% utilization
- **Additional Resources Needed**: 1 QA Engineer, 0.5 Designer

## Risk Assessment ⚠️

| Risk | Probability | Impact | Mitigation Plan |
|------|-----------------|------------|---------------------|
| Launch Delay | Medium | High | Add weekend sprint |
| Resource Shortage | High | Medium | Hire contractor |
| Performance Issues | Low | High | Optimize queries |

## Action Items for Next Week 📝
- [ ] John: Fix database performance (Due: Oct 12)
- [ ] Sarah: Complete mobile testing (Due: Oct 14)
- [ ] Mike: Finalize launch materials (Due: Oct 13)
- [ ] Team: Stakeholder meeting prep (Due: Oct 11)

---

**Report prepared by:** Project Manager  
**Next report due:** ${nextDate}`,

  codeReview: (date) => `# Code Review Checklist

## Pre-Review Setup ✅
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No merge conflicts
- [ ] Branch is up to date with main
- [ ] Self-review completed

## Code Quality 🔍

### Structure & Organization
- [ ] Code is well-organized and readable
- [ ] Functions are appropriately sized (< 50 lines)
- [ ] Classes have single responsibility
- [ ] Naming conventions are followed
- [ ] No duplicate code (DRY principle)

### Performance & Efficiency
- [ ] No obvious performance issues
- [ ] Database queries are optimized
- [ ] Memory usage is reasonable
- [ ] No infinite loops or recursion issues
- [ ] Appropriate data structures used

### Security & Safety
- [ ] Input validation implemented
- [ ] No hardcoded credentials
- [ ] Proper error handling
- [ ] SQL injection prevention
- [ ] XSS protection in place

## Testing 🧪
- [ ] Unit tests cover new functionality
- [ ] Integration tests updated
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Test coverage meets requirements (>80%)

## Documentation 📚
- [ ] Code is well-commented
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Changelog entries added
- [ ] Migration scripts documented

## Deployment Readiness 🚀
- [ ] Environment variables documented
- [ ] Database migrations tested
- [ ] Rollback plan exists
- [ ] Feature flags configured
- [ ] Monitoring/logging added

## Final Checklist ✅
- [ ] PR description is clear and complete
- [ ] Screenshots/GIFs added for UI changes
- [ ] Breaking changes highlighted
- [ ] Reviewers assigned
- [ ] Labels applied

---

**Reviewer:** [Name]  
**Review Date:** ${date}  
**Status:** [ ] Approved [ ] Needs Changes [ ] Rejected`,

  proposal: (date) => `# Project Proposal

## Project Title
**DevToolsBox Enhancement Initiative**

## Executive Summary
Brief overview of the proposed project, its objectives, and expected outcomes. This project aims to enhance the existing DevToolsBox platform with new features and improved user experience.

## Problem Statement
### Current Challenges
- Limited user engagement with existing tools
- Outdated user interface design
- Performance issues with large datasets
- Lack of mobile optimization

### Impact of Problems
- 23% decrease in monthly active users
- Increased customer support tickets
- Lower user satisfaction scores
- Competitive disadvantage

## Proposed Solution
### Overview
Implement a comprehensive upgrade to DevToolsBox including:
- Modern, responsive UI/UX design
- Performance optimization
- Mobile-first approach
- New productivity tools

### Key Features
1. **Enhanced Dashboard**
   - Customizable widgets
   - Real-time analytics
   - Drag-and-drop interface

2. **Mobile Application**
   - Native iOS and Android apps
   - Offline functionality
   - Push notifications

3. **Performance Improvements**
   - Database optimization
   - Caching implementation
   - CDN integration

4. **New Tools**
   - AI-powered code analyzer
   - Collaborative workspace
   - Advanced reporting

## Project Scope
### In Scope
- Frontend redesign and development
- Backend performance optimization
- Mobile app development
- User testing and feedback integration

### Out of Scope
- Third-party integrations (Phase 2)
- Advanced AI features (Future release)
- Enterprise SSO (Separate project)

## Timeline & Milestones

| Phase | Duration | Key Deliverables | Budget |
|-------|----------|------------------|--------|
| Phase 1: Planning | 2 weeks | Requirements, Design mockups | $15K |
| Phase 2: Development | 12 weeks | Core features, Backend APIs | $120K |
| Phase 3: Testing | 4 weeks | QA, User testing, Bug fixes | $30K |
| Phase 4: Launch | 2 weeks | Deployment, Documentation | $10K |

**Total Duration:** 20 weeks  
**Total Budget:** $175,000

## Resource Requirements

### Team Structure
- **Project Manager** (1 FTE)
- **Frontend Developers** (2 FTE)
- **Backend Developers** (2 FTE)
- **Mobile Developer** (1 FTE)
- **UI/UX Designer** (1 FTE)
- **QA Engineer** (1 FTE)

### Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL
- **Mobile:** React Native
- **Infrastructure:** AWS, Docker, GitHub Actions

## Expected Outcomes

### Business Benefits
- 40% increase in user engagement
- 50% reduction in support tickets
- 25% improvement in user satisfaction
- Competitive advantage in market

### Technical Benefits
- 60% faster page load times
- 99.9% uptime reliability
- Scalable architecture
- Modern development practices

## Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| Scope Creep | Medium | High | Clear requirements, change control |
| Resource Availability | High | Medium | Cross-training, backup resources |
| Technical Challenges | Medium | High | Proof of concepts, expert consultation |
| Budget Overrun | Low | High | Regular monitoring, contingency fund |

## Success Metrics
- User engagement rate increase by 40%
- Page load time improvement by 60%
- Customer satisfaction score > 4.5/5
- Zero critical bugs in production
- Project delivered on time and within budget

## Next Steps
1. **Stakeholder Review** - Present proposal to executive team
2. **Budget Approval** - Secure funding approval
3. **Team Assembly** - Recruit and onboard team members
4. **Project Kickoff** - Initialize project planning phase

---

**Prepared by:** [Your Name]  
**Date:** ${date}  
**Status:** Draft | Under Review | Approved`,

  techSpec: (date, nextReviewDate) => `# Technical Specification

## Document Information
**Title:** User Authentication System  
**Version:** 1.0  
**Date:** ${date}  
**Author:** Development Team  
**Status:** Draft

## Overview
This document outlines the technical specifications for implementing a secure user authentication system with support for multiple authentication methods.

## Requirements

### Functional Requirements
1. **User Registration**
   - Email/password registration
   - Email verification required
   - Password strength validation
   - Duplicate email prevention

2. **User Login**
   - Email/password authentication
   - OAuth integration (Google, GitHub)
   - Remember me functionality
   - Account lockout after failed attempts

3. **Password Management**
   - Password reset via email
   - Password change for logged-in users
   - Password history tracking
   - Strong password enforcement

### Non-Functional Requirements
- **Performance:** Login response time < 500ms
- **Security:** OWASP compliance
- **Scalability:** Support 100,000 concurrent users
- **Availability:** 99.9% uptime

## System Architecture

### High-Level Architecture
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │────│   Gateway   │────│   Auth API  │
│ (React App) │    │   (Nginx)   │    │  (Node.js)  │
└─────────────┘    └─────────────┘    └─────────────┘
                                             │
                   ┌─────────────┐    ┌─────────────┐
                   │   Redis     │    │ PostgreSQL  │
                   │  (Sessions) │    │ (User Data) │
                   └─────────────┘    └─────────────┘
\`\`\`

### Component Design

#### Authentication Service
\`\`\`javascript
class AuthService {
  async register(userData) {
    // Registration logic
  }
  
  async login(credentials) {
    // Login logic
  }
  
  async resetPassword(email) {
    // Password reset logic
  }
}
\`\`\`

#### User Model
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## API Specification

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "userId": "uuid-here"
}
\`\`\`

#### POST /api/auth/login
Authenticate user credentials.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-here",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
\`\`\`

## Security Considerations

### Password Security
- **Hashing:** bcrypt with salt rounds = 12
- **Requirements:** Minimum 8 characters, uppercase, lowercase, number, special character
- **Storage:** Never store plain text passwords

### Token Security
- **JWT:** Access tokens expire in 15 minutes
- **Refresh Tokens:** Expire in 7 days, stored in secure HTTP-only cookies
- **Secret Rotation:** JWT secrets rotated monthly

### Rate Limiting
- **Login Attempts:** Max 5 attempts per IP per 15 minutes
- **Registration:** Max 3 registrations per IP per hour
- **Password Reset:** Max 5 requests per email per hour

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
\`\`\`

### Sessions Table
\`\`\`sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  refresh_token_hash VARCHAR(255) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
\`\`\`

## Testing Strategy

### Unit Tests
- Authentication service methods
- Password hashing/validation
- Token generation/validation
- Input validation functions

### Integration Tests
- API endpoint functionality
- Database operations
- External OAuth integration
- Email service integration

### Security Tests
- SQL injection attempts
- XSS prevention
- CSRF protection
- Rate limiting effectiveness

## Deployment Configuration

### Environment Variables
\`\`\`bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/authdb

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
\`\`\`

### Monitoring
- **Metrics:** Login success/failure rates
- **Logging:** All authentication events
- **Alerts:** Multiple failed attempts, system errors
- **Health Checks:** Database connectivity, external services

---

**Document Status:** Ready for Review  
**Next Review Date:** ${nextReviewDate}`
};
