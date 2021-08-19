var song = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var score_leftWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    var canvas = createCanvas(600,490);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);

}
function draw(){
    image(video,0,0,600,490);

    fill("#ff0022");
    stroke("#ffffff");
    if(score_leftWrist > 0.2){
        circle(leftWristX,leftWristY,30);
        var in_number_leftWristY = Number(leftWristY);
        var remove_decimals = floor(in_number_leftWristY);
        var volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume ;
        song.setVolume(volume);
    
    }
   
    if(score_rightWrist > 0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
        song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
            }
        else if(rightWristY > 200 && rightWristY <= 300){
                document.getElementById("speed").innerHTML = "Speed: 1.5x";
                song.rate(1.5);
                }   
        else if(rightWristY > 300 && rightWristY <= 400){
                    document.getElementById("speed").innerHTML = "Speed: 2x";
                    song.rate(2);
                    } 
        else if(rightWristY > 400){
                        document.getElementById("speed").innerHTML = "Speed: 2.5x";
                        song.rate(2.5);
                        }
    }
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + "Left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + "Right wrist Y = " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of left_Wrist = " + score_leftWrist);
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Right_Wrist = " + score_rightWrist);

    }
}
function modelLoaded(){
    console.log("Model Loaded!");
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}



