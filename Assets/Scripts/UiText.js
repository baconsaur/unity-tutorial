//#pragma strict

var score : int;
var text;

function Start () {
	score = 0;
	text = GetComponent("Text");
	text.text = "Score: " + score;
}

function Update () {

}

function scoreCount(points : int) {
	score += points;
	text.text = "Score: " + score;
}