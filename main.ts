radio.setGroup(23)

let x = 0
let y = 0
let trim = 0
let canDrive = true
let autoPilot = false

type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    c: DigitalPin.P15,
    r: DigitalPin.P13
}
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);

function setMotors(leftSpeed: number, rightSpeed: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftSpeed)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)
}

radio.onReceivedValue(function (name, value) {
    if (name === "x") {
        x = value
    } else if (name === "y") {
        y = value
    } else if (name === "drive") {
        canDrive = value === 1
    } else if (name === "trim") {
        trim = value
    } else if (name === "autopilot") {
        autoPilot = true
    }
})

basic.forever(function () {
    if (canDrive && autoPilot === false) {
        let leftSpeed = x - y - trim
        let rightSpeed = x + y + trim

        if (leftSpeed > 255) leftSpeed = 255
        if (leftSpeed < -255) leftSpeed = -255
        if (rightSpeed > 255) rightSpeed = 255
        if (rightSpeed < -255) rightSpeed = -255

        setMotors(leftSpeed, rightSpeed)

    } else if (autoPilot === true) {

        let dataR = pins.digitalReadPin(IR.r);
        console.log(dataR);

        let dataC: number;
        dataC = pins.digitalReadPin(IR.c);
        console.log(dataC);

        let dataL: number;
        dataL = pins.digitalReadPin(IR.l);
        console.log(dataL);

        if (dataC === 0) {

            setMotors(150, 150);
        } else if (dataL === 0) {

            setMotors(100, 150);
        } else if (dataR === 0) {

            setMotors(150, 100);
        } else { setMotors(0, 0);
        }



    } else {
        PCAmotor.MotorStop(PCAmotor.Motors.M1)
        PCAmotor.MotorStop(PCAmotor.Motors.M4)
    }

    //basic.showNumber(y)

    basic.pause(25)
})