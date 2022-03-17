ARG ELK_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

COPY mysql-connector-java-5.1.44-bin.jar /opt/
# Add your logstash plugins setup here
# RUN logstash-plugin install logstash-input-jdbc
# Example: RUN logstash-plugin install logstash-filter-json
# RUN logstash-plugin install logstash-filter-aggregate
