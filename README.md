# Orin - Mentorship Platform Documentation

Welcome to the Orin application! This document provides a comprehensive overview of how the web application works, detailing the architecture and user flows for both students and mentors.

## Core Concepts

Orin is a marketplace designed to connect students with expert mentors. The platform supports two primary user roles:

1.  **Student:** A user looking for guidance and mentorship. This is the default role for all new users.
2.  **Mentor:** An expert who has been approved to offer mentorship services on the platform.

---

## Student User Flow

This is the primary journey for a user seeking mentorship.

### 1. Sign Up & Profile Creation
- **Sign Up:** A new user can create an account using their email/password or by signing in with Google. All new accounts default to the **student** role.
- **Create Profile:** After signing up, the user is immediately redirected to the `/create-student-profile` page to enter their name and academic goals. This step is crucial for personalizing their experience.
- **Dashboard:** Upon completing their profile, they are taken to their personal **Student Dashboard**.

### 2. Finding a Mentor
- **Browse Mentors:** Students can visit the `/mentors` page to see a list of all available mentors on the platform. This list is dynamically loaded from the Firestore database.
- **Filter & Search:** The "Browse Mentors" page includes a sidebar with filters for category, price, rating, and experience, allowing students to narrow down their search.
- **Categories Page:** Students can also explore mentors through the `/categories` page, which groups experts by subject area (e.g., School, Law, Government Exams).

### 3. Booking a Session
- **Mentor Profile:** Clicking on a mentor's card leads to their detailed profile page (`/mentors/[mentorId]`). Here, students can learn more about the mentor's expertise, experience, and see their availability.
- **Booking:** The profile page includes a calendar and time slots. A student can select a date and time and click "Book Session" to schedule a mentorship session. *(Note: The final booking and payment logic is a future implementation)*.

### 4. The Student Dashboard
The Student Dashboard (`/dashboard`) is the central hub for students. It contains:
- **Featured Mentors:** Recommendations for mentors.
- **My Sessions:** Lists of upcoming and past mentorship sessions.

---

## Mentor User Flow

This flow is for experts who want to offer their services on the platform.

### 1. Applying to Become a Mentor
- **Initial Sign-Up:** A potential mentor first signs up as a regular user, which assigns them the "student" role by default.
- **Application:** They navigate to the `/become-a-mentor` page and submit an application form.
- **Automatic Approval:** In the current implementation, the application is **automatically approved**. The user's role in the database is immediately updated from "student" to **mentor**.

### 2. Post-Approval Experience
- **Immediate Redirection:** Once the application is submitted, the user is redirected to the `/signin` page, which intelligently handles their new role.
- **Dashboard Selection:** The sign-in page recognizes their "mentor" role and presents them with two choices: "Go to Your Dashboard" (Student View) or "Go to Mentor Dashboard." This allows mentors to also use the platform as students if they wish.

### 3. Managing the Mentor Profile
- **Visibility:** As soon as a user's role is updated to "mentor", their profile automatically appears on the public `/mentors` listing page for all students to see.
- **Profile Updates:** Mentors can update their display name and profile picture from the `/profile` page. This information is reflected on their public mentor card and profile page.

### 4. The Mentor Dashboard
The Mentor Dashboard (`/mentor-dashboard`) is the control center for mentors.
- It displays a list of their students and upcoming sessions.
- From the header, mentors have a dedicated dropdown menu that allows them to easily switch between their **Mentor Dashboard** and their **Student Dashboard**.

---

## Key Pages & Features

- **`/` (Sign Up):** The default landing page for new, unauthenticated users.
- **`/signin`:** The sign-in page. It also acts as a router for logged-in mentors, directing them to the dashboard selection screen.
- **`/home`:** The main landing page for authenticated users.
- **`/mentors`:** The main directory where students can find and filter mentors.
- **`/mentors/[mentorId]`:** The detailed public profile page for a single mentor.
- **`/dashboard`:** The personalized dashboard for **students**.
- **`/mentor-dashboard`:** The personalized dashboard for **mentors**.
- **`/profile`:** The page where any logged-in user (student or mentor) can edit their personal profile information.
- **`/become-a-mentor`:** The application page for students who wish to become mentors. It intelligently shows a status page to users who are already mentors.

## Technical Stack

- **Framework:** Next.js (App Router)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication (Email/Password, Google)
- **UI Components:** ShadCN
- **Styling:** Tailwind CSS
- **Themeing:** `next-themes` for Dark Mode support.
