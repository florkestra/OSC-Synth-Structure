chrome.system.network.getNetworkInterfaces( function(interfaces){
  
  for ( var i = 0 ; i < interfaces.length; i++){
    if ( interfaces[i].prefixLength === 24){ // only print the IP4 address
      document.getElementById("list").innerText = interfaces[i].address;
    }
    console.log(interfaces[i]);  
  }
  
});

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57110
});

udpPort.on("open", function () {
    document.getElementById("message").innerText = "Listening for UDP on port " + udpPort.options.localPort;
});


udpPort.on("error", function (err) {
    throw new Error(err);
});

udpPort.open();



udpPort.on("message", function(message){
  console.log(oscMsg);
  document.getElementById("message").innerText = message.address + "   " + message.args;
    switch (message.address){
    case "/1/faderA":
        synth.set("Main.source.freq.freq", message.args[0]*600);
        break;
    case "/1/faderB":
        synth.set("Main.source.freq.mul", message.args[0]*400);
        break;
    case "/1/rotaryA":
        synth.set("Main.numGrains.end", message.args[0]*100);
        break;
    case "/1/rotaryB":
        synth.set("Main.delayDur", message.args[0]*8+1);
        break;
  }    
    
});
    
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
