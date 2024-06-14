#include "Device.h"

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  //  uint32_t start = micros();
  //  int chk = DHT.read22(DHT22_PIN);
  //  uint32_t stop = micros();
  //
  //  if (chk == DHTLIB_OK)
  //  {
  //    // Send string: device_id:humidity:temperature
  //    String payload = String(DEVICE_ID) + ":" + String(DHT.humidity) + ":" + String(DHT.temperature);
  //    Serial.println(payload);
  //  }
  uint32_t id = Device.getID();
  Serial.print("Device ID: ");
  Serial.println(id);
  delay(1000);
}
