# Useful commands

## Build image

```bash
docker build --rm --tag fisenkodv/monitoring:latest --file Dockerfile .
```

## Run image

```bash
docker run --rm -d -p 5000:5000/tcp --env ConnectionStrings__Monitoring="connection_string" fisenkodv/monitoring:latest
```

For example:

```bash
docker run --rm -d -p 5000:5000/tcp --env ConnectionStrings__Monitoring="server=localhost;database=monitoring;uid=root;pwd=" fisenkodv/monitoring:latest
```

## Run MariaDB in Docker

```bash
docker run --rm -e MYSQL_ALLOW_EMPTY_PASSWORD=true -d -p 3306:3306 mariadb:10.1.26
```