#ifndef Device_h
#define Device_h

#include <inttypes.h>
#include <Arduino.h>

class DeviceClass
{
  public:
    uint32_t getID();
  private:
    uint32_t loadFromPROM();
    void saveToPROM(uint32_t id);
};
extern DeviceClass Device;
#endif
