//#pragma strict

var spawnTime : int;
var monster : GameObject;
var treasure : GameObject[];

function getPosition() {
	var position = Camera.main.ScreenToWorldPoint(Vector3(Random.Range (16, Screen.width - 16), Random.Range (16, Screen.height - 16), 0));
	position.z = 0;
	return position;
}

function Start () {

}

function Update () {
	if (!spawnTime) {
		Instantiate(monster, getPosition(), Quaternion.identity);
		spawnTime = Random.Range(100, 200);
	} else {
		spawnTime--;
	}
}

function spawnCoin() {
	var randomIndex = Random.Range(0, 6);
	var newTreasure = Instantiate(treasure[randomIndex], getPosition(), Quaternion.identity);
}