
#include "dht.h"

#define DHT22_PIN 2
#define DEVICE_ID "UNIQUE DEVICE ID"
#define DELAY 2000

dht DHT;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  uint32_t start = micros();
  int chk = DHT.read22(DHT22_PIN);
  uint32_t stop = micros();

  if (chk == DHTLIB_OK)
  {
    // Send string: device_id:humidity:temperature
    String payload = String(DEVICE_ID) + ":" + String(DHT.humidity) + ":" + String(DHT.temperature);
    Serial.println(payload);
  }

  delay(DELAY);
}
