FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/java-0.0.1-SNAPSHOT.war webappservice.war
ENTRYPOINT [ "java", "-jar", "/webappservice.war" ]