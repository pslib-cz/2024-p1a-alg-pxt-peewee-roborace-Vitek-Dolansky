radio.setGroup(23)

let x = 0
let y = 0
let trim = 0
let mode = "manual"

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
    if (name === "trim") {
        trim = value
    } else if (name === "mode") {
        mode = value === 1 ? "auto" : "manual"
    }
})

radio.onReceivedString(function (receivedString: string) {
    let parts = receivedString.split(",")
    if (parts.length == 2) {
        x = parseInt(parts[0])
        y = parseInt(parts[1])
    }
})

basic.forever(function () {
    if (mode === "manual") {
        let leftSpeed = x - y - trim
        let rightSpeed = x + y + trim

        leftSpeed = Math.max(-255, Math.min(255, leftSpeed))
        rightSpeed = Math.max(-255, Math.min(255, rightSpeed))

        setMotors(leftSpeed, rightSpeed)
    } else if (mode === "auto") {
        let dataL = pins.digitalReadPin(IR.l)
        let dataC = pins.digitalReadPin(IR.c)
        let dataR = pins.digitalReadPin(IR.r)

        if (dataC === 1) {
            setMotors(150, 150)
        } else if (dataL === 1) {
            setMotors(150, 100)
        } else if (dataR === 1) {
            setMotors(100, 150)
        } else {
            setMotors(0, 0)
        }

    } else {
        PCAmotor.MotorStop(PCAmotor.Motors.M1)
        PCAmotor.MotorStop(PCAmotor.Motors.M4)
    }

    basic.pause(25)
})