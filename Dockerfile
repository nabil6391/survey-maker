# FROM node:lts AS ui-build
# WORKDIR /usr/src/app/client
# COPY client/package*.json ./
# COPY client/ ./
# RUN npm install --legacy-peer-deps && npm run build
# RUN ls 
# # EXPOSE 3000
# # COPY client/ ./
# # CMD ["npm", "run", "dev"]

# FROM node:lts AS server-build
# WORKDIR /usr/src/app/api
# COPY --from=ui-build /usr/src/app/client/.next ./client/.next
# COPY api/package*.json ./
# RUN npm install -g nodemon && npm install
# COPY api/ ./
# RUN ls 
# EXPOSE 3080
# CMD ["nodemon", "./server.js"]

# # CMD ["npm", "run", "dev"]

# # FROM server-build as dev1
# # ENV NODE_ENV=production
# # RUN cd api && npm ci
# # COPY api/ ./api/
# # CMD ["node", "./api/server.js"]

# # FROM server-build as dev
# # ENV NODE_ENV=development
# # RUN cd api && npm install -g nodemon && npm install
# # COPY api/ ./api/
# # CMD ["nodemon", "./api/server.js"]
# #  docker-compose build --no-cache --progress=plain    