# 🌟 DreamBit Extension for micro:bit

![DreamBit Banner](https://raw.githubusercontent.com/mydreamworldstudio/DreamBit/main/dreambit.png)

The **DreamBit Extension** brings motor control, ultrasonic distance sensing, and servo motor capabilities to your BBC micro:bit. Designed especially for classroom and STEM robotics projects, it helps students explore coding, electronics, and AI with ease.


---

## 🚀 Features

🔁 DC Gear Motor Control: Set speed and direction for Motor A and Motor B

🛑 Motor Stop: Stop all motors instantly with one block

📏 Ultrasonic Sensor (HC-SR04): Measure distance in cm, inches, or μs

🔄 Servo Motor Control:

Set angle for 180°, 270°, or 360° servos

Drive 360° continuous servos with direction and speed control

🧩 Easy-to-use MakeCode blocks

👨‍🏫 Ideal for students, makers, and robotics classes

---

## 🧱 Blocks Preview

![Blocks Example](https://raw.githubusercontent.com/mydreamworldstudio/DreamBit/main/blockexample.png)

---

## 📦 How to Use

1. Open [MakeCode Editor](https://makecode.microbit.org/)
2. Click on `Advanced` → `Extensions`
3. Paste this link:  
   `https://github.com/mydreamworldstudio/DreamBit`
4. Use the `DreamBit Motor`, `DreamBit Servo` and `DreamBit Sonar` blocks in your project

---

## 🛠️ Requirements
BBC micro:bit (v1 or v2)

DreamBit Extension Board

Servo motors (standard or 360° continuous)

Ultrasonic sensor (HC-SR04 recommended)

External 6-12V power supply for motors

---

## 💡 Created by Dream World Robotics
Learn more: [www.dreamworldrobotics.com](https://dreamworldrobotics.com/)
---

## 📄 License
MIT

---

## 🧪 Sample Code

```ts
// Motor Control Example
GearMotor.setMotorASpeed(80)
GearMotor.setMotorBSpeed(-80)
basic.pause(1000)
GearMotor.stopMotors()

// Sonar Distance Example
let distance = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
basic.showNumber(distance)

// Servo Angle Control Example
ServoControl.setServoAngle(ServoControl.Servo180, AnalogPin.P0, 90)


