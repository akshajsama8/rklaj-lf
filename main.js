song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup() {
    
    canvas = createCanvas(550, 550);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function gotPoses(results){
    if(results.length > 0) 
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X = ' + leftWristX + ' Left Wrist Y = ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X = ' + rightWristX + ' Right Wrist Y = ' + rightWristY)
    }
}

function draw(){
    image(video, 0, 0, 550, 550);
    fill("#E12D2E");
    stroke("#E12D2E");
    // Volume Circles
    if (leftWristY > rightWristY){
        circle(leftWristX, leftWristY, 20);
        song = loadSound("pink.mp3")
    }
    if (rightWristY > leftWristY){
        circle(leftWristX, leftWristY, 20);
        song = loadSound("music.mp3")
    }
}

function songPlay(){
    song.play();  
    song.setVolume(1);
    song.rate(1)
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}





