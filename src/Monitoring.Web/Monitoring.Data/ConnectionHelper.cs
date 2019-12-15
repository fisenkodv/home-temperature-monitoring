using System.Data.Common;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace Monitoring.Data
{
    internal static class ConnectionHelper
    {
        public static DbConnection GetConnection(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Monitoring");
            return GetConnection(connectionString);
        }

        private static DbConnection GetConnection(string connectionString)
        {
            var connectionStringBuilder = new MySqlConnectionStringBuilder(connectionString)
            {
                AllowZeroDateTime = false,
                ConvertZeroDateTime = false,
                Pooling = true
            };

            var connection = new MySqlConnection(connectionStringBuilder.ConnectionString);
            connection.Open();

            return connection;
        }
    }
}