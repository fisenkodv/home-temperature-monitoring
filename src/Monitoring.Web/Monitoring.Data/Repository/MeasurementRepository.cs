using System;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Data.Repository
{
  public class MeasurementRepository : IMeasurementRepository
  {
    private readonly IConfiguration _configuration;

    public MeasurementRepository(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public async Task CreateMeasurement(float temperature, float humidity, string deviceUuid, DateTime timeStamp)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string getDeviceIdQuery = @"
          SELECT id FROM devices WHERE uuid=@DeviceUuid";

        var deviceId = await connection.QuerySingleAsync<int>(getDeviceIdQuery, new {DeviceUuid = deviceUuid});

        const string query = @"
          INSERT INTO measurements(humidity, temperature, time_stamp, device_id) 
          VALUES (@Humidity, @Temperature, @TimeStamp, @DeviceId)";

        await connection.ExecuteAsync(query,
          new {Humidity = humidity, Temperature = temperature, TimeStamp = timeStamp, DeviceId = deviceId});
      }
    }

    public async Task<Measurement> GetLatestMeasurement(string deviceUuid)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          SELECT
            measurements.humidity AS Humidity,
            measurements.temperature AS Temperature,
            measurements.time_stamp AS TimeStamp
          FROM measurements 
          INNER JOIN devices ON devices.id=measurements.device_id
          WHERE devices.uuid=@DeviceUuid
          ORDER BY measurements.time_stamp DESC
          LIMIT 1";

        return await connection.QueryFirstOrDefaultAsync<Measurement>(query, new {DeviceUuid = deviceUuid});
      }
    }
  }
}