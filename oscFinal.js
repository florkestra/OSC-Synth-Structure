var synth = flock.synth({
           synthDef: {
               id: "Main",
               ugen: "flock.ugen.granulator",
               numGrains: {
                   ugen: "flock.ugen.line",
                   start: 40,
                   end: 40,
                   duration: 1
               },
               grainDur: {
                   ugen: "flock.ugen.line",
                   start: 0.1,
                   end: 0.005,
                   duration: 10000
               },
               delayDur: 8,
               mul: 0.5,
               source: {
                       ugen: "flock.ugen.triOsc",
                       freq: {
                           ugen: "flock.ugen.sin",
                           freq: 0.01,
                           mul: 1000,
                       },
                       mul: 4
                   }
               }
        }); 

synth.play();
