# **App Name**: SAI Talent Scout

## Core Features:

- User Authentication: Secure sign-up and login using Firebase Authentication.
- Profile Management: Users can create and edit their profiles, including name, age, gender and height.
- Test Selection Dashboard: Display available tests (Vertical Jump, Sit-ups, Shuttle Run) in a clear dashboard.
- Video Recording and Upload: Record video clips of the tests and upload them to Firebase Storage. Automatically populate metadata to Firestore.
- Pose Analysis Mock-up: Estimate performance metrics (reps, jump height, time) via a local, mocked TensorFlow Lite analysis 'tool'.
- Results and Benchmarking: Compare performance metrics against age/gender benchmarks, display progress, and award virtual badges.
- Admin Dashboard: Web page to review video submissions, verify results, and update submission statuses.

## Style Guidelines:

- Primary color: HSL(195, 70%, 50%) - a vibrant cyan (#149FCE), suggesting trustworthiness and athleticism, standing out against a dark background.
- Background color: HSL(195, 20%, 10%) - a dark desaturated cyan (#151B1E), providing contrast.
- Accent color: HSL(165, 50%, 50%) - a medium green (#5ABF8B), used to highlight calls to action.
- Font pairing: 'Space Grotesk' (sans-serif) for headers and 'Inter' (sans-serif) for body text.
- Minimalist icons representing each test, using the primary and accent colors.
- Clean, card-based design for the dashboard and results screens, promoting easy navigation and scannability.
- Subtle animations when displaying results and awarding badges.