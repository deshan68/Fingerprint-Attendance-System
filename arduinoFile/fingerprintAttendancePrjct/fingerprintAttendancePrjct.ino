#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <iostream>
#include <ctime>
using namespace std;

// Set these to run example.
#define FIREBASE_HOST "nodemcuprjct-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "SyyzOf4O2Yx3KBzuiqb9eafwbSCDRCJx9FdmTNKw"
#define WIFI_SSID "Baby_Dialog"
#define WIFI_PASSWORD "21506310P"

//----------------------------------------------------------------------------------------------
#include <Adafruit_Fingerprint.h>
#define Finger_Rx 14 //D5
#define Finger_Tx 12 //D6
#if (defined(__AVR__) || defined(ESP8266)) && !defined(__AVR_ATmega2560__)
// For UNO and others without hardware serial, we must use software serial...
// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
// Set up the serial port to use softwareserial..
SoftwareSerial mySerial(Finger_Rx, Finger_Tx);

#else
// On Leonardo/M0/etc, others with hardware serial, use hardware serial!
// #0 is green wire, #1 is white
#define mySerial Serial1

#endif

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

uint8_t id;
int OldId;

bool Enrollmnt;
bool MarkTheAtttendance;
 



void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

//----------------------------------------------------------------------------
  Serial.begin(9600);
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint sensor enrollment");

  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  Serial.println(F("Reading sensor parameters"));
  finger.getParameters();
  Serial.print(F("Status: 0x")); Serial.println(finger.status_reg, HEX);
  Serial.print(F("Sys ID: 0x")); Serial.println(finger.system_id, HEX);
  Serial.print(F("Capacity: ")); Serial.println(finger.capacity);
  Serial.print(F("Security level: ")); Serial.println(finger.security_level);
  Serial.print(F("Device address: ")); Serial.println(finger.device_addr, HEX);
  Serial.print(F("Packet len: ")); Serial.println(finger.packet_len);
  Serial.print(F("Baud rate: ")); Serial.println(finger.baud_rate);


}

uint8_t readnumber(void) {
  uint8_t num = 0;

  while (num == 0) {
    while (! Serial.available());
    num = Serial.parseInt();
  }
  return num;
}






















void loop() {

    //get value for enrollment or mark attedance  
    Enrollmnt = Firebase.getBool("Start with Enrollment or Mark the Attendance/Enrollment");
    MarkTheAtttendance = Firebase.getBool("Start with Enrollment or Mark the Attendance/Mark_The_Attedance");
//   Serial.print(Enrollmnt);
//   Serial.print(MarkTheAtttendance);

   if(Enrollmnt == 1 && MarkTheAtttendance == 0){    
            StartEnrollment();
   }else if(Enrollmnt == 0 && MarkTheAtttendance == 1){
          Serial.println("Rdy to MarkTheAtttendance");

          finger.getTemplateCount();
          if (finger.templateCount == 0) {
            Serial.print("Sensor doesn't contain any fingerprint data. Please run the 'enroll' example.");
          }
          else {
            Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
            Serial.println("Waiting for valid finger...");
          }
          
          getFingerprintID();

          delay(150);            //don't ned to run this at full speed.
          
    }else{
          Serial.println("Select your choice");
    }

}
uint8_t StartEnrollment(){
          Serial.println("Rdy to Enrolment");
          // get value 
          String imprtCrnntId = Firebase.getString("/CurrentFingerId/CurrentFingerId");
          String imprtOldId = Firebase.getString("/CurrentFingerId/Old_Id");
          id = imprtCrnntId.toInt();
          OldId = imprtOldId.toInt();
          delay(1000);
        
           // update value
          Firebase.setString("/CurrentFingerId/Old_Id", imprtCrnntId);
        
//          Serial.print("Currnt id ");Serial.println(id);
//          Serial.print("Old id ");Serial.println(OldId);
        
        
        //------------------------------------------------------------------------
          if(id > 0 ){
                  if(OldId == id){
                    return 0;
                    }else{
                          Serial.println("Ready to enroll a fingerprint!");
                          Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");
                          if (id == 0) {// ID #0 not allowed, try again!
                             return 0;
                          }
                          Serial.print("Enrolling ID #");
                          Serial.println(id);
                        
                          while (!  getFingerprintEnroll() );
                      }
        
            }
}


uint8_t getFingerprintEnroll() {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID "); Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    getFingerprintEnroll();
  } else {
    Serial.println("Unknown error");
    return p;
  }

  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    
    // set value
    Firebase.setInt("Succsessfully_Stored_ID/fingerID", id);
    
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  return true;
}









uint8_t getFingerprintID() {
  //get value for enrollment or mark attedance  
  Enrollmnt = Firebase.getBool("Start with Enrollment or Mark the Attendance/Enrollment");
  MarkTheAtttendance = Firebase.getBool("Start with Enrollment or Mark the Attendance/Mark_The_Attedance");
  uint8_t q = finger.getImage();
  delay(100);
  switch (q) {
    case FINGERPRINT_OK:
//      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
        if(Enrollmnt == 1 && MarkTheAtttendance == 0){
           StartEnrollment();
        }else if(Enrollmnt == 0 && MarkTheAtttendance == 1){           //don't ned to run this at full speed.
           getFingerprintID();
        }else{
          loop();
        }
        return q;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return q;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return q;
    default:
      Serial.println("Unknown error");
      return q;
  }

  // OK success!

  q= finger.image2Tz();
  switch (q) {
    case FINGERPRINT_OK:
//      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return q;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return q;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return q;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return q;
    default:
      Serial.println("Unknown error");
      return q;
  }

  // OK converted!
  q = finger.fingerSearch();
  if (q == FINGERPRINT_OK) {
//    Serial.println("Found a print match!");
  } else if (q == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return q;
  } else if (q == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    while(!finger.getImage());
    return q;
  } else {
    Serial.println("Unknown error");
    return q;
  }

  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);

  // update value
  Firebase.setInt("/Found_IDs/ID", finger.fingerID);
  while(!finger.getImage());
  return finger.fingerID;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t q = finger.getImage();
  if (q != FINGERPRINT_OK)  return -1;

  q = finger.image2Tz();
  if (q != FINGERPRINT_OK)  return -1;

  q = finger.fingerFastSearch();
  if (q != FINGERPRINT_OK) return -1;
  

  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);
  return finger.fingerID;
}
