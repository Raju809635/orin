# Orin - Mentorship Platform Documentation

Welcome to the Orin application! This document provides a comprehensive overview of how the web application works, detailing the architecture and user flows for both students and mentors.

## Core Concepts

Orin is a marketplace designed to connect students with expert mentors. The platform supports two primary user roles:

1.  **Student:** A user looking for guidance and mentorship. This is the **default role** for all new users.
2.  **Mentor:** An expert who has been approved to offer mentorship services on the platform.

---

## Student Experience

A **student** is any user who has signed up on the platform. This is the primary user journey for someone seeking mentorship.

### Accessible Pages & What They See:

- **`/` (Sign Up):** The landing page for new users to create an account.
- **`/signin`:** The page to log into an existing account.
- **`/create-student-profile`:** After signing up, new users are directed here to enter their name and academic goals. This is a mandatory step for all new users.
- **`/home`:** The main marketing and welcome page for authenticated users.
- **`/dashboard` ("Your Dashboard"):** This is the student's central hub.
    - They see their name and a welcome message.
    - A list of "Featured Mentors" is displayed for them to explore.
    - "My Sessions" section shows their upcoming and past mentorship sessions.
- **`/mentors`:** The main directory where students can find mentors.
    - They see a grid of all available mentors.
    - They can use a sidebar with filters (Category, Price, Rating, etc.) to narrow down their search.
- **`/mentors/[mentorId]`:** A detailed profile page for a specific mentor.
    - Students can view the mentor's photo, name, professional role, company, biography, and expertise.
    - They can see a calendar to check the mentor's availability and book a session.
- **`/categories`:** An alternative way to discover mentors, grouped by subject area (e.g., School, Law, Government Exams).
- **`/become-a-mentor`:** The page where a student can apply to become a mentor. They see a form to submit their qualifications and experience.
- **`/profile`:** The page where a student can update their personal information, such as their display name and profile picture.
- **Static Pages:** Students can access all informational pages like `/about`, `/contact`, `/blog`, `/privacy`, `/security`, and `/terms`.

### Navigation (Header):
- For a student, the main button in the header is **"Dashboard,"** which links to `/dashboard`.
- The user settings dropdown menu provides a link to their **"Profile"**.

---

## Mentor Experience

A **mentor** is a user who has completed the "Become a Mentor" application and has been approved. Mentors can also use the platform as students.

### Accessible Pages & What They See:

- **All Student Pages:** A mentor has access to every page a student can see. They can browse and book other mentors, view their own student dashboard, etc.
- **`/mentor-dashboard`:** This is the control center exclusive to mentors.
    - They see a welcome message tailored to them.
    - A list of "My Students" is displayed.
    - They can view their upcoming and past sessions from the perspective of a mentor.
- **`/become-a-mentor`:** If a user who is already a mentor visits this page, they do not see the application form. Instead, they see a status message: **"You're Already a Mentor,"** with a button to go directly to their Mentor Dashboard.
- **`/signin`:** This page is intelligent. If a logged-in mentor visits this URL, they are immediately shown a screen to choose between "Go to Your Dashboard" (the student view) and "Go to Mentor Dashboard."
- **`/profile`:** Like students, mentors can edit their display name and profile picture here. These changes are reflected on their public mentor card and profile page.
- **Public Visibility:** As soon as a user becomes a mentor, their profile is automatically published and visible to all students on the `/mentors` page.

### Navigation (Header):
- The header is different for mentors. The user settings dropdown menu contains two distinct options:
    1.  **"Your Dashboard"**: Links to `/dashboard` (their student view).
    2.  **"Mentor Dashboard"**: Links to `/mentor-dashboard`.
- This allows them to easily switch between their two roles at any time, from any page.

---

## Technical Stack

- **Framework:** Next.js (App Router)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication (Email/Password, Google)
- **UI Components:** ShadCN
- **Styling:** Tailwind CSS
- **Themeing:** `next-themes` for Dark Mode support.
