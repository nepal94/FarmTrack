# Stage 1: Build dependencies and package only the target service
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

ARG SERVICE

# 1. Copy only pom.xml files for dependency caching
COPY pom.xml ./
COPY api-gateway/pom.xml api-gateway/
COPY auth-service/pom.xml auth-service/
COPY farm-service/pom.xml farm-service/
COPY eureka-server/pom.xml eureka-server/

# 2. Pre-fetch dependencies (cached unless pom changes)
RUN mvn -B dependency:go-offline

# 3. Copy the rest of the source code
COPY api-gateway/src api-gateway/src
COPY auth-service/src auth-service/src
COPY farm-service/src farm-service/src
COPY eureka-server/src eureka-server/src

# 4. Build only the target service
RUN mvn -B -pl ${SERVICE} -am clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jdk
WORKDIR /app

ARG SERVICE
COPY --from=build /app/${SERVICE}/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
