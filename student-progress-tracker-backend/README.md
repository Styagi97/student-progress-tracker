# ⚙️ Student Progress Tracker Backend

Backend API for the **Student Progress Tracker** application developed using **Spring Boot** with secure JWT-based authentication.

---

# 🚀 Features

- 🔐 JWT Authentication & Authorization
- 🛡 Spring Security Integration
- 📡 RESTful APIs
- ✅ Task Management (CRUD Operations)
- 🧠 Smart Suggestion Engine
- 📅 Weekly Task Scheduler
- 🔥 Productivity Streak Calculation
- 🗄 MySQL Database Integration
- ⚡ Global Exception Handling
- 📊 Clean Layered Architecture

---

# 🛠 Tech Stack

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Lombok
- MySQL
- Maven

---

# 📦 Dependencies

Add the following dependencies inside `pom.xml`

```xml
<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Driver -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

---

# 🗄 Database Setup

## 1️⃣ Create MySQL Database

```sql
CREATE DATABASE student_tracker;
```

---

# ⚙️ Application Configuration

Configure your `application.properties` file:

```properties
spring.application.name=student-progress-tracker-backend

spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=8080

spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration

jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000
```

---

# 📁 Folder Structure

```bash
src/main/java/com/example/studenttracker/
│
├── controller/     # REST Controllers
├── service/        # Business Logic
├── repository/     # JPA Repositories
├── model/         # Entity Classes
├── dto/            # Data Transfer Objects
├── config/         # Security & JWT Configurations
├── security/       # JWT Filters & Utilities
└── StudentTrackerApplication.java
 
```

---

# ⚙️ Backend Setup

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
```

## 2️⃣ Navigate to Backend Folder

```bash
cd student-progress-tracker-backend
```

## 3️⃣ Install Dependencies

```bash
mvn clean install
```

## 4️⃣ Run the Application

```bash
mvn spring-boot:run
```

---

# 🔗 Backend Running URL

```bash
http://localhost:8080
```

---

# 🔐 Authentication

This project uses **JWT (JSON Web Token)** authentication.

### Available Authentication APIs

- Register User
- Login User
- Generate JWT Token
- Secure Protected APIs

---

# 📌 Important Notes

- Make sure MySQL is installed and running.
- Update database credentials in `application.properties`.
- Configure a strong JWT secret key before deployment.
- Backend should be running before starting the frontend application.

---

# 📄 License

This project is created for learning and educational purposes.