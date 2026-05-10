# Semester Project Report: Presentation Hub
## Web Development Semester Project

---

### **1. Introduction and Motivation**

**Project Title:** Presentation Hub  
**Technology Stack:** Next.js (React Framework), MongoDB Atlas, Node.js environment.

**Motivation:**  
In the academic and professional world, sharing and presenting slide decks often involves cumbersome email attachments, missing USB drives, or broken links. The motivation behind **Presentation Hub** is to streamline the presentation sharing process. By allowing users to upload their presentations to a centralized platform and generate unique, easily shareable access codes, the project eliminates friction. Presenters can securely distribute their materials, and audiences can instantly access them from any device without needing to download heavy files upfront. Furthermore, incorporating an analytics dashboard provides presenters with valuable insights into audience engagement, such as how many times a presentation was viewed or downloaded.

---

### **2. Link to GitHub Repository**

The complete source code for this project is maintained in a public GitHub repository.  
**GitHub Link:** [https://github.com/SikandarHussain6858/Presentation-Hub-Next-js-app](https://github.com/SikandarHussain6858/Presentation-Hub-Next-js-app)

---

### **3. Description of the Website**

**Presentation Hub** is a dynamic, full-stack web application built using Next.js instead of a traditional MERN stack. Next.js provides the benefits of a Single Page Application (SPA) while offering seamless Server-Side Rendering (SSR) and built-in API routing, effectively acting as both the Frontend (React) and Backend (Express-equivalent API routes). 

**Content Organization:**
The application is logically divided into several interconnected sections:
1. **Public/Landing Section:** Introductory pages designed to welcome users, explain the features, and provide authentication gateways.
2. **Authentication System:** Secure registration and login flows utilizing custom JWT tokens and NextAuth integration.
3. **User Dashboard:** The core hub where authenticated users can view their uploaded presentations, generate unique 6-digit access codes, and manage their content.
4. **Analytics Dashboard:** A data-driven section providing visual insights (charts and statistics) on presentation views and downloads over time.
5. **Presentation Viewer:** A dynamic page that retrieves presentation files from the cloud via a unique access code and tracks interaction metrics.

**Dynamic SPA Equivalence:**
While structured around the Next.js App Router, the application behaves as a deeply dynamic Single Page Application. It leverages React hooks (`useState`, `useEffect`), Context API/Custom Hooks (`useAuth`), and dynamic state updates (e.g., live-updating charts and stat cards). The complexity of state management, API data fetching, and component reusability far exceeds the workload of standard multi-page static websites.

---

### **4. Description of the Website Layout**

**Responsive Web Design & Styling:**  
The layout of the website is entirely `<div>`-based and relies heavily on modern CSS principles to achieve a highly responsive design. Although Bootstrap is a popular choice for responsiveness, this project utilizes customized utility classes and CSS variables (similar to Tailwind CSS methodologies) paired with Flexbox and CSS Grid to ensure pixel-perfect rendering across mobile, tablet, and desktop devices. 

- **Structure:** The UI is composed of modular React components (Headers, Footers, Stat Cards, Data Tables). 
- **Theming:** The application utilizes a clean, professional "Light Theme" aesthetic, utilizing a comprehensive CSS variable system for consistent colors (e.g., `var(--slate-800)`, `var(--primary-600)`) and typography.
- **Dynamic Elements:** The UI features CSS keyframe animations (like `fadeInUp`, animated dynamic stickers using `react-icons/fc`) and responsive data visualizations (SVG Line Charts) that adapt gracefully to the viewport size.

---

### **5. Screenshots of the Layout and All Pages**

*(Note: Please insert the actual screenshots of your application below each description before final submission.)*

**1. Landing/Home Page**
*Description:* The main entry point of the website, explaining the value proposition of Presentation Hub.
`[Insert Screenshot Here]`

**2. Login Page**
*Description:* A secure form for returning users to authenticate using their email and password.
`[Insert Screenshot Here]`

**3. Registration (Sign Up) Page**
*Description:* Allows new users to create an account. Includes form validation and error handling.
`[Insert Screenshot Here]`

**4. User Dashboard (Overview)**
*Description:* The control center for the user. Displays a list of all uploaded presentations, their unique codes, and a button to upload new files.
`[Insert Screenshot Here]`

**5. Upload Presentation Modal/Page**
*Description:* A drag-and-drop or file-selection interface allowing users to upload a new presentation and assign it a name and course.
`[Insert Screenshot Here]`

**6. Analytics Dashboard (Overview Tab)**
*Description:* Features dynamic stat cards with animated icons, showcasing total views, downloads, and a custom SVG line chart mapping engagement over time.
`[Insert Screenshot Here]`

**7. Analytics Dashboard (Presentations Tab)**
*Description:* A responsive data table detailing metrics (views, downloads, last accessed date) for individual presentations.
`[Insert Screenshot Here]`

**8. Presentation Viewer / Access Page**
*Description:* The page where an audience member enters a unique code to access the presentation material.
`[Insert Screenshot Here]`

**9. Contact Us Page**
*Description:* A form allowing users to reach out to the platform administrators for support or inquiries.
`[Insert Screenshot Here]`

**10. 404 / Error Pages**
*Description:* Custom error boundaries and "Not Found" pages ensuring a smooth user experience when navigating to invalid routes.
`[Insert Screenshot Here]`

---

### **6. Functional and Non-Functional Requirements**

#### **Functional Requirements**
1. **User Authentication:** Users must be able to securely register, log in, and log out. Sessions must be managed securely using tokens.
2. **File Uploading:** Authenticated users must be able to upload presentation files securely to the platform.
3. **Unique Code Generation:** The system must automatically generate a unique access code for every successfully uploaded presentation.
4. **Presentation Retrieval:** Users (including non-authenticated audience members) must be able to retrieve and view/download a presentation by entering its unique code.
5. **Analytics Tracking:** The system must log an event every time a presentation is viewed or downloaded.
6. **Analytics Dashboard:** The system must display aggregated data (Total Views, Downloads) and a time-series line chart of engagement for the presentation owner.

#### **Non-Functional Requirements**
1. **Responsiveness:** The UI must be fully responsive and usable on devices ranging from small smartphones to large desktop monitors.
2. **Performance:** The application must load quickly, utilizing Next.js optimizations and asynchronous non-blocking API calls.
3. **Security:** User passwords must be hashed (using `bcryptjs`) before being stored in the MongoDB database. API routes must be protected against unauthorized access.
4. **Availability:** By deploying on reliable cloud infrastructure (Vercel) and utilizing MongoDB Atlas, the application should aim for high uptime.
5. **Clean Architecture:** The codebase must adhere to the MVC pattern adaptation for Next.js:
   - **Models:** Mongoose Schemas (e.g., `User.js`, `Presentation.js`, `Analytics.js`).
   - **Views:** React Components (`src/app/` and `src/components/`).
   - **Controllers:** Next.js API Routes (`src/app/api/`).

---

### **7. Deployment Details (Bonus Task)**

To ensure the project is fully functional online, it has been deployed using industry-standard cloud providers:

- **Frontend & Backend API Hosting:** The entire Next.js application (which includes both the React frontend and the backend API routes) is deployed on **Vercel**. Vercel provides seamless integration with Next.js, automatically configuring serverless functions for the API routes and optimizing the frontend build.
- **Database Hosting:** The database is hosted on **MongoDB Atlas** (Free Tier). It serves as a reliable, cloud-based NoSQL data store.
- **Configuration:** Environment variables (`MONGODB_URI`, JWT Secrets, NextAuth URLs) have been securely configured in the Vercel dashboard to ensure database connectivity and secure authentication without exposing sensitive credentials in the source code.

**Live Application URL:** `[Insert Your Vercel URL Here]`

---

### **8. Conclusion**

The development of the Presentation Hub has been a comprehensive journey into modern full-stack web development. By utilizing Next.js in place of a traditional MERN stack, the project successfully streamlined the architecture while maintaining robust backend capabilities via API routes and a MongoDB Atlas integration. 

The application fulfills all project requirements, featuring a completely dynamic, responsive, and component-based UI. Key concepts such as state management, hooks, context API, and complex database aggregation were successfully applied to build practical features like the Analytics Dashboard. Ultimately, Presentation Hub stands as a professional, scalable web application that solves a real-world problem effectively.
