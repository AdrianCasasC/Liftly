# Frontend Developer Agent Tasks: Angular 21

**Objective:** Build a reactive, component-based Single Page Application for a gym tracker.

## Phase 0: Contract & Mocking (TypeScript Adaptation)

- **Task 0.1: Define TypeScript Interfaces.** Create strictly typed TS `interfaces` or `types` that perfectly mirror the backend's JSON API contract (DTOs) for Users, Templates, Workouts, and Weight logs.
- **Task 0.2: Build Mock Data Services.** Create Angular Services that implement these interfaces using `Observable` and `delay` to simulate network latency. This allows UI development to proceed completely unblocked by the backend.

## Phase 1: UI & Feature Implementation

- **Task 1.1: Workspace Setup.** Initialize the Angular 21 workspace. Configure routing, select a UI library (e.g., Angular Material), and configure Signals for state management.
- **Task 1.2: Auth & Security UI.**
  - Build Login/Registration forms. Integrate OAuth buttons.
  - Implement an `HttpInterceptor` to attach JWTs to API calls and functional Route Guards (`CanActivateFn`) to protect internal routes.
- **Task 1.3: Shell Layout.** Create the main application shell with persistent navigation (Home, Training, Weight).
- **Task 1.4: Training Page.**
  - Build a list view for user templates.
  - Build a complex Reactive Form (`FormGroup` with a nested `FormArray`) allowing users to add exercises from a dropdown, and then dynamically add sets/reps to each exercise.
- **Task 1.5: Home Page (Calendar).**
  - Implement a monthly calendar view highlighting the current day.
  - Add interaction (click or drag-and-drop) to assign created training templates to specific dates.
- **Task 1.6: Weight Tracking Page.**
  - Integrate a charting library (e.g., ECharts or Chart.js).
  - Create a form with a date-picker and number input to log weight.
  - Feed the historical data into a line chart component.
- **Task 1.7: API Wiring.** Swap out the Mock Data Services (from Task 0.2) with the real `HttpClient` calls to the Java backend. Add error handling and loading spinners.
