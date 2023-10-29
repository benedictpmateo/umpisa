FROM node:18 as base

# builder stage
FROM base as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# runner stage
FROM base as runner

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY --from=builder /app/dist .

EXPOSE 3001

CMD ["node", "index.js"]
