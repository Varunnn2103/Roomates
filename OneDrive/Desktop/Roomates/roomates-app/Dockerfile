# --- Stage 1: Build the Java App ---
# Use a Maven image (which includes Java 17) to build the .jar file
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copy the pom.xml and download dependencies first
# This layer is cached and only re-runs if pom.xml changes
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Run the build command
RUN mvn package -DskipTests


# --- Stage 2: Run the App ---
# Use a lightweight Java image (JRE, not the full JDK)
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy the compiled .jar file from the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Make port 8080 available
EXPOSE 8080

# Run the JAR file when the container launches
ENTRYPOINT ["java", "-jar", "app.jar"]
