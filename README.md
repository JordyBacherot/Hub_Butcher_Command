# Internal Butchery - Inter-Butchery Ordering Platform

This project is an internal application allowing butcheries located in different places to order products from each other.

### Technologies Used:
- **Frontend**:
    - React
    - Vite
    - Tailwind CSS
    - ShadcnUI (CSS framework)

- **Backend**:
    - Supabase (Database and Authentication)

### Prerequisites:
Before you begin, make sure you have the following installed:
- [Bun](https://bun.sh/) (Package manager and runtime)
- Node.js (if Bun is not installed)
- A Supabase account to create your database and configure authentication

---

## Installation

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone <REPOSITORY-URL>
cd <project-directory>
```

### 2. Install Dependencies

With Bun, you can install all the dependencies by running the following command in your terminal

```bash
bun install
```

This command will download and install all the dependencies listed in the package.json.

### 3. Set Up Environment Variables
Create a .env file at the root of your project by copying the provided template.

Example .env file:
```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_KEY=<your-url_key>
```

### 4. Start the Application in Development Mode
   
Once the dependencies are installed and the .env file is configured, you can start the application with the following command:

```bash
bun run dev
```

### 5. Access Supabase Database
To manage your Supabase database, you can go to Supabase, log in with your account, and create a new database instance.
Details are going to be provided soon.

### 6. Deployment

I use Vercel for deployment. You can deploy the application by following these steps:
1. Create a new project in Vercel.
2. Connect your GitHub repository to Vercel.
3. Set up environment variables in Vercel with the same keys as in your .env file.

## Main Features
- Product Management: Butcheries can add, edit, and delete commands.
- User Management: Authentication via Supabase, with each butcher having their own account.

## Authors
Jordy Bacherot - Lead Developer 

