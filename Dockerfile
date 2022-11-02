FROM golang:1.19-alpine as server-builder

RUN apk add --no-cache \
    alpine-sdk \
    ca-certificates \
    tzdata

# Force the go compiler to use modules
ENV GO111MODULE=on

ADD . /app
WORKDIR /app/server
RUN CGO_ENABLED=0 GOOS=linux go build -a -o shortpaste .

FROM node:18-alpine as front-builder

RUN apk add tzdata

ADD . /app
WORKDIR /app/front
RUN npm ci install
RUN CI=false GENERATE_SOURCEMAP=false npm run build:docker

# Final image
FROM scratch

# copy front files
COPY --from=front-builder /app/public /app/public

# copy server files
COPY --from=server-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=server-builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=server-builder /app/server/shortpaste /app/server/shortpaste

ENTRYPOINT ["/app/server/shortpaste"]

EXPOSE 8080
