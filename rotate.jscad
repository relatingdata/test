
const D = 10,
R = 8,
r = 4,
t = 2,

main = () => rotate_extrude({startAngle : 0, angle: 360, overflow: 'cap', fn: 32},
                        translate([4,0,0], difference(circle({r: 2, fn: 64, center: true}),
                        circle({r: 1, fn: 64, center: true})))),

Nmain = () => rotate_extrude({startAngle : 0, angle: 360, overflow: 'cap', fn: 32}, translate([-5 ,0 ,0], difference(hull(circle({r:R, fn: 64, center: true}),
                                          circle({r: r, fn: 64, center: true}).translate([D,0])),
                                          hull(circle({r: R-t, fn: 64, center: true}),
                                          circle({r: r-t, fn: 64, center: true}).translate([D,0])),
                                     square({size: [R + r + D, R], center:true}).translate([3, -R/2])).rotateZ(90)));
