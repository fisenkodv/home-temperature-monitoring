#include "dht.h"
#include "LowPower.h"

#define DHT22_PIN 2
#define DEVICE_ID "UNIQUE DEVICE ID"

dht DHT;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  // Enter power down state for 8 s with ADC and BOD module disabled
  LowPower.powerDown(SLEEP_8S, ADC_OFF, BOD_OFF);  

  uint32_t start = micros();
  int chk = DHT.read22(DHT22_PIN);
  uint32_t stop = micros();

  if (chk == DHTLIB_OK)
  {
    // Send string: device_id:humidity:temperature
    String payload = String(DEVICE_ID) + ":" + String(DHT.humidity) + ":" + String(DHT.temperature);
    Serial.println(payload);
   Serial.flush();
  }
}
