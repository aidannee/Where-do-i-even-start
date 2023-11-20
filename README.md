# Where-do-i-even-start

Ever found yourself planning to move to a new city or country but struggled to organize your thoughts and tasks? This app is designed to assist you! With the help of AI, you can generate a personalized to-do list tailored to your travel or relocation needs. You can further modify, add, or delete tasks as per your preferences!

This project was created as part of my final assignment during my Fullstack course at BIT, aiming to combine AI capabilities with practical usability.

## Project Overview

### Frontend
The frontend of this project is built using React and styled using Tailwind CSS. The design inspiration drew from a fusion of bento boxes, Japanese candy-making kits, and pill containers. During the development phase, I explored Neumorphism, which influenced the overall aesthetic of the user interface.

![inspo 1](https://images.unsplash.com/photo-1596463059283-da257325bab8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

![inspo 2](https://i.ytimg.com/vi/7Vd_AXGYAqo/maxresdefault.jpg)

### Backend (Explanation)
The backend code, written in Node.js using Express, incorporates the ChatGPT API provided by OpenAI. It functions as a socket-based server utilizing the Socket.IO library to enable real-time communication between the frontend and the AI model.

The server listens for user prompts and utilizes the GPT-4 model from OpenAI to generate dynamic responses. Upon receiving user prompts related to travel or relocation, it processes the requests and generates a JSON-formatted to-do list that follows specific URL-like formatting for different categories and subcategories.


## How to Use
To run this project locally, follow these steps:
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-folder>`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and add your OpenAI API key as `OPENAI_API_KEY=<your-api-key>`
5. Start the frontend: `npm start`

Feel free to explore the codebase, customize features, and enhance functionalities to suit your needs!

### Note
For the backend functionality and detailed setup instructions, please refer to the separate README file provided in the backend directory.


