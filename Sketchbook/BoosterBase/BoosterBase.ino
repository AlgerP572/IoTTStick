#include <Arduino.h>
#include <EEPROM.h>
#include <ArduinoJson.h>
#include "DCCTimer.h"
#include "BoosterNode.h"
#include "BoosterAdmin.h"

//boosterConfigData thisBooster = {2,99,1234, true, 0x11, 0, 0, 0}; //device addr, accept DCC/PWM, on cmd, off cmd
//nodeConfigData stackConfig[] = {{1234,8,A1,9,12.2,4000,40,1,true,0,0,0,0},{1234,11,A0,0,8.31,4000,80, 1,false,0,0,0,0}}; //, {6,A1,0,8.13,4000,true},{9,A3,0,8.1,4000,true},{7,A4,0,8.13,4000,true},{7,A5,0,8.13,4000,true}};

BoosterGroup bList;

char serBuffer[150];
uint8_t readPtr = 0;
/*
typedef struct
{
  boosterData bArray[maxPins];
  uint8_t activeMask = 0x04; //booster 2 active  
  uint8_t bIndex = 0;  
} boosterGroup;
*/

void setup() {
  delay(1000);
  Serial.begin(115200);
  while (Serial.available())
    char c = Serial.read();
  Serial.println("IoTT SilverHat Booster");
  randomSeed(micros());
  bList.initBooster();
  bList.initNodes(); 
  bList.setExtStatus(-1, 0);
  delay(10);
  DCCTimer::begin(interruptHandler);   
  delay(10);
  bList.setExtStatus(-1, 0xFF); //bList.bConfig.devMode & 0x0F);
  bList.requestSVData(-1, 0x00FF);
  bList.requestSVData(-1, 0xFFFF);
}

void interruptHandler()
{
  bList.processTimerInterrupt();
}

void loop() 
{
  procInput(); //get commands
  bList.processLoop(); //send out reports and manage resets
}
