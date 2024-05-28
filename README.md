# Scheduler App

![Beyaz Tahta Schedular App](https://github.com/kaancakr/SchedularApp/assets/102954021/5ecc0fda-8eb1-4601-9e4d-136136e847b6)

## Overview

The Scheduler App is a powerful tool designed to help users effectively and quickly set reminders for their daily tasks. It allows users to share necessary reminders with their communities and group them for better organization.

## Features

- **Quick and Easy Reminders:** Set reminders for important tasks and events with just a few taps.
- **Community Sharing:** Share reminders with friends, family, and community members.
- **Group Reminders:** Organize reminders into groups for better management and clarity.

## Technology Stack

- **Front-End:** React Native
- **Back-End:** TypeScript, Firebase

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Firebase account

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/scheduler-app.git
   cd scheduler-app
2. **Install dependencies:**
   ```sh
   npm install
   yarn install
3. **Set up Firebase:**
   - Create a new project in Firebase.
   - Set up Firestore and Authentication (if needed).
   - Obtain your Firebase configuration and add it to your project.
4. **Add Firebase configruation**
   Create a .env file in the root directory and add your Firebase configuration:
   ```sh
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
5. **Run the app**
   ```sh
   npm start
   # or
   yarn start

### Usage

1. **Setting Reminders:**
   - Open the app and navigate to the reminders section.
   - Click on "Add Reminder" and fill in the necessary details.
   - Save the reminder.
2. **Sharing Reminders:**
   - Select the reminder you wish to share.
   - Choose the community or individuals you want to share the reminder with.
3. **Grouping Reminders:**
   - Create a new group or select an existing group.
   - Add reminders to the group for better organization.

### Contrubuting

We welcome contributions from the community. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch with a descriptive name.
   ```sh
   git checkout -b feature/your-feature-name
3. Make your changes.
4. Commit your changes with clear and concise commit messages.
   ```sh
   git commit -m "Add feature description"
5. Push to the branch.
   ```sh
   git push origin feature/your-feature-name
6. Open a pull request and describe the changes you made.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
