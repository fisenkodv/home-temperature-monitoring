#include "DHT.h"

#define DEVICEID 100
#define DELAY 2000
#define DHTPIN 2
#define DHTTYPE DHT22 // DHT 22  (AM2302)

// Connect pin 1 (on the left) of the sensor to +3.3V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND

DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(9600);
  dht.begin();
}

void loop()
{
  // Wait a few seconds between measurements.
  delay(DELAY);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float humidity = dht.readHumidity();
  // Read temperature as Celsius
  float celsius = dht.readTemperature();
  // Read temperature as Fahrenheit
  float fahrenheit = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(celsius) || isnan(fahrenheit))
  {
    return;
  }

  // Compute heat index, must send in temp in Fahrenheit!
  float heatIndex = dht.convertFtoC(dht.computeHeatIndex(fahrenheit, humidity));

  // Send string: device_id:humidity:celsius:fahrenheit:heat_index
  String payload = String(DEVICEID) + ":" + String(humidity) + ":" + String(celsius) + ":" + String(heatIndex);
  Serial.println(payload);
}
