namespace Monitoring.Business.Model
{
    public enum MeasurementType
    {
        Hour = 1,
        Day = 24,
        Week = 7 * Day,
        Month = 31 * Day
    }
}