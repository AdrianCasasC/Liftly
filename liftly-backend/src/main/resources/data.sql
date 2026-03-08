-- Mock Users (Password is 'password')
INSERT INTO users (email, password_hash, provider, role, created_at) VALUES ('test@liftly.com', '$2a$10$wT8K./N28N85kO7vK1YIou5O5hP/A8sV.F/K0Vw5Z66/C6F6I6E/G', 'LOCAL', 'ROLE_USER', CURRENT_TIMESTAMP());

-- Mock Exercises
INSERT INTO exercises (name, category, target_muscle) VALUES ('Bench Press', 'Barbell', 'CHEST');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Squat', 'Barbell', 'LEGS');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Deadlift', 'Barbell', 'BACK');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Overhead Press', 'Dumbbell', 'SHOULDERS');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Pull Up', 'Bodyweight', 'BACK');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Bicep Curl', 'Dumbbell', 'ARMS');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Leg Extension', 'Machine', 'LEGS');
INSERT INTO exercises (name, category, target_muscle) VALUES ('Crunch', 'Bodyweight', 'CORE');
