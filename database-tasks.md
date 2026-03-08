# Infrastructure & Database Agent Tasks

**Objective:** Provision the database layer, define the schema structure, and establish configurations.

## Phase 0: Contract & Schema Definition (SQL Adaptation)

- **Task 0.1: The Definitive Schema.** Write the raw Data Definition Language (DDL) `.sql` scripts. Define primary keys, foreign keys, cascading deletion rules, and constraints (e.g., preventing duplicate workouts on the exact same day if applicable).

## Phase 1: Provisioning & Data Management

- **Task 1.1: Database Provisioning.** Set up a local Docker compose file containing the chosen SQL database (e.g., PostgreSQL 16+).
- **Task 1.2: Seed Data.** Create an `INSERT` script to populate the `Exercises` table with a comprehensive, categorized list of standard gym exercises (e.g., push-ups, squats, deadlifts) so the app has data on day one.
- **Task 1.3: Environment Management.** Generate `.env.example` files for both the frontend and backend repositories, outlining the necessary variables (DB URL, DB Credentials, JWT Secret, Google/GitHub Client IDs) without exposing real secrets.
