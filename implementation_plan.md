# Gym Training App Backend Implementation Plan

This plan addresses Phase 0 and Phase 1 for the Java 21 & Spring Boot backend.

## Technology Stack
- **Framework**: Spring Boot 3.4.0
- **Database**: MySQL

## Proposed Changes

### 1. Project Configuration & Dependencies

#### [MODIFY] [pom.xml](file:///c:/Users/adric/OneDrive/Desarrollos/Liftly/liftly-backend/pom.xml)
- Add dependencies: `spring-boot-starter-security`, `spring-boot-starter-oauth2-client`, `flyway-core`, `flyway-mysql`, `jjwt` (for JWT).
- Enable Java 21 virtual threads if not already handled by Spring Boot properties setup.

#### [NEW] [application.yml](file:///c:/Users/adric/OneDrive/Desarrollos/Liftly/liftly-backend/src/main/resources/application.yml)
- Configure database connection (MySQL), Flyway, JWT properties, and OAuth2 client properties.
- Enable Virtual threads: `spring.threads.virtual.enabled=true`.

### 2. Phase 0: Data Modeling (Entities & DTOs)

- **Entities (`src/main/java/com/liftly/backend/model/entity`)**:
  - `User`: id, email, passwordHash, provider, role, created_at.
  - `Exercise`: id, name, category, target_muscle.
  - `TrainingTemplate`: id, user_id, name, description.
  - `TemplateExercise`: id, template_id, exercise_id, sets, reps, rest_time.
  - `CalendarWorkout`: id, user_id, template_id, scheduled_date, completed.
  - `WeightLog`: id, user_id, weight, logged_date.

- **DTOs (`src/main/java/com/liftly/backend/model/dto`)** (using Java 21 Records):
  - Auth: `LoginRequest`, `RegisterRequest`, `AuthResponse`.
  - Content: `ExerciseDto`, `TrainingTemplateDto`, `TemplateExerciseDto`, `CalendarWorkoutDto`, `WeightLogDto`.

### 3. Phase 1: Core Implementation

- **Security (`src/main/java/com/liftly/backend/security`)**:
  - `SecurityConfig`: Configure stateless session, OAuth2, and JWT Filter.
  - `JwtAuthenticationFilter` & `JwtTokenProvider`: Token issuance and validation.

- **Repositories (`src/main/java/com/liftly/backend/repository`)**:
  - Spring Data JPA Interfaces: `UserRepository`, `ExerciseRepository`, `TrainingTemplateRepository`, etc.

- **Services & Controllers (`src/main/java/com/liftly/backend/service` and `controller`)**:
  - `ExerciseController`: GET `/api/exercises`.
  - `TrainingTemplateController`: CRUD `/api/templates`.
  - `CalendarController`: POST `/api/calendar`, GET `/api/calendar/month`.
  - `WeightLogController`: POST `/api/weight`, GET `/api/weight`.

## Verification Plan

### Automated Tests
- Run `./mvnw clean test` to ensure context loads and all tests pass.
- Write unit tests for JWT generation and basic Service logic using Mockito.
- RestAssured or Spring MockMvc tests for public paths (`/api/exercises`).

### Manual Verification
1. Start the Spring Boot application locally.
2. Use Postman or curl to test User Registration and Login to obtain a JWT.
3. Create a Training Template via POST `/api/templates`, ensuring nested `TemplateExercise` records are saved correctly.
4. Schedule a workout via POST `/api/calendar`.
5. Verify OAuth2 redirects correctly (if client ID/secrets are provided in `.env`).

---

# Gym Training App Frontend Implementation Plan

## Proposed Changes

### 1. Phase 0: Contract & Mocking (TypeScript)

- **Interfaces (`src/app/core/models`)**:
  - `user.interface.ts`, `exercise.interface.ts`, `training-template.interface.ts`, `calendar-workout.interface.ts`, `weight-log.interface.ts`.
- **Mock Services (`src/app/core/services/mock`)**:
  - `AuthMockService`, `TemplateMockService`, `CalendarMockService`, `WeightMockService` using `of` and `delay` to simulate network.

### 2. Phase 1: UI & Feature Implementation

- **Project Configuration**:
  - Add standard libraries: Angular Material or use the existing Tailwind CSS for UI components. Add `echarts` or `chart.js` for charts.
  - Setup routing and Guards (`auth.guard.ts`).
  - Configure Angular Signals for state management block (modern RxJS + Signals approach).

- **Components (`src/app/features`)**:
  - **Auth (`/auth`)**: Login & Register pages, Reactive forms.
  - **Shell (`/`)**: Main layout with persistent navigation (Sidebar/Bottom nav).
  - **Home/Calendar (`/calendar`)**: Monthly view rendering assigned templates.
  - **Training (`/training`)**: List of templates, Create Template reactive form with `FormArray` for adding exercises and nested sets/reps.
  - **Weight (`/weight`)**: Chart.js / ECharts integration displaying historical weight. Date picker and Weight input for logging.

- **API Wiring (`src/app/core/services/api`)**:
  - Build actual `HttpClient` based services replacing mock ones. Add `AuthInterceptor` to inject JWT tokens into API requests.

## Frontend Verification Plan
- **Automated**: Validate structural and routing configurations using `ng test` (Vitest).
- **Manual**:
  - Serve via `ng serve` and test offline capabilities with mock services first.
  - Test all Reactive Forms for validation rules (required fields, positive numbers for reps/weight).
  - Ensure the complex Create Template form allows adding/removing exercises and sets properly.
  - Finally, switch from Mock to Real Services once Backend is up and verify CORS and exact contract matching.
