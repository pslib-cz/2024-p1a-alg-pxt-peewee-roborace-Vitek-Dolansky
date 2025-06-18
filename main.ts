
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
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -100)
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

let last_side = "";
basic.forever(function () {
    let dataL = pins.digitalReadPin(IR.l)
    let dataR = pins.digitalReadPin(IR.r)
    let dataC = pins.digitalReadPin(IR.c)

    console.log([dataL, dataC, dataR]);
    console.log(last_side)
    if (dataC === 1) {
        forward()
        console.log("forward")
    } else if (dataL === 1 && dataR === 0) {
        left()
        last_side = "l";
        console.log("left")
    } else if (dataR === 1 && dataL === 0) {
        right()
        last_side = "r";
        console.log("right")
    } else {
        
        if (last_side === "r") {
            right()
        }
        else if (last_side === "l") {
            left()
        }
    }


    input.onButtonPressed(Button.AB, function () {
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