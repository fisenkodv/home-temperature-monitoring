FROM node:10.14.0 as node

WORKDIR /root/src/app/ui
COPY ./src/Monitoring.Client/package*.json ./
RUN npm install
RUN npm install -g @angular/cli@7.0.1
COPY ./src/Monitoring.Client/ .
RUN ng build --prod --aot --extract-licenses false

FROM microsoft/dotnet:2.1-sdk as builder

RUN mkdir -p /root/src/app/api
WORKDIR /root/src/app/api

COPY ./src/Monitoring.Web/Monitoring.Api/Monitoring.Api.csproj ./Monitoring.Api/Monitoring.Api.csproj
COPY ./src/Monitoring.Web/Monitoring.Business/Monitoring.Business.csproj ./Monitoring.Business/Monitoring.Business.csproj
COPY ./src/Monitoring.Web/Monitoring.Data/Monitoring.Data.csproj ./Monitoring.Data/Monitoring.Data.csproj

RUN dotnet restore ./Monitoring.Api/Monitoring.Api.csproj 

COPY ./src/Monitoring.Web/ .
RUN dotnet publish ./Monitoring.Api/Monitoring.Api.csproj -c release -o ../published

FROM microsoft/dotnet:2.1-aspnetcore-runtime

WORKDIR /root/
COPY --from=builder /root/src/app/api/published .
COPY --from=node /root/src/app/ui/dist/client/ ./wwwroot
ENV ConnectionStrings__Monitoring=
ENV ASPNETCORE_ENVIRONMENT=production
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000/tcp
CMD ["dotnet", "./Monitoring.Api.dll"]