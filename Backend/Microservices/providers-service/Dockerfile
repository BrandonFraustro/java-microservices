FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/java-0.0.1-SNAPSHOT.war providersservice.war
ENTRYPOINT [ "java", "-jar", "/providersservice.war" ]