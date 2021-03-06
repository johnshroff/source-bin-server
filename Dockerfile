FROM node:16-alpine3.14 as ts-compiler

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install \
	&& npm install ncp -g

COPY . ./

RUN npm run build

FROM node:16-alpine3.14 as ts-remover

WORKDIR /usr/app

COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist/src ./

RUN npm install --only=production

FROM gcr.io/distroless/nodejs:16

WORKDIR /usr/app

COPY --from=ts-remover /usr/app ./

USER 1000

CMD ["index.js"]