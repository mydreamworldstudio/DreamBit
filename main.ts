
//% color=#0fbc11 icon="\uf1b9" block="Motor Driver"
namespace MotorDriver {
    // Define pins for Motor A and Motor B
    let ENA_PIN = AnalogPin.P13; // Speed control for Motor A
    let IN1_PIN = DigitalPin.P9; // Direction control for Motor A
    let IN2_PIN = DigitalPin.P12; // Direction control for Motor A

    let ENB_PIN = AnalogPin.P14; // Speed control for Motor B
    let IN3_PIN = DigitalPin.P15; // Direction control for Motor B
    let IN4_PIN = DigitalPin.P16; // Direction control for Motor B

    /**
     * Set Motor A speed and direction
     * @param speed -100 to 100, where positive is forward and negative is backward
     */
    //% block="Set Motor A speed to $speed"
    //% speed.min=-100 speed.max=100
    export function setMotorASpeed(speed: number): void {
        setMotorSpeed(speed, ENA_PIN, IN1_PIN, IN2_PIN);
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
     * Stop both motors
     */
    //% block="Stop both motors"
    export function stopMotors(): void {
        pins.analogWritePin(ENA_PIN, 0);
        pins.analogWritePin(ENB_PIN, 0);
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
