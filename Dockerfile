FROM node:8 AS builder
ADD package.json /app/
WORKDIR /app
RUN npm install
ADD . /app
ENV MODE=production
ENV NODE_ENV=production
RUN npm run build
FROM node:8 AS application
COPY --from=builder /app/dist /app/
COPY --from=builder /app/node_modules /app/node_modules
ENV PORT=80
WORKDIR /app
CMD ["node", "server.js"]
