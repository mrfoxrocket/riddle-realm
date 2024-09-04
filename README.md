# RiddleRealm

RiddleRealm is a dynamic and engaging riddle-based web application that challenges users to solve riddles to gain access and track their progress. Built with a modern tech stack, this project integrates server-side rendering, secure authentication, dynamic content generation, and responsive UI design. This is a Full Stack project with a lean in focus towards backend logic and database management.

## Tech Stack

### Front End

-   **Next.Js**
-   **Tailwind CSS**
-   **Shadcn & Aceternity**
-   **Framer Motion**

### Back End

-   **Supabase (PostgreSQL)**
-   **Drizzle ORM**
-   **Typescript**
-   **Zod**

### Hosting

-   **Vercel**

## Features

### Riddle-Based Username Authentication

-   **Unique On-boarding Process:** New users are required to solve a riddle and incorporate the answer into their username to sign up, creating an engaging and secure entry point.
-   **Validation:** Basic clientside validation is handled by Zod while custom error messages intergrated through serverside logic provide checks to ensure users correctly integrate the riddle answer into their username in order to complete sign up.

### Home Page

After Signup the Home Page is where users are immediately greeted with a riddle challenge. Users can select the difficulty level and try to solve the riddle presented. Dynamic elements like confetti effects celebrate correct answers, enhancing the user experience.

-   **Dynamic Riddle Display:** Users are presented with random riddles based on their selected difficulty. The system ensures that previously solved riddles are not repeated.
-   **Hint System:** Hints can be gradually revealed to assist users, with the system tracking the number of hints used for database entry.
-   **Answer Revelation:** Users can choose to reveal the answer, with the app logging this action for statistical tracking.

### Comprehensive Stats Page

-   **Detailed Performance Tracking:** Users can monitor their riddle-solving progress with detailed statistics such as:
    -   The percentage of riddles solved without hints, with hints, and by revealing the answer.
    -   A breakdown of riddles solved by difficulty (easy, medium, hard).
-   **Visual Insights:** Graphs and charts visually represent user progress, highlighting their riddle-solving methods and performance trends.

### Leaderboard

-   **Competitive Rankings:** A leaderboard ranks top users based on the number of riddles solved without revealing the answer, fostering a competitive atmosphere.

### User-Friendly Interface

-   **Modern and Intuitive Design:** The frontend is built utilizing Tailwind CSS, Shadcn, and Aceternity, with a few custom elements such as the Home page's Input Field and the Difficulty Selector which was built by combining the Shadcn components; radio-group and tabs.
-   **Smooth Animations:** Framer Motion is also used for some animations alongside tailwinds built in animate-\_\_\_ option.

### SQL Query Management

-   **Dynamic Query Execution:** SQL queries are dynamically generated to fetch riddles, validate answers, and track user stats. For instance, the `getRandomRiddle` function ensures users do not receive previously solved riddles by combining SQL joins and conditional clauses.
-   **Advanced Data Handling:** SQL queries are used to manage complex data operations, such as joining tables, aggregating user statistics, and filtering data based on user interactions.

## Enhanced Features

-   Ensures solved riddles are no longer available for selection.
-   Added a difficulty filter to allow users to choose their preferred challenge level.
-   Implemented automatic database submission when an answer is revealed, ensuring accurate stats tracking.
-   Integrated skeleton loaders for better UX during data loading.
-   Provided user feedback with custom messages and confetti to enhance the interactivity.
-   Profile table with usernames linked to user ids to support the leaderboard feature, highlighting top riddle solvers.
-   Handles cases where the user has solved all riddles on the site or in a specific difficulty.

## Backend Logic Overview

### Riddles Management

The core logic for managing riddles involves several key functions:

-   **`getRandomRiddle`**: Fetches a random riddle that has not been solved by the user, filtered by difficulty if specified. This function uses SQL queries with dynamic conditions to ensure an unsolved riddle is always selected.
-   **`checkRiddleAnswer`**: Validates the user's answer against the stored answer in the database. If correct, it records the user's success, including whether hints were used or if the answer was shown.
-   **`getHints` and `getAnswer`**: These functions retrieve hints and the correct answer for a riddle from the database. When an answer is revealed, the event is logged to track user interactions.

### User Stats Tracking

User progress and performance are tracked through detailed SQL queries:

-   **`getTotalSolved`, `getTotalAnswersShown`, `getHintsUsed`**: These functions aggregate user data to track the total number of riddles solved, answers shown, and hints used.
-   **`getDifficultyStats`, `getMethodSolvedStats`**: These functions break down the user's performance by riddle difficulty and solving methods, providing insights into how the user tackles challenges to use for the graphs provided by Shadcn

### User Authentication

RiddleRealm employs a unique approach to user authentication. Supabase typically requires email, phone, or third-party providers for signup. This app has no reason to collect user information, nor does anyone really want to put there email in to sign up for a random riddle solving app. To simplify the process, the signup form only asks for a username. The backend appends `@email.com` to this username before submitting it to Supabase for Signup. However, if a user enters characters in the username that aren't valid in an email address, the Sign up will fail. To prevent this, strict Zod validation is implemented, ensuring that usernames contain only email-safe characters and meet the app's specific constraints.
