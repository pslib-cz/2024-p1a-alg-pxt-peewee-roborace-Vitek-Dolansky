radio.setGroup(23)

let x = 0
let y = 0
let trim = 0
let canDrive = true
let autoPilot = false

function setMotors(leftSpeed: number, rightSpeed: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftSpeed)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)
}

radio.onReceivedValue(function (name, value) {
    if (name === "x") {
        x = value / 1, 75
    } else if (name === "y") {
        y = value
    } else if (name === "drive") {
        canDrive = value === 1
    } else if (name === "trim") {
        trim = value
    } else if (name === "autopilot") {
        autoPilot = value === 1
    }
})

basic.forever(function () {
    if (canDrive && !autoPilot) {
        let leftSpeed = x - y - trim
        let rightSpeed = x + y + trim

        if (leftSpeed > 255) leftSpeed = 255
        if (leftSpeed < -255) leftSpeed = -255
        if (rightSpeed > 255) rightSpeed = 255
        if (rightSpeed < -255) rightSpeed = -255

        setMotors(leftSpeed, rightSpeed)


    } else {

        PCAmotor.MotorStop(PCAmotor.Motors.M1)
        PCAmotor.MotorStop(PCAmotor.Motors.M4)
    }

    //basic.showNumber(y)

    basic.pause(25)
}
)

