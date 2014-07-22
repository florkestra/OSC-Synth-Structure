// Use Chrome's system.network API to display local IP to the user
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

udpPort.on("message", function(message){
  document.getElementById("message").innerText = message.address + "   " + message.args;
});

udpPort.on("error", function (err) {
    throw new Error(err);
});

udpPort.open();

udpPort.on("message", function (oscMsg) {
    console.log(oscMsg);
    var oscMsgSplit = oscMsg.split(" ");
    var split = oscMsgSplit[1];
    var value = parseInt(split);
    this.synth.set("Main.source.freq.freq", value*400);
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
