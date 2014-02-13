# FIRST Team 342 NetConsole

## Description

This is a NodeJS module designed to listen for and send messages to the FRC cRIO via the NetConsole feature..

## Example

### Listening for console message.

```
var NetConsole = require('frc-netconsole').NetConsole;

var console = new NetConsole(342);

console.connect();

console.onMessage(function(message, info) {
  console.log(message.toString());
});

```

### Sending console message.

```
var NetConsole = require('frc-netconsole').NetConsole;

var console = new NetConsole(342);

console.connect();

console.send("reboot");

```
