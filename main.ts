//% color=#0fbc11 icon="\uf1b9" block="DreamBit"
namespace dreambit {

    // Motor pin declarations (internal use, not shown as blocks)
    let ENA_PIN = AnalogPin.P13;
    let IN1_PIN = DigitalPin.P9;
    let IN2_PIN = DigitalPin.P12;
    let ENB_PIN = AnalogPin.P14;
    let IN3_PIN = DigitalPin.P15;
    let IN4_PIN = DigitalPin.P16;

    // --- GEAR MOTORS GROUP ---

    /**
     * Set Motor A speed and direction
     */
    //% block="Set Motor A speed to $speed"
    //% group="Gear Motors"
    //% blockNamespace="dreambit"
    //% speed.min=-100 speed.max=100
    export function setMotorASpeed(speed: number): void {
        setMotorSpeed(speed, ENA_PIN, IN1_PIN, IN2_PIN);
    }

    /**
     * Set Motor B speed and direction
     */
    //% block="Set Motor B speed to $speed"
    //% group="Gear Motors"
    //% blockNamespace="dreambit"
    //% speed.min=-100 speed.max=100
    export function setMotorBSpeed(speed: number): void {
        setMotorSpeed(speed, ENB_PIN, IN3_PIN, IN4_PIN);
    }

    /**
     * Set both motors' speed and direction
     */
    //% block="Set Motor A speed to $speedA and Motor B speed to $speedB"
    //% group="Gear Motors"
    //% blockNamespace="dreambit"
    //% speedA.min=-100 speedA.max=100
    //% speedB.min=-100 speedB.max=100
    export function setBothMotorSpeeds(speedA: number, speedB: number): void {
        setMotorSpeed(speedA, ENA_PIN, IN1_PIN, IN2_PIN);
        setMotorSpeed(speedB, ENB_PIN, IN3_PIN, IN4_PIN);
    }

    /**
     * Stop both motors
     */
    //% block="Stop both motors"
    //% group="Gear Motors"
    //% blockNamespace="dreambit"
    export function stopMotors(): void {
        pins.analogWritePin(ENA_PIN, 0);
        pins.analogWritePin(ENB_PIN, 0);
    }

    // Internal helper
    function setMotorSpeed(speed: number, enPin: AnalogPin, in1: DigitalPin, in2: DigitalPin): void {
        if (speed < 0) {
            pins.digitalWritePin(in1, 0);
            pins.digitalWritePin(in2, 1);
        } else {
            pins.digitalWritePin(in1, 1);
            pins.digitalWritePin(in2, 0);
        }
        pins.analogWritePin(enPin, Math.map(Math.abs(speed), 0, 100, 0, 1023));
    }

    // --- ULTRASONIC SENSOR GROUP ---

    //% block="μs"
    //% group="Ultrasonic Sensor"
    //% blockNamespace="dreambit"
    export enum PingUnit {
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /**
     * Send a ping and get the distance.
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    //% group="Ultrasonic Sensor"
    //% blockNamespace="dreambit"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        let d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return d / 58;
            case PingUnit.Inches: return d / 148;
            default: return d;
        }
    }
}
