# Use an official OpenJDK runtime as a base image
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container
# The JAR file is in the 'target' folder after you build
COPY target/*.jar app.jar

# Make port 8080 available to the outside world
EXPOSE 8080

# Run the JAR file when the container launches
ENTRYPOINT ["java", "-jar", "app.jar"]