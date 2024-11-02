// Motor Driver Extension for micro:bit

// Pin Definitions
const ENA = AnalogPin.P13; // Speed control for Motor A (PWM pin)
const IN1 = DigitalPin.P9; // Direction control for Motor A
const IN2 = DigitalPin.P12; // Direction control for Motor A
const ENB = AnalogPin.P14; // Speed control for Motor B (PWM pin)
const IN3 = DigitalPin.P15; // Direction control for Motor B
const IN4 = DigitalPin.P16; // Direction control for Motor B

// Initialize Motor Driver Pins
function setupMotorPins() {
    pins.analogWritePin(ENA, 0); // Set initial speed to 0
    pins.digitalWritePin(IN1, 0);
    pins.digitalWritePin(IN2, 0);
    pins.analogWritePin(ENB, 0); // Set initial speed to 0
    pins.digitalWritePin(IN3, 0);
    pins.digitalWritePin(IN4, 0);
}

// Function to Control Motor 1 (Motor A)
function motor1Control(speed: number): void {
    if (speed > 0) {
        pins.digitalWritePin(IN1, 1);  // Forward
        pins.digitalWritePin(IN2, 0);
    } else if (speed < 0) {
        pins.digitalWritePin(IN1, 0);  // Backward
        pins.digitalWritePin(IN2, 1);
        speed = -speed; // Make speed positive for PWM
    } else {
        pins.digitalWritePin(IN1, 0);  // Stop
        pins.digitalWritePin(IN2, 0);
    }
    pins.analogWritePin(ENA, Math.map(speed, 0, 100, 0, 1023)); // Map speed from 0-100 to 0-1023
}

// Function to Control Motor 2 (Motor B)
function motor2Control(speed: number): void {
    if (speed > 0) {
        pins.digitalWritePin(IN3, 1);  // Forward
        pins.digitalWritePin(IN4, 0);
    } else if (speed < 0) {
        pins.digitalWritePin(IN3, 0);  // Backward
        pins.digitalWritePin(IN4, 1);
        speed = -speed; // Make speed positive for PWM
    } else {
        pins.digitalWritePin(IN3, 0);  // Stop
        pins.digitalWritePin(IN4, 0);
    }
    pins.analogWritePin(ENB, Math.map(speed, 0, 100, 0, 1023)); // Map speed from 0-100 to 0-1023
}

// Public API for the extension
namespace motorDriver {
    // Function to initialize the motor driver
    export function init(): void {
        setupMotorPins();
    }

    // Function to control Motor 1
    export function controlMotor1(speed: number): void {
        motor1Control(speed);
    }

    // Function to control Motor 2
    export function controlMotor2(speed: number): void {
        motor2Control(speed);
    }
}

// Example Usage
motorDriver.init();
motorDriver.controlMotor1(50);   // Motor 1 moves forward at 50% speed
motorDriver.controlMotor2(-75);  // Motor 2 moves backward at 75% speed
