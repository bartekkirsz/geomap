FROM node:latest

EXPOSE 3000
EXPOSE 35729

WORKDIR ./

ENV PATH /node_modules/.bin:$PATH

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install
RUN npm install react-scripts -g

ADD . ./

CMD ["npm", "start"]

