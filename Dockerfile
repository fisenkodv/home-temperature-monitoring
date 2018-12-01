FROM microsoft/dotnet:2.1-sdk as builder  

RUN mkdir -p /root/src/app/aspnetcoreapp
WORKDIR /root/src/app/aspnetcoreapp

COPY ./src/Monitoring.Web/Monitoring.Api/Monitoring.Api.csproj ./Monitoring.Api/Monitoring.Api.csproj
COPY ./src/Monitoring.Web/Monitoring.Business/Monitoring.Business.csproj ./Monitoring.Business/Monitoring.Business.csproj
COPY ./src/Monitoring.Web/Monitoring.Data/Monitoring.Data.csproj ./Monitoring.Data/Monitoring.Data.csproj

RUN dotnet restore ./Monitoring.Api/Monitoring.Api.csproj 

COPY ./src/Monitoring.Web/ .
RUN dotnet publish ./Monitoring.Api/Monitoring.Api.csproj -c release -o ../published

FROM microsoft/dotnet:2.1-aspnetcore-runtime

WORKDIR /root/
COPY --from=builder /root/src/app/aspnetcoreapp/published .
COPY ./build/app/ ./wwwroot
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000/tcp
CMD ["dotnet", "./Monitoring.Api.dll"]