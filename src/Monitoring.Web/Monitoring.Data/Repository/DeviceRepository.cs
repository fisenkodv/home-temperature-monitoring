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

    public async Task<IEnumerable<Device>> GetDevices()
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = "SELECT id AS Id, uuid AS Uuid, name AS Name, is_active AS IsActive FROM devices";
        return await connection.QueryAsync<Device>(query);
      }
    }

    public async Task<Device> GetDevice(string deviceUuid)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          SELECT id AS Id, uuid AS Uuid, name AS Name, is_active AS IsActive
          FROM devices WHERE uuid = @DeviceUuid";
        return await connection.QueryFirstOrDefaultAsync<Device>(query, new {DeviceUuid = deviceUuid});
      }
    }

    public async Task<int> CreateDevice(string deviceUuid, string name, bool isActive)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          INSERT INTO devices (uuid, name, is_active) VALUES(@DeviceUuid, @Name, @IsActive); 
          SELECT LAST_INSERT_ID();";

        return await connection.ExecuteScalarAsync<int>(query,
          new {DeviceUuid = deviceUuid, Name = name, IsActive = isActive});
      }
    }

    public async Task UpdateDevice(Device device)
    {
      using (var connection = ConnectionHelper.GetConnection(_configuration))
      {
        const string query = @"
          UPDATE devices SET name=@Name, is_active=@IsActive
          WHERE uuid=@DeviceUuid;";

        await connection.ExecuteAsync(query, new {DeviceUuid = device.Uuid, device.Name, device.IsActive});
      }
    }
  }
}