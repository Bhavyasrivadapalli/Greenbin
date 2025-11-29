GreenBin – Smart Waste Management System

GreenBin is an intelligent waste management platform that helps municipalities optimize trash collection using route optimization,
real-time bin tracking, and live map simulations. Built with the MERN stack, the system improves efficiency, reduces fuel cost, and supports smart city initiatives.

Features:
1.Bin Management – Add, edit, delete bins with manual map location selection
2.OpenStreetMap & Leaflet Integration
3.Route Optimization – Optimal path generation for full bins
4.Truck Simulation – Real-time movement along optimized route
5.JWT Authentication – Secure admin login & protected routes
6.Analytics Dashboard – Bin statistics & waste distribution
7.Predictive Insights – Predict future bin fill levels
8.Citizen Feedback System
9.Export Reports – PDF/CSV download
10.Live Data Updates – Auto refresh and real-time bin status

Tech Stack:
Frontend-React.js,Tailwind CSS,Leaflet + OpenStreetMap,Axios,React Router
Backend-Node.js,Express.js,JWT authentication,REST API architecture

Database:MongoDB + Mongoose

Installation and setup:
step1:clone the repository - https://github.com/Bhavyasrivadapalli/greenbin


step2:Run backend with the following commands - 
cd server
npm install
npm start



step3:Run frontend 
cd client
npm install
npm run dev


API ENDPOINTS:
GET    /api/bins

POST   /api/bins

PUT    /api/bins/:id

DELETE /api/bins/:id


Route optimization:
POST /api/route/optimize



Autentication:
POST /api/auth/login

POST /api/auth/register


