using System;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Data.Repository
{
  public class TelemetryRepository : ITelemetryRepository
  {
    private readonly IConfiguration _configuration;

    public TelemetryRepository(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public Task Create(float temperature, float humidity, int deviceId, DateTime utcNow)
    {
      throw new NotImplementedException();
    }

    public async Task<Telemetry> GetLatestTelemetry(string deviceId)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          SELECT
            telemetry.id,
            telemetry.humidity,
            telemetry.temperature,
            telemetry.time_stamp,
            device_id
          FROM telemetry 
          INNER JOIN device ON device.id=telemetry.device_id
          WHERE device.uuid=@DeviceId
          ORDER BY telemetry.time_stamp DESC
          LIMIT 1";

        return await connection.QueryFirstOrDefaultAsync<Telemetry>(query, new {DeviceId = deviceId});
      }
    }
  }
}