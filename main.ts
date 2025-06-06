//% color=#ff6f61 icon="\uf135" block="Dreambit"
namespace Dreambit {

    // Motor Driver Submodule
    //% color=#0fbc11 icon="\uf1b9" block="Motor Driver"
    export namespace MotorDriver {
        const ENA = AnalogPin.P13;
        const IN1 = DigitalPin.P9;
        const IN2 = DigitalPin.P12;
        const ENB = AnalogPin.P14;
        const IN3 = DigitalPin.P15;
        const IN4 = DigitalPin.P16;

        //% block="set Motor A speed to %speed"
        //% speed.min=-100 speed.max=100
        //% group="Motors"
        export function setMotorASpeed(speed: number): void {
            setMotorSpeed(speed, ENA, IN1, IN2);
        }

        //% block="set Motor B speed to %speed"
        //% speed.min=-100 speed.max=100
        //% group="Motors"
        export function setMotorBSpeed(speed: number): void {
            setMotorSpeed(speed, ENB, IN3, IN4);
        }

        //% block="stop both motors"
        //% group="Motors"
        export function stopMotors(): void {
            pins.analogWritePin(ENA, 0);
            pins.analogWritePin(ENB, 0);
        }

        function setMotorSpeed(speed: number, en: AnalogPin, in1: DigitalPin, in2: DigitalPin): void {
            if (speed < 0) {
                pins.digitalWritePin(in1, 0);
                pins.digitalWritePin(in2, 1);
            } else {
                pins.digitalWritePin(in1, 1);
                pins.digitalWritePin(in2, 0);
            }
            pins.analogWritePin(en, Math.map(Math.abs(speed), 0, 100, 0, 1023));
        }
    }

    // Sonar Submodule
    export enum PingUnit {
        //% block="μs"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    //% color=#0fbc11 icon="" block="Ultrasonic Sensor"
    export namespace Sonar {
        //% block="ping trig %trig|echo %echo|unit %unit"
        //% group="Ultrasonic Sensor"
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
}
