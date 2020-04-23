"use strict";
//---------------------------------------------
var ctx;
var backgroundColor = "#000000";
var myCanvas, myFrameVar;
var myAngle = 0;
var obj, sun, mercury, venus, venusMoon, earth, mars, jupiter, saturn, uranus , neptune, plutone;
var objects = [];
var moons = [];
var planetoid;
var planetoids = [];
var star;
var stars = [];
//=================================================================================================

var myControls = new function(){
    this.speedOfRotation = 0.5;
    this.color = "#ffab17";
    this.howManyStars = 1000;
    this.howManyPlanetoids = 1000;
};


function updateCanvas() {
    myCanvas = document.getElementById( "barbarasCanvas" );
    ctx = myCanvas.getContext( "2d" );

    var myGUI = new dat.GUI();
    var scaleFolder = myGUI.addFolder('Solar system settings');
    scaleFolder.addColor(myControls,'color');
    scaleFolder.add(myControls,'speedOfRotation',-1.5, 1.5);
    scaleFolder.add(myControls,'howManyStars', 0, 5000);
    scaleFolder.add(myControls,'howManyPlanetoids', 0, 2000);

    scaleFolder.open();

    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.save();
    ctx.translate(0,0);

    //--------------------------------------------

    for (let i = 0; i < 5000; i++) {
        star = new Star();
        star.Color = '#ffffff';
        star.Radius = 0.5;
        star.setReferencePoint(myCanvas.width*Math.random(), myCanvas.height*Math.random());
        star.Alpha = Math.floor( Math.random() * 360 );
        stars.push(star);
    }

    for (let i = 0; i < 2000; i++) {
        planetoid = new Planetoid();
        planetoid.Color = '#efbf8c';
        planetoid.Radius = 590 + 100*Math.random();
        planetoid.planetRadius = 5;
        planetoid.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
        planetoid.Alpha = Math.floor( Math.random() * 360 );
        planetoids.push( planetoid );
    }


    sun = new Star();
    sun.Color = '#ffab17';
    sun.Radius = 48;
    sun.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    sun.Alpha = Math.floor( Math.random() * 360 );
    objects.push(sun);

    mercury = new Planet();
    mercury.Color = '#d2be5a';
    mercury.Radius = 150;
    mercury.planetRadius = 30;
    mercury.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    mercury.Alpha = Math.floor( Math.random() * 360 );
    objects.push( mercury );

    venus = new Planet();
    venus.Color = '#F6EC98';
    venus.Radius = 250;
    venus.planetRadius = 30;
    venus.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    venus.Alpha = Math.floor( Math.random() * 360 );
    objects.push( venus );

    venusMoon = new Moon();
    venusMoon.Radius = 100;
    venusMoon.moonColor = 'white';
    venusMoon.moonOrbitRadius = 30;
    venusMoon.moonRadius = 10;
    venusMoon.setReferencePoint(myCanvas.width/2+130, myCanvas.height/2+130);
    venusMoon.Alpha = Math.floor( Math.random() * 360 );
    venusMoon.Alpha = venus.Alpha;
    moons.push(venusMoon);

    earth = new PlanetWithMoon();
    earth.Color = '#3dd1d6';
    earth.Radius = 400;
    earth.planetRadius = 40;
    earth.moonColor = '#95998F';
    earth.moonOrbitRadius = 150;
    earth.moonRadius = 15;
    earth.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    earth.Alpha = Math.floor( Math.random() * 360 );
    objects.push( earth );

    mars = new Planet();
    mars.Color = '#aa1313';
    mars.Radius = 480;
    mars.planetRadius = 30;
    mars.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    mars.Alpha = Math.floor( Math.random() * 360 );
    objects.push( mars );

    jupiter = new Planet();
    jupiter.Color = '#7f5f1b';
    jupiter.Radius = 800;
    jupiter.planetRadius = 80;
    jupiter.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    jupiter.Alpha = Math.floor( Math.random() * 360 );
    objects.push( jupiter );

    saturn = new Planet();
    saturn.Color = '#eede02';
    saturn.Radius = 900;
    saturn.planetRadius = 50;
    saturn.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    saturn.Alpha = Math.floor( Math.random() * 360 );
    objects.push( saturn );

    uranus = new Planet();
    uranus.Color = '#0080d5';
    uranus.Radius = 1000;
    uranus.planetRadius = 60;
    uranus.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    uranus.Alpha = Math.floor( Math.random() * 360 );
    objects.push( uranus );

    neptune = new Planet();
    neptune.Color = '#0014cb';
    neptune.Radius = 1100;
    neptune.planetRadius =65;
    neptune.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    neptune.Alpha = Math.floor( Math.random() * 360 );
    objects.push( neptune );

    plutone = new Planet();
    plutone.Color = '#c1b665';
    plutone.Radius = 1200;
    plutone.planetRadius = 10;
    plutone.setReferencePoint(myCanvas.width/2, myCanvas.height/2);
    plutone.Alpha = Math.floor( Math.random() * 360 );
    objects.push( plutone );


    myFrameVar = setTimeout( nextFrame, 100 );
}
//=================================================================================================

//circle
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

function Planetoid() {
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

function Planet() {
    this.X = 0;
    this.Y = 0;
    this.display = function() {
        ctx.fillStyle = this.Color;
        //orbit
        ctx.beginPath();
        ctx.arc(this.X,this.Y,this.Radius/2,0,Math.PI*2,false);
        ctx.stroke();
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

        ctx.beginPath();
        ctx.arc(this.X,this.Y,this.Radius/2,0,Math.PI*2,false);
        ctx.stroke();
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
        ctx.beginPath();
        ctx.arc(this.X,this.Y,this.Radius/2,0,Math.PI*2,false);
        ctx.stroke();
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

    myAngle += myControls.speedOfRotation;
    myAngle %= 360;

    sun.Color = myControls.color;

    var maxRadius = objects[ 0 ].Radius;
    for ( let i = 1; i < objects.length; i ++ ) {
        if ( objects[ i ].Radius > maxRadius ) maxRadius = objects[ i ].Radius;
    }

    //start in background
    for ( let i = 0; i < myControls.howManyStars; i ++ ) {
        obj = stars[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        ctx.scale(1.5,1.5);
        obj.display();
        ctx.restore();
    }
    //planetoids
    for ( let i = 0; i < myControls.howManyPlanetoids; i ++ ) {
        obj = planetoids[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        ctx.scale(1.5,1.5);
        obj.display();
        ctx.restore();
    }
    //planets
    for ( let i = 0; i < objects.length; i ++ ) {
        obj = objects[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        ctx.scale(1.5,1.5);
        obj.display();
        ctx.restore();
    }
    //moons
    for ( let i = 0; i < moons.length; i ++ ) {
        obj = moons[ i ];
        let sinA = Math.sin( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        let cosA = Math.cos( ( myAngle + obj.Alpha ) * Math.PI / 180.0 * maxRadius / obj.Radius );
        ctx.save();
        ctx.transform( cosA, sinA, -sinA, cosA, obj.X0, obj.Y0 );
        obj.display();
        ctx.restore();
        ctx.save();
    }

    myFrameVar = setTimeout( nextFrame, 10 );
}
//=================================================================================================
