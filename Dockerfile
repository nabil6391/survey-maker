FROM node:lts AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install --legacy-peer-deps && npm run build

FROM node:lts AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/.next ./client/.next
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/ ./api/

EXPOSE 3080

CMD ["node", "./api/server.js"]