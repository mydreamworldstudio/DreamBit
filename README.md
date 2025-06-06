# 🌟 DreamBit Extension for micro:bit

![DreamBit Banner](https://raw.githubusercontent.com/mydreamworldstudio/DreamBit/main/dreambit.png)

The **DreamBit Extension** lets you control DC motors and read distance from an ultrasonic sensor using the BBC micro:bit. Designed for educational robotics projects, it’s perfect for students learning coding, electronics, and AI.

---

## 🚀 Features

- Control two gear motors with speed and direction
- Stop all motors with a single block
- Read distance using ultrasonic sonar sensor (in cm, inches, or microseconds)
- Easy-to-use MakeCode blocks
- Designed for classroom and STEM projects

---

## 🧱 Blocks Preview

![Blocks Example](https://raw.githubusercontent.com/mydreamworldstudio/DreamBit/main/blockexample.png)

---

## 📦 How to Use

1. Open [MakeCode Editor](https://makecode.microbit.org/)
2. Click on `Advanced` → `Extensions`
3. Paste this link:  
   `https://github.com/mydreamworldstudio/DreamBit`
4. Use the `DreamBit Motor` and `DreamBit Sonar` blocks in your project

---

## 🛠️ Requirements
BBC micro:bit (v1 or v2)

DreamBit Extension Board

Ultrasonic sensor (HC-SR04 recommended)

External 6-12V power supply for motors

---

💡 Created by

Dream World Robotics

Learn more: [www.dreamworldrobotics.com](https://dreamworldrobotics.com/)

---

## License
MIT

---

## 🧪 Sample Code

```ts
GearMotor.setMotorASpeed(80)
GearMotor.setMotorBSpeed(-80)
basic.pause(1000)
GearMotor.stopMotors()

let distance = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
basic.showNumber(distance)

