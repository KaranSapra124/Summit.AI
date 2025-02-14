# Summit.AI

Link to SaaS -> https://summit-ai.onrender.com/

Summit.AI is a SaaS application designed to provide users with AI-powered text summarization capabilities. It offers multiple plans tailored to different usage needs, including a free plan with limited access and paid plans for advanced features. The platform supports user authentication, usage tracking, and a robust admin panel for monitoring user activity.

---

## Features

### User-Facing Features:
1. **AI Text Summarization**:
   - Quickly summarize lengthy content into concise and meaningful summaries.

2. **Authentication and Account Management**:
   - Sign-up, login, and secure password management.
   - OTP-based email verification.
   - Account activation and deactivation with password confirmation.

3. **Usage Limits**:
   - Free plan includes a limit of 10 uses.
   - Notifications and pop-ups to prompt users to upgrade their plan upon exceeding limits.

4. **Dark Mode**:
   - Supports light and dark themes for user convenience.

5. **User Dashboard**:
   - View usage statistics and account details.
   - Easy navigation to plan upgrades and other settings.

### Admin Panel:
1. **User Management**:
   - Monitor user activity with advanced filters and sorting.
   - Enable/disable accounts as needed.

2. **Usage Tracking**:
   - View application usage statistics for individual users.
   - Identify users nearing or exceeding their plan limits.

3. **Plan Customization**:
   - Configure and manage plans available on the platform.

---

## Tech Stack

### Frontend:
- **Framework:** React with TypeScript
- **Styling:** TailwindCSS for responsive design and themes
- **Hosting:** Render (Both Frontend & Backend)

### Backend:
- **Language:** TypeScript with Node.js
- **Authentication:** bcrypt for password hashing, JWT with cookies for session management
- **Database:** MongoDB for user data and usage tracking
- **API:** RESTful APIs for handling requests and responses

### Tools and Libraries:
- **Email Service:** Nodemailer for OTP and notification emails
- **State Management:** Context API for managing global states

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaranSapra124/Summit.AI.git
   ```

2. Navigate to the project directory:
   ```bash
   cd summit-ai
   ```

3. Install dependencies for both frontend and backend:
   ```bash
    npm install (no cd for frontend)
   cd ./backend && npm install (for backend)
   ```

4. Set up environment variables:
   - Create `.env` files in both `frontend` and `backend` directories.
   - Add necessary keys, such as API URLs, MongoDB URI, and email credentials.

5. Run the application:
   - For the backend:
     ```bash
     npm run dev
     ```
   - For the frontend:
     ```bash
     npm run dev
     ```

---

## Usage

1. Sign up on the platform to create an account.
2. Log in and start using the AI text summarization tool.
3. Monitor your usage stats on the dashboard and upgrade your plan if needed.
4. Admins can access the admin panel for advanced management features.

---

## Future Enhancements

1. **Custom Summarization Models:**
   - Allow users to select different models based on their content type (e.g., technical, legal, casual).

2. **Analytics:**
   - Provide users with analytics on their summarized content (e.g., word reduction statistics).

3. **Integration Options:**
   - Offer API access to businesses for integrating Summit.AI’s summarization capabilities.

4. **Real-time Notifications:**
   - Notify users about plan expirations, promotions, or updates.

5. **Mobile App:**
   - Develop a mobile version for on-the-go summarization.

---

## Contributions

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---


Thank you for choosing Summit.AI to simplify your text summarization needs!

