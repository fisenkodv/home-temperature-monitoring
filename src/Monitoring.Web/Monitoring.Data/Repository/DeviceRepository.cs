using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Data.Repository
{
  [UsedImplicitly]
  public class DeviceRepository : IDeviceRepository
  {
    private readonly IConfiguration _configuration;

    public DeviceRepository(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public async Task<Device> GetByDeviceId(string deviceId)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = "SELECT id, uuid, name, is_active FROM device WHERE uuid = @DeviceId";
        return await connection.QueryFirstOrDefaultAsync<Device>(query, new {DeviceId = deviceId});
      }
    }

    public async Task<IEnumerable<Device>> GetAll()
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = "SELECT id, uuid, name, is_active FROM device";
        return await connection.QueryAsync<Device>(query);
      }
    }

    public async Task<int> Create(string deviceId, string name, bool isActive)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          INSERT INTO device (uuid, name, is_active) VALUES(@DeviceId, @Name, @IsActive); 
          SELECT LAST_INSERT_ID();";

        return await connection.ExecuteScalarAsync<int>(query,
          new {DeviceId = deviceId, Name = name, IsActive = isActive});
      }
    }
  }
}