# Liftly Web Application - Workspace Rules

This file is used by Antigravity IDE, Gemini 3.1, and Claude 4.6 to understand the project structure and stack.

## Architecture
- **Frontend**: Angular 21 located in `liftly-frontend`
- **Backend**: Java 21 + Spring Boot located in `liftly-backend`
- **Database**: MySQL Database

## Agent Workflow
- Always refer to `task.md` in the brain directory for the current progress.
- When creating new features, generate an implementation plan before coding.
- Keep the design highly aesthetic for the frontend.
- When working on the backend, adhere strictly to Java 21 syntax and Spring Boot best practices.

## Tools
- Use the provided terminal commands to generate Angular components (`npx ng generate ...`).
- Use Maven for backend builds (`mvn compile`, `mvn test`).
