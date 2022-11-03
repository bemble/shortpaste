FROM --platform=$BUILDPLATFORM golang:1.19-alpine as server-builder

RUN apk add --no-cache \
    alpine-sdk \
    ca-certificates \
    tzdata

# Force the go compiler to use modules
ENV GO111MODULE=on

ADD . /app
WORKDIR /app/server
RUN go mod download

ARG TARGETOS TARGETARCH
RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o shortpaste .

FROM node:18-alpine as front-builder

RUN apk add tzdata

ADD . /app
WORKDIR /app/front
# run only if public folder does not already exists
RUN [[ -d /app/public ]] || npm ci install
RUN [[ -d /app/public ]] || CI=false GENERATE_SOURCEMAP=false npm run build:docker

# Final image
FROM scratch

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}

# copy front files
COPY --from=front-builder /app/public /app/public

# copy server files
COPY --from=server-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=server-builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=server-builder /app/server/shortpaste /app/server/shortpaste

ENTRYPOINT ["/app/server/shortpaste"]

EXPOSE 8080
