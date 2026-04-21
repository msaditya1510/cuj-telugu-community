# CUJ Telugu Community

A full-stack community platform for Telugu students, alumni, and faculty at the Central University of Jharkhand (CUJ).  
The platform enables users to connect, explore community members, and manage profiles through a centralized system.

---

## Live Demo

Frontend: https://cuj-telugu-community.vercel.app  
Backend API: [https://msaditya1510-cujtelugucommunity.hf.space ](https://msaditya1510-cujtelugucommunity.hf.space/) 

---

## Features

- Community directory with search functionality
- User profile creation and management
- Role-based profiles (students, professors, alumni)
- Event listings (upcoming and past)
- Contact card search and profile lookup
- Responsive UI for desktop and mobile

---

## Tech Stack

Frontend:
- React
- TypeScript
- Vite
- TailwindCSS

Backend:
- Spring Boot
- Java
- REST APIs
- Hibernate / JPA

Database:
- MySQL / PostgreSQL

Deployment:
- Frontend: Vercel
- Backend: Hugging Face Spaces

---

## System Design Overview

- Frontend communicates with backend using REST APIs
- Backend follows layered architecture:
  - Controller: handles HTTP requests and responses
  - Service: contains business logic
  - Repository: manages database interactions using JPA/Hibernate
- Authentication-based endpoints use the currently logged-in user context
- Database stores user profiles, events, and contact card data
- Environment variables used for API endpoints and database configuration

---

## Sample API Endpoints

User Profile:
GET /api/users/me  
PUT /api/users/me  

Events:
GET /api/events  
GET /api/events/{id}  
GET /api/events/upcoming  
GET /api/events/past  

Contact Cards:
GET /api/contact-cards/search  
GET /api/contact-cards/profile/{id}  

Public:
GET /api/public/stats  

---

## Project Structure

frontend/
  src/
    components/
    pages/
    contexts/

backend/
  src/main/java/
    controller/
    service/
    repository/
    entity/
    dto/

---

## Getting Started

Clone the repository:
git clone https://github.com/msaditya1510/cuj-telugu-community.git  
cd cuj-telugu-community  

Frontend:
npm install  
npm run dev  

Backend:
./mvnw spring-boot:run  

---

## Environment Variables

Frontend (.env):
VITE_API_URL=http://localhost:8080  

Backend (application.properties):
spring.datasource.url=YOUR_DATABASE_URL  
spring.datasource.username=USERNAME  
spring.datasource.password=PASSWORD  

---

## Testing

- Unit tests are being implemented using JUnit  
- Focus on validating API endpoints and core business logic  

---

## Deployment

- Frontend deployed on Vercel  
- Backend deployed on Hugging Face Spaces  
- Environment variables configured for API endpoints and database connections  

---

## Notes

- Backend hosted on Hugging Face Spaces may experience cold starts depending on usage  
- This project demonstrates backend architecture, API design, and deployment workflow
- Configured a scheduled GitHub Actions workflow to periodically ping the backend service to reduce cold-start latency 

---

## Author

Developed for the CUJ Telugu Community
