# 🌐 CivicPulse - Citizen Action & Social Development Events Platform

A modern, responsive, and community-driven event management platform where citizens can discover, organize, join, and track social service and humanitarian drives across neighborhoods.

---

## 🔗 Live Application & Repositories
- **Live Website URL:** [https://social-development-events-client.vercel.app](https://social-development-events-client.vercel.app)
- **Client Side Repository:** [https://github.com/Developer-Ashraf/social-development-events-client](https://github.com/Developer-Ashraf/social-development-events-client)
- **Server Side Repository:** [https://github.com/Developer-Ashraf/social-development-events-server](https://github.com/Developer-Ashraf/social-development-events-server)

---

## 🌟 Key Highlights & Core Features
1. **Dynamic Upcoming-Only Discovery:** Smart date filtering automatically excludes past events, ensuring users only see actionable, upcoming initiatives (e.g., winter clothing drives, blanket distribution, lake cleanups, blood drives, and tree plantations).
2. **Interactive Community Drive Management:** Registered citizens can create new events with strict future-date validation, edit event details through a streamlined modal, and manage attendance records.
3. **One-Click Volunteer Participation & Tracking:** Volunteers can seamlessly sign up for community drives with real-time attendee counters, duplicate join prevention, and synchronized "Joined Events" sorted chronologically by event date.
4. **Creator Ownership Security & JWT Protection:** Multi-layer JWT verification ensures that only the event organizer has authority to modify or delete their published initiatives.
5. **Multi-Provider Authentication:** Seamless authentication options including Email/Password with strong password criteria, **Google OAuth 2.0**, and **GitHub OAuth 2.0** with authentic avatar and username resolution.
6. **System-Wide Light / Dark Theme Customization:** Fluid theme toggle integrated across the entire application with accessible color contrasts (Indigo & Slate theme) and zero layout shift.
7. **Full-Spectrum Loading Skeletons & Profile Management:** Built-in shimmer loading states across all routes, Google Calendar integration, and live user profile updates for display name and avatar photo.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
- **Framework:** Next.js 15 (App Router with TypeScript)
- **Styling:** Tailwind CSS v4, Lucide Icons
- **Theme:** `next-themes` (Dark / Light mode)
- **Notifications:** Sonner Toast Notifications
- **Date Utilities:** `date-fns`
- **Authentication:** Custom JWT Context + Google & GitHub OAuth 2.0

### Backend & Database (Server)
- **Server Framework:** Express.js (Node.js) with `nodemon` development watcher
- **Database:** MongoDB Atlas (Native MongoDB Driver v6)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **API Security:** CORS, Custom Auth Middleware

---

## 📁 Page & Route Overview
| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Hero banner, impact statistics, platform capabilities, top 6 recent events (`.limit(6)`), volunteer stories, and newsletter |
| `/events` | Public | Searchable upcoming events catalog with category pills (Donation, Cleanup, Plantation, Winter Relief, Food Drive, etc.) |
| `/events/:id` | Public / Action Protected | Detailed event overview, volunteer guidelines, organizer badge, attendee counter, and Join Event action |
| `/create-event` | Private (Protected) | Event creation form with strict future-date validation and category select |
| `/manage-events` | Private (Protected) | Organizer dashboard to edit (modal) or delete created drives with ownership checks |
| `/joined-events` | Private (Protected) | Chronologically sorted list of all drives joined by the authenticated user |
| `/profile` | Private (Protected) | Volunteer profile view with live name/photoURL updater |
| `/login` & `/register` | Public | Secure authentication with password criteria validation and Google/GitHub OAuth |

---

## 💻 Local Setup & Deployment Instructions

### 1. Clone the Client Repository
```bash
git clone https://github.com/Developer-Ashraf/social-development-events-client.git
cd social-development-events-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# GitHub OAuth 2.0
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run Development Server
```bash
npm run dev
# Application will run on http://localhost:3000
```

---

## 👨‍💻 Developer
Developed with dedication by **Ashraful Islam**  
- **GitHub:** [@Developer-Ashraf](https://github.com/Developer-Ashraf)  
- **Email:** developer.ashraful.wp@gmail.com
