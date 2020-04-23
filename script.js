"use strict";
//---------------------------------------------
var ctx;
var backgroundColor = "#000000";
var myCanvas, myFrameVar;
var myAngle = 0;
var obj;
var sun;
var mercury;
var venus, venusMoon;
var earth;
var objects = [];
var moons = [];
//=================================================================================================

function updateCanvas() {
    myCanvas = document.getElementById( "barbarasCanvas" );
    ctx = myCanvas.getContext( "2d" );

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    //--------------------------------------------
    sun = new Star();
    sun.Color = 'green';
    sun.Radius = 10;
    sun.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    sun.Alpha = Math.floor( Math.random() * 360 );
    objects.push(sun);

    mercury = new Planet();
    mercury.Color = 'blue';
    mercury.Radius = 100;
    mercury.planetRadius = 20;
    mercury.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    mercury.Alpha = Math.floor( Math.random() * 360 );
    objects.push( mercury );

    venus = new Planet();
    venus.Color = 'blue';
    venus.Radius = 200;
    venus.planetRadius = 20;
    venus.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    venus.Alpha = Math.floor( Math.random() * 360 );
    objects.push( venus );

    venusMoon = new Moon();
    venusMoon.Radius = venus.Radius;
    venusMoon.moonColor = 'yellow';
    venusMoon.moonOrbitRadius = 50;
    venusMoon.moonRadius = 10;
    venusMoon.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    venusMoon.Alpha = venus.Alpha;
    moons.push(venusMoon);

    earth = new PlanetWithMoon();
    earth.Color = 'red';
    earth.Radius = 400;
    earth.planetRadius = 25;
    earth.moonColor = 'yellow';
    earth.moonOrbitRadius = 50;
    earth.moonRadius = 10;
    earth.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    earth.Alpha = Math.floor( Math.random() * 360 );
    objects.push( earth );

    myFrameVar = setTimeout( nextFrame, 100 );
}
//=================================================================================================


function Star() {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
        ctx.fillStyle = this.Color;
        ctx.beginPath();
        ctx.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    this.setReferencePoint = function(x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Planet() {
    this.X = 0;
    this.Y = 0;
    this.display = function() {
        ctx.fillStyle = this.Color;
        ctx.beginPath();
        ctx.arc(this.X, this.Y + this.Radius/2, this.planetRadius/4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    this.setReferencePoint = function(x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function PlanetWithMoon() {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
        ctx.fillStyle = this.Color;
        ctx.beginPath();
        ctx.arc(this.X, this.Y + this.Radius/2, this.planetRadius/4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = this.moonColor;
        ctx.beginPath();
        ctx.arc(this.X + this.moonOrbitRadius/2, this.Y + this.Radius/2, this.moonRadius/4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    this.setReferencePoint = function(x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Moon() {
    this.X = 0;
    this.Y = 0;
    this.display = function() {
        ctx.fillStyle = this.moonColor;
        ctx.beginPath();
        ctx.arc(this.X + this.moonOrbitRadius/2, this.Y + this.Radius/2, this.moonRadius/4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    this.setReferencePoint = function(x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

//=================================================================================================

function nextFrame() {
    ctx = myCanvas.getContext( "2d" );

    ctx.fillStyle = backgroundColor;
    ctx.clearRect( 0, 0, myCanvas.width, myCanvas.height );

    myAngle += 1;
    myAngle %= 360;

    var maxRadius = objects[ 0 ].Radius;
    for ( let i = 1; i < objects.length; i ++ ) {
        if ( objects[ i ].Radius > maxRadius ) maxRadius = objects[ i ].Radius;
    }

    //TODO księżyce muszą mieć porządny i osobny transform
    // będzie tablica obiektów działająca dla gwiazdy, zwykłych planet i planet z księżycami
    for ( let i = 0; i < objects.length; i ++ ) {
        obj = objects[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        obj.display();
        ctx.restore();
    }
    for ( let i = 0; i < moons.length; i ++ ) {
        obj = moons[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        obj.display();
        ctx.restore();
    }

    myFrameVar = setTimeout( nextFrame, 100 );
}
//=================================================================================================
