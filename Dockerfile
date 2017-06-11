FROM node:boron
RUN mkdir -p /dkr/build
WORKDIR /dkr/build
COPY .angular-cli.json /dkr/build
COPY package.json /dkr/build
RUN npm install
RUN npm install @angular/cli@1.1.0
COPY . /dkr/build
RUN npm build
EXPOSE 4200
CMD ["npm", "start"]
