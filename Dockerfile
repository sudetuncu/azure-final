FROM node:18-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install --production

# App code
COPY . .

ENV PORT=3000
EXPOSE 3000

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
