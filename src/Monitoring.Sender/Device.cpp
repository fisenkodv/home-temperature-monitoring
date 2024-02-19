#include <avr/eeprom.h>
#include "Device.h"

uint32_t DeviceClass::getID() {
  uint32_t id = loadFromPROM();
  if (id == 0) {
    randomSeed(analogRead(0));
    for (uint32_t i = 0; i < 4; i++) {
      uint32_t randomByte = random(255);
      id |= (randomByte << (i * 8));
    }

    saveToPROM(id);
  }
  return id;
}

uint32_t DeviceClass::loadFromPROM() {
  uint32_t id = eeprom_read_dword(0);
  return id;
}

void DeviceClass::saveToPROM(uint32_t id) {
  eeprom_write_dword(0, id);
}

DeviceClass Device;
