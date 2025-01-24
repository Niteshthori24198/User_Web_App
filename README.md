# Task Management Web App

This web application empowers users to seamlessly manage their daily tasks and routines while providing a social aspect to enhance the user experience. Users can effortlessly organize their workflow, set and achieve their goals, and stay on top of their schedules with ease.

In addition to task management, the application includes a dedicated feed page where users can share their posts and explore feeds from others. With its intuitive interface and comprehensive end-to-end functionality, this app is designed to keep users organized, productive, and engaged.

# Prerequisites
  - Node.js
  - React
  - npm modules
  - MongoDB
  - Git
  
# Installation [Local Setup]
  - Clone the repository: `git clone repo_url` 
  - Backend :
    - Navigate to backend using `cd`
    - Set up .env file and add required credentials :-
        - mongoURL= `Add local or Atlas url for DB`
        - SecretKey= `Define JWT secret key`
        - googleclientid= `Obtain this from Google developer console by setting new service`
        - googleclientsecret= `Obtain this same from google developer console`
        - cloudinary_cloud_name= `Set up cloudinary account and obtain cloud name`
        - cloudinary_api_key= `Obtain this from cloudinary dashboard`
        - cloudinary_api_secret= `Obtain this from cloudinary dashboard`
        - NODEMAILER_EMAIL= `Setup Google email service and create email id`
        - NODEMAILER_EMAIL_PASSWORD= `Obtain the password from google app store as email auth password`
        - CLIENT_URL= `Replace with frontend url`
        - SERVER_URL= `Replace with Backend server url`
    - Install dependencies : `npm install`
    - Start the server : `npm run server`
- Frontend :
    - Navigate to user_task_web_app using `cd`
    - Install dependencies : `npm install`
    - Start server : `npm run dev`
  
# Features

  - This project has the following features:

    - User Registration, Login and Reset Password
    - O-Auth
    - Task Management CRUD
    - Search and Filtering
    - Seamless Drag and Drop
    - Feed Page
    - User-friendly UI
  

  # Technologies Used

  This project was built using the following technologies/Libraries:

   - Node.js
   - Express.js
   - MongoDB
   - Mongoose
   - React
   - JavaScript
   - bcrypt
   - JWT
   - OAuth
   - Nodemailer
   - React Dnd
   - Cloudinary
    
  # License

  This project is licensed under the MIT License. See the LICENSE file for details.
