--- STAGE 1: BUILD ---
# Use a Maven image to compile the code
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# 1. Copy only the pom.xml to cache dependencies (makes future builds faster)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy source code and build the executable JAR
COPY src ./src
RUN mvn clean package -DskipTests

# --- STAGE 2: RUN ---
# Use a lightweight Java Runtime (JRE) for the actual deployment
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# 3. Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# 4. LOW LATENCY TUNING:
# -XX:+UseG1GC: Best for web app responsiveness
# -Xms / -Xmx: Keeps memory stable at 400MB to avoid "cold" memory allocation lag
ENV JAVA_OPTS="-XX:+UseG1GC -Xms400m -Xmx400m"

# 5. Dynamic Port Handling (required by free hosting services)
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:8080} -jar app.jar"]