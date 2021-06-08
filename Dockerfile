FROM node:16
WORKDIR /app
COPY package.json .

RUN npm install -g @angular/cli
RUN npm install

COPY . ./
ENV PORT 4200
EXPOSE $PORT

CMD ["npm","run","start"]