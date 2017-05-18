FROM node:boron
RUN mkdir -p /dkr/build
WORKDIR /dkr/build
COPY .angular-cli.json /dkr/build
COPY package.json /dkr/build
RUN npm install @angular/cli
RUN npm install
EXPOSE 4200
CMD ['npm', 'start']
