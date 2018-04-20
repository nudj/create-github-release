FROM node:alpine
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY src /usr/src
RUN yarn
CMD ['node', '.']
