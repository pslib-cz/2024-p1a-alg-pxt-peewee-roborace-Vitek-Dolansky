
type IRC = {
    l: DigitalPin,
    r: DigitalPin,
    c: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P15,
    r: DigitalPin.P13,
    c: DigitalPin.P14,
}

pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);



function forward() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 150)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -150)
}
function left() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -50)
}
function right() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 50)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
}
function stop() {
    PCAmotor.MotorStopAll()
}


basic.forever(function () {
    let dataL = pins.digitalReadPin(IR.l)
    let dataR = pins.digitalReadPin(IR.r)
    let dataC = pins.digitalReadPin(IR.c)
    console.log([dataL, dataC, dataR]);
    if (dataC === 1) {
        forward()
    } else if (dataL === 1) {
        left()
    } else if (dataR === 1) {
        right()
    } else {
        stop()
    }


    input.onButtonPressed(Button.AB, function() {
        basic.showNumber(dataC)
    })

    input.onButtonPressed(Button.A, function () {
        basic.showNumber(dataR)
    })

    input.onButtonPressed(Button.B, function () {
        basic.showNumber(dataL)
    })

    basic.pause(20)
})