FROM node:alpine 

# diretorio 
WORKDIR /home/sti

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", 'start' ]

