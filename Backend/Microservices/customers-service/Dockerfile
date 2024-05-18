FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/java-0.0.1-SNAPSHOT.war customerservice.war
ENTRYPOINT [ "java", "-jar", "/customerservice.war" ]