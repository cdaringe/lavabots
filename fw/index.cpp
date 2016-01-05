int DOs [8] = { D0, D1, D2, D3, D4, D5, D6, D7 };
char DOchars [9] = { '0', '0','0','0','0','0','0', '\0' };
int myLED = DOs[0];
int onBoardLED = DOs[7];
void setup()
{
    Particle.function("togglebit", togglebit);
    for (size_t i = 0; i < sizeof(DOs); ++i) {
        pinMode(DOs[i], OUTPUT);
        digitalWrite(DOs[i], LOW);
    }
    digitalWrite(onBoardLED, HIGH);
}

void loop()
{
  delay(200);
}

int togglebit(String inpin)
{
    int pin = DOs[inpin.toInt()];
    int val = digitalRead(pin);
    if (val == HIGH) {
        DOchars[pin] = '0';
        digitalWrite(pin, LOW);
    } else {
        DOchars[pin] = '1';
        digitalWrite(pin, HIGH);
    }
    Particle.publish("digital-out-update", String(DOchars));
    return 1;
}



// /* Function prototypes -------------------------------------------------------*/
// int tinkerDigitalRead(String pin);
// int tinkerDigitalWrite(String command);
// int tinkerAnalogRead(String pin);
// int tinkerAnalogWrite(String command);

// /* This function is called once at start up ----------------------------------*/
// void setup()
// {
//     //Setup the Tinker application here

//     //Register all the Tinker functions
//     Particle.function("digitalread", tinkerDigitalRead);
//     Particle.function("digitalwrite", tinkerDigitalWrite);
//     Particle.function("togglebit", togglebit);
//     Particle.function("analogread", tinkerAnalogRead);
//     Particle.function("analogwrite", tinkerAnalogWrite);

// }

// /* This function loops forever --------------------------------------------*/
// void loop()
// {
//     //This will run in a loop
// }

// /*******************************************************************************
//  * Function Name  : tinkerDigitalRead
//  * Description    : Reads the digital value of a given pin
//  * Input          : Pin
//  * Output         : None.
//  * Return         : Value of the pin (0 or 1) in INT type
//                     Returns a negative number on failure
//  *******************************************************************************/
// int tinkerDigitalRead(String pin)
// {
//     //convert ascii to integer
//     int pinNumber = pin.charAt(1) - '0';
//     //Sanity check to see if the pin numbers are within limits
//     if (pinNumber< 0 || pinNumber >7) return -1;

//     if(pin.startsWith("D"))
//     {
//         pinMode(pinNumber, INPUT_PULLDOWN);
//         return digitalRead(pinNumber);
//     }
//     else if (pin.startsWith("A"))
//     {
//         pinMode(pinNumber+10, INPUT_PULLDOWN);
//         return digitalRead(pinNumber+10);
//     }
//     return -2;
// }

// /*******************************************************************************
//  * Function Name  : tinkerDigitalWrite
//  * Description    : Sets the specified pin HIGH or LOW
//  * Input          : Pin and value
//  * Output         : None.
//  * Return         : 1 on success and a negative number on failure
//  *******************************************************************************/
// int tinkerDigitalWrite(String command)
// {
//     bool value = 0;
//     //convert ascii to integer
//     int pinNumber = command.charAt(1) - '0';
//     //Sanity check to see if the pin numbers are within limits
//     if (pinNumber< 0 || pinNumber >7) return -1;

//     if(command.substring(3,7) == "HIGH") value = 1;
//     else if(command.substring(3,6) == "LOW") value = 0;
//     else return -2;

//     if(command.startsWith("D"))
//     {
//         pinMode(pinNumber, OUTPUT);
//         digitalWrite(pinNumber, value);
//         return 1;
//     }
//     else if(command.startsWith("A"))
//     {
//         pinMode(pinNumber+10, OUTPUT);
//         digitalWrite(pinNumber+10, value);
//         return 1;
//     }
//     else return -3;
// }

// /*******************************************************************************
//  * Function Name  : tinkerAnalogRead
//  * Description    : Reads the analog value of a pin
//  * Input          : Pin
//  * Output         : None.
//  * Return         : Returns the analog value in INT type (0 to 4095)
//                     Returns a negative number on failure
//  *******************************************************************************/
// int tinkerAnalogRead(String pin)
// {
//     //convert ascii to integer
//     int pinNumber = pin.charAt(1) - '0';
//     //Sanity check to see if the pin numbers are within limits
//     if (pinNumber< 0 || pinNumber >7) return -1;

//     if(pin.startsWith("D"))
//     {
//         return -3;
//     }
//     else if (pin.startsWith("A"))
//     {
//         return analogRead(pinNumber+10);
//     }
//     return -2;
// }

// /*******************************************************************************
//  * Function Name  : tinkerAnalogWrite
//  * Description    : Writes an analog value (PWM) to the specified pin
//  * Input          : Pin and Value (0 to 255)
//  * Output         : None.
//  * Return         : 1 on success and a negative number on failure
//  *******************************************************************************/
// int tinkerAnalogWrite(String command)
// {
//     //convert ascii to integer
//     int pinNumber = command.charAt(1) - '0';
//     //Sanity check to see if the pin numbers are within limits
//     if (pinNumber< 0 || pinNumber >7) return -1;

//     String value = command.substring(3);

//     if(command.startsWith("D"))
//     {
//         pinMode(pinNumber, OUTPUT);
//         analogWrite(pinNumber, value.toInt());
//         return 1;
//     }
//     else if(command.startsWith("A"))
//     {
//         pinMode(pinNumber+10, OUTPUT);
//         analogWrite(pinNumber+10, value.toInt());
//         return 1;
//     }
//     else return -2;
// }

// int togglebit(String pin)
// {
//     //convert ascii to integer
//     int val = tinkerDigitalRead(pin);
//     if (val > 0) return digitalWrite(pin.toInt(), LOW);
//     return digitalWrite(val.toInt(), HIGH);
// }
