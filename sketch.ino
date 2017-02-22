#include <CurieBLE.h>
#include "CurieIMU.h"

BLEPeripheral blePeripheral;
BLEService tinyTileService("19B10000-E8F2-537E-4F6C-D104768A1214");

BLEUnsignedCharCharacteristic CharacteristicX("4227f3b1-d6a2-4fb2-a916-3bee580a9c84", BLERead | BLENotify);
BLEUnsignedCharCharacteristic CharacteristicY("5b974f46-6f48-43ee-9a55-4fb009867603", BLERead | BLENotify);
BLEUnsignedCharCharacteristic CharacteristicZ("09a64f10-32b3-497a-93c2-c914f46eba22", BLERead | BLENotify);

void setup() {
  Serial.begin(9600);

  Serial.println("Initializing IMU device...");

  CurieIMU.begin();
  CurieIMU.setAccelerometerRange(4);

  blePeripheral.setLocalName("Koozie");
  blePeripheral.setAdvertisedServiceUuid(tinyTileService.uuid());

  blePeripheral.addAttribute(tinyTileService);
  blePeripheral.addAttribute(CharacteristicX);
  blePeripheral.addAttribute(CharacteristicY);
  blePeripheral.addAttribute(CharacteristicZ);

  CharacteristicX.setValue(0);
  CharacteristicY.setValue(0);
  CharacteristicZ.setValue(0);

  blePeripheral.begin();
}

void loop() {
  float ax, ay, az;
  BLECentral central = blePeripheral.central();

  if (central) {
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    while (central.connected()) {
      delay(1000);

      CurieIMU.readAccelerometerScaled(ax, ay, az);

      CharacteristicX.setValue(ax*100);
      CharacteristicY.setValue(ay*100);
      CharacteristicZ.setValue(az*100);

      Serial.print("X: ");
      Serial.print(ax);
      Serial.print("   Y: ");
      Serial.print(ay);
      Serial.print("   Z: ");
      Serial.println(az);
    }
  }
}
