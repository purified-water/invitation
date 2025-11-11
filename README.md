# Invitation Card Web App

A modern React web application for creating and sharing beautiful digital invitation cards built with Vite, TypeScript, Tailwind CSS, and Firebase.

## Features

- 🎨 **Multiple Templates**: Choose from various templates (Graduation, Wedding, Birthday, Anniversary, Baby Shower, Conference)
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🔗 **Shareable Links**: Generate unique links for each invitation
- 🎯 **Admin Interface**: Easy-to-use form for creating invitations
- ⚡ **Fast & Modern**: Built with Vite and React 19 with React Compiler
- 🎨 **Tailwind CSS**: Beautiful styling with utility-first CSS

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   └── templates/       # Invitation template components
├── screens/             # Main screen components (Admin, Invitation)
├── services/            # Firebase and API services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and configurations
└── hooks/               # Custom React hooks (for future use)
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn or npm
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd invitation
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at https://console.firebase.google.com/
   - Enable Firestore Database
   - Get your Firebase configuration
   - Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Update `.env` with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

4. Start the development server:
```bash
yarn dev
# or
npm run dev
```

5. Open http://localhost:5173 in your browser

## Usage

### Creating an Invitation

1. Go to `/admin` (or just visit the root URL)
2. Fill out the invitation form:
   - **Title**: Required - The main title of your event
   - **Subtitle**: Optional - Additional text like "Save the date" or "You're invited"
   - **Template**: Choose from available templates
   - **Recipient Name**: Optional - Personalize with recipient's name
   - **Event Date**: Required - When the event will happen
   - **Event Time**: Optional - Specific time for the event
   - **Description**: Optional - Additional details about the event

3. Click "Create Invitation"
4. Copy the generated link and share it with your guests

### Viewing an Invitation

- Visit the generated link (format: `/invitation/{id}`)
- The invitation will display with the chosen template and styling
- Responsive design works on all devices

## Available Templates

- 🎓 **Graduation**: Blue and gold theme for graduation ceremonies
- 💒 **Wedding**: Elegant pink and gold theme for weddings
- 🎂 **Birthday**: Fun and colorful theme for birthday parties
- 💕 **Anniversary**: Romantic theme for anniversaries
- 👶 **Baby Shower**: Soft and gentle theme for baby celebrations
- 📊 **Conference**: Professional theme for business events

## Technology Stack

- **React 19** with React Compiler for optimal performance
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Firebase Firestore** for data storage
- **React Router** for navigation
- **React Hook Form** for form handling
- **Zod** for validation (ready to use)

## Building for Production

```bash
yarn build
# or
npm run build
```

The built files will be in the `dist` directory.

## Firebase Setup

1. Create a new Firebase project
2. Enable Firestore Database in "Test mode" (you can configure security rules later)
3. Go to Project Settings > General > Your apps
4. Add a new web app and copy the configuration
5. Update your `.env` file with the Firebase configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.