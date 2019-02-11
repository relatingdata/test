//
// Laser Cut and folded acrylic box 
// lid and tabs coming :-) ;-)
//

const side = (L, W, R) => {const ll = L/2 - R, ww = W/2 - R;
                           return hull([[ll, ww], [-ll, ww], [ll, -ww], [-ll, -ww]].map(c => circle(R).translate(c)))},
 
      L = 128,l = L/2,
      W = 48, w = W/2,
      H = 20, h = H/2,
      R = 3,
      t = 3, T = 2*t, 
      r = 0.5, 
      B = H + T, 

      G = [[ l - R,  w - R],
           [-l + R,  w - R],
           [ l - R, -w + R],
           [-l + R, -w + R]],
           
      A = [[ l + h + R,  w + h + R],
           [-l - h - R,  w + h + R],
           [ l + h + R, -w - h - R],
           [-l - h - R, -w - h - R]],
           
      C = [[ l - R,  w - R],
           [-l + R,  w - R],
           [ l - R, -w + R],
           [-l + R, -w + R]],
           
     cc = [[ l - r,  w - R - r],
           [-l - r,  w - R - r],
           [ l - r, -w + R - r],
           [-l - r, -w + R - r],
           [ l - r,  w - r],
           [-l - r,  w - r],
           [ l - r, -w - r],
           [-l - r, -w - r]],
           
      F = [[-l - t,         w + h/2],
           [-l - h - h/2,   w ],
           [-l - t,        -w - h - h/2],
           [-l - h - h/2,  -w - t],
           [ l,             w + h/2],
           [ l + h/2,       w ],
           [ l,            -w - h  - h/2],
           [ l + h/2,      -w - t]],
     
      D = [[t, h],[h, t]],

tdie = () => difference(side(L + 2*H, W + 2*H, R),
                                    square({size: [L + T, W + T], center: true}),
                                    union(...A.map(c => circle({r: 1.5, center: true}).translate(c)))),
                                    
bdie =  () => difference(square({size:[L, W], center: true}),
                                    union(...G.map(c => circle({r: 1.25, center: true}).translate(c)))),
                                    
fold = () =>   difference(
                      union(square({size: [L, W], center:true}),
                            side(L + T, H, R).translate([-R,                   w + h - R]),
                            side(L + T, H, R).translate([-R,                  -w - h - R]),
                            side(H      , W, R).translate([-l - h - R, -R]),
                            side(H      , W, R).translate([ l + h - R,     -R]),
                            ...F.map((f, i) => i % 2 === 1 ? square({size: D[1], centre:true}).translate(f) : [])),
                      union( ...C.map(c => circle({r: 1.5, center: true}).translate(c)),
                            ...cc.map(c => circle(r).translate(c)),
                             ...F.map((f, i) => i % 2 === 0 ? square({size: D[0], centre:true}).translate(f) : []))),

main = () => union(color(`red`, linear_extrude({ height:t}, tdie())).translate([0,0,  t]),
                   color(`blue`,linear_extrude({ height:t}, fold())).translate([0,0,  0]),
                   color(`red`, linear_extrude({ height:t}, bdie())).translate([0,0, -t])).translate([0, 0, T*1.5]);

