FROM maven:3.9-amazoncorretto-21-alpine AS build
WORKDIR /sd-backend
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /sd-backend/src
COPY target/*.jar shopping-dashboard-0.0.1.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "shopping-dashboard-0.0.1.jar"]

