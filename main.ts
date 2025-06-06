
//% color=#0000ff icon="\uf1b9" block="DreamBit Motor"
namespace MotorDriver {
    // Define pins for Motor A and Motor B
    let ENA_PIN = AnalogPin.P14; // Speed control for Motor A
    let IN1_PIN = DigitalPin.P15; // Direction control for Motor A
    let IN2_PIN = DigitalPin.P16; // Direction control for Motor A

    let ENB_PIN = AnalogPin.P13; // Speed control for Motor B
    let IN3_PIN = DigitalPin.P9; // Direction control for Motor B
    let IN4_PIN = DigitalPin.P12; // Direction control for Motor B

    /**
     * Stop both motors
     */
    //% block="Stop both motors"
    export function stopMotors(): void {
        pins.analogWritePin(ENA_PIN, 0);
        pins.analogWritePin(ENB_PIN, 0);
    }

    /**
     * Set Motor A and Motor B speeds
     * @param speedA -100 to 100 for Motor A
     * @param speedB -100 to 100 for Motor B
     */
    //% block="Set Motor A speed to $speedA and Motor B speed to $speedB"
    //% speedA.min=-100 speedA.max=100
    //% speedB.min=-100 speedB.max=100
    export function setBothMotorSpeeds(speedA: number, speedB: number): void {
        setMotorSpeed(speedA, ENA_PIN, IN1_PIN, IN2_PIN);
        setMotorSpeed(speedB, ENB_PIN, IN3_PIN, IN4_PIN);
    }
    
     /**
     * Set Motor B speed and direction
     * @param speed -100 to 100, where positive is forward and negative is backward
     */
    //% block="Set Motor B speed to $speed"
    //% speed.min=-100 speed.max=100
    export function setMotorBSpeed(speed: number): void {
        setMotorSpeed(speed, ENB_PIN, IN3_PIN, IN4_PIN);
    }
    
     /**
     * Set Motor A speed and direction
     * @param speed -100 to 100, where positive is forward and negative is backward
     */
    //% block="Set Motor A speed to $speed"
    //% speed.min=-100 speed.max=100
    export function setMotorASpeed(speed: number): void {
        setMotorSpeed(speed, ENA_PIN, IN1_PIN, IN2_PIN);
    }

    // Helper function to set motor speed and direction
    function setMotorSpeed(speed: number, enPin: AnalogPin, in1: DigitalPin, in2: DigitalPin): void {
        if (speed < 0) {
            // Backward direction
            pins.digitalWritePin(in1, 0);
            pins.digitalWritePin(in2, 1);
        } else {
            // Forward direction
            pins.digitalWritePin(in1, 1);
            pins.digitalWritePin(in2, 0);
        }
        // Control speed with PWM (absolute value of speed)
        pins.analogWritePin(enPin, Math.map(Math.abs(speed), 0, 100, 0, 1023));
    }
}


//% color=#3674bf icon="\uf085" block="DreamBit Servo"
namespace ServoControl {

    export enum ServoType {
        //% block="180°"
        Servo180 = 180,
        //% block="270°"
        Servo270 = 270,
        //% block="360°"
        Servo360 = 360
    }

    export enum ServoDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse,
        //% block="stop"
        Stop
    }

    // Limit pin selection to specific pins only
    export enum ServoPin {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2,
        //% block="P8"
        P8 = AnalogPin.P8
    }

    /**
     * Set the angle of a standard servo (180°, 270°, or 360°) connected to the selected pin.
     */
    //% block="Set %servoType servo on pin %pin to %angle°"
    //% angle.min=0 angle.max=360
    //% group="Standard Servo"
    export function setServoAngle(servoType: ServoType, pin: ServoPin, angle: number): void {
        let maxAngle = servoType as number;
        angle = Math.clamp(0, maxAngle, angle);

        // Map angle to pulse width range (0.5ms–2.5ms)
        const pulse = Math.map(angle, 0, maxAngle, 500, 2500);
        pins.servoSetPulse(pin, pulse);
    }

    /**
     * Control a 360° continuous rotation servo using direction and speed.
     */
    //% block="Set continuous servo on pin %pin direction %direction with speed %speed"
    //% speed.min=0 speed.max=100
    //% group="Continuous Servo"
    export function controlContinuousServo(pin: ServoPin, direction: ServoDirection, speed: number): void {
        speed = Math.clamp(0, 100, speed);
        let angle = 90;

        switch (direction) {
            case ServoDirection.Forward:
                angle = Math.map(speed, 0, 100, 90, 0);
                break;
            case ServoDirection.Reverse:
                angle = Math.map(speed, 0, 100, 90, 180);
                break;
            case ServoDirection.Stop:
                angle = 90;
                break;
        }

        pins.servoWritePin(pin, angle);
    }
}


//% color=#00008a icon="\uf06e" block="DreamBit Sonar"
namespace sonar {

    export enum PingUnit {
        //% block="μs"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    export enum SonarPin {
        //% block="P0"
        P0 = DigitalPin.P0,
        //% block="P1"
        P1 = DigitalPin.P1,
        //% block="P2"
        P2 = DigitalPin.P2,
        //% block="P5"
        P5 = DigitalPin.P5,
        //% block="P8"
        P8 = DigitalPin.P8,
        //% block="P11"
        P11 = DigitalPin.P11
    }

    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    //% weight=90
    export function ping(trig: SonarPin, echo: SonarPin, unit: PingUnit, maxCmDistance = 500): number {
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return d / 58;
            case PingUnit.Inches: return d / 148;
            default: return d;
        }
    }
}

