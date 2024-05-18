FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com
COPY target/gateway-0.0.1-SNAPSHOT.jar gateway.jar
ENTRYPOINT [ "java", "-jar", "/gateway.jar" ]