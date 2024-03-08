#FROM node:18-alpine
#
## Set working directory
#WORKDIR /usr/app
#
## Install PM2 globally
##RUN npm install --global pm2
#
### Copy "package.json" and "package-lock.json" before other files
### Utilise Docker cache to save re-installing dependencies if unchanged
##COPY ./package*.json ./
##
### Install dependencies
##RUN npm install
#
## Copy all files
#COPY ./ ./
##RUN npm install -g nrm
##RUN nrm ls
##RUN nrm use cnpm
##17 0.357   npm ---------- https://registry.npmjs.org/
##17 0.358   yarn --------- https://registry.yarnpkg.com/
##17 0.358   tencent ------ https://mirrors.cloud.tencent.com/npm/
##17 0.358   cnpm --------- https://r.cnpmjs.org/
##17 0.358   taobao ------- https://registry.npmmirror.com/
##17 0.358   npmMirror ---- https://skimdb.npmjs.com/registry/
#RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
## Install dependencies
#RUN npm install
## Build app
#RUN npm run build
#
## Expose the listening port
#EXPOSE 3000
#
## Run container as non-root (unprivileged) user
## The "node" user is provided in the Node.js Alpine base image
##USER node
##RUN chown -R $USER .next
## Launch app with PM2
##CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
#CMD [ "npm", "start"]
#FROM node:18-alpine AS deps
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
#
#COPY package.json package-lock.json ./
#RUN  npm install --production

# Dockerfile.prod

FROM node:8-alpine AS base
RUN apk add g++ make python

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .

RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]
