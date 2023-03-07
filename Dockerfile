FROM node:19-alpine

# Set ORIGION environment variable in CapRover
ENV ORIGIN=${ORIGIN}

COPY ./package*.json ./build ./
ENV PORT 80
EXPOSE 80

ENTRYPOINT ["node", "index.js"]