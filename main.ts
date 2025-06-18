
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



//function forward() {
//    PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
//    PCAmotor.MotorRun(PCAmotor.Motors.M4, -200)
//}
//function left() {
//    PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
//    PCAmotor.MotorRun(PCAmotor.Motors.M4, -50)
//}
//function right() {
//    PCAmotor.MotorRun(PCAmotor.Motors.M1, 50)
//    PCAmotor.MotorRun(PCAmotor.Motors.M4, -200)
//}


//let last_side = "";


basic.forever(function () {
    let dataL = pins.digitalReadPin(IR.l)
    let dataR = pins.digitalReadPin(IR.r)
    let dataC = pins.digitalReadPin(IR.c)

    //console.log([dataL, dataC, dataR]);
//
    //console.log(last_side)
    //
//
    //console.log(last_side)
//
    if (dataC === 1) {
        //forward()
        //console.log("forward")
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -200)
        basic.pause(10)

    } 
    //else 
    if (dataL === 1) {
        //left()
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 150)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
        //last_side = "l"
        //console.log("left")
        basic.pause(10)
    } 
    //else 
    if (dataR === 1) {
        //right()
        PCAmotor.MotorRun(PCAmotor.Motors.M1, -100)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -150)
        //last_side = "r"
        //console.log("right")
        basic.pause(10)
    } /*else {
        
        if (last_side === "r") {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -100)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -200)
        }
        else if (last_side === "l") {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
        }
    } */

    basic.pause(10)
})