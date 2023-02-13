FROM node:19-alpine

COPY ./package*.json ./build ./
ENV PORT 80
EXPOSE 80

ENTRYPOINT ["node", "index.js"]