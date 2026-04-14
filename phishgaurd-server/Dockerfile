FROM node:20-alpine

WORKDIR /usr/src/app

# Pehle sirf package files copy karein
COPY package.json package-lock.json ./

# Ab install karein
RUN npm install

# Ab baaki code copy karein
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]