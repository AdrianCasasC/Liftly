# Backend Developer Agent Tasks: Java 21 & Spring Boot

**Objective:** Build the RESTful API and backend logic for a gym training application.

## Phase 0: Contract & Data Modeling (Java Adaptation)

- **Task 0.1: Define API Interfaces & DTOs.** Using an OpenAPI 3.0 specification as a reference, generate the Java Data Transfer Objects (DTOs) using Java 21 `Records` for all requests and responses (Auth, Templates, Calendar, Weight).
- **Task 0.2: Define JPA Entities.** Translate the agreed-upon SQL schema into JPA `@Entity` classes. Establish relationships (`@OneToMany`, `@ManyToOne`) for: Users, Exercises, Training_Templates, Template_Exercises, Calendar_Workouts, and Weight_Logs.

## Phase 1: Core Implementation

- **Task 1.1: Project Setup.** Initialize a Spring Boot 3.x project. Configure database connection pools and set up Flyway/Liquibase for database migrations. Enable Virtual Threads for high concurrency.
- **Task 1.2: Authentication Module.**
  - Implement Spring Security with a JWT filter for custom login/registration.
  - Integrate Spring Security OAuth2 Client for Google and GitHub SSO.
- **Task 1.3: Repository Layer.** Create Spring Data JPA `Repository` interfaces for all entities.
- **Task 1.4: Exercises API.** Build a GET endpoint serving the predefined list of exercises.
- **Task 1.5: Training Template API.** Build CRUD endpoints for training templates. Ensure the creation endpoint handles the nested structure (Template -> Exercises -> Sets/Reps) within a single transaction.
- **Task 1.6: Calendar API.** Build endpoints to assign a Training Template ID to a specific Date/User, and an endpoint to fetch a month's worth of scheduled workouts.
- **Task 1.7: Weight Tracking API.** Build an endpoint to log a new weight (value + date) and a GET endpoint returning time-series weight data optimized for frontend charting.
