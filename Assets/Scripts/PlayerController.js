#pragma strict

var speed : float;
var animator : Animator;
var collider : BoxCollider2D;
var UIText : GameObject;
var spawner : GameObject;
var boundsMin : Vector3;
var boundsMax : Vector3;

function Start () {
	boundsMin = Camera.main.ScreenToWorldPoint(Vector3(16, 32, 0));
	boundsMax = Camera.main.ScreenToWorldPoint(Vector3(Screen.width - 16, Screen.height - 32, 0));
}

function Update () {
	var direction = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical")) * speed * Time.deltaTime;
	transform.Translate(direction.x, direction.y, 0);
	transform.position = Vector3(Mathf.Clamp(transform.position.x, boundsMin.x, boundsMax.x), Mathf.Clamp(transform.position.y, boundsMin.y, boundsMax.y), 0);

	if (direction.x < 0) {
		animator.SetInteger("direction", 4);
	} else if (direction.x > 0) {
		animator.SetInteger("direction", 2);
	} else if (direction.y < 0) {
		animator.SetInteger("direction", 3);
	} else if (direction.y > 0) {
		animator.SetInteger("direction", 1);
	} else {
		animator.SetInteger("direction", 0);
	}	
}

function OnCollisionEnter2D(collision: Collision2D) {
	if (collision.gameObject.tag == "Monster") {
		Application.LoadLevel (Application.loadedLevel);
		
	} else if (collision.gameObject.tag == "Treasure") {
		Debug.Log(collision.gameObject.name.Substring(0, 6));
	
		var points : int;
		var treasureType = spawner.GetComponent(SpawnItem).treasure;
		
		for (var i=0;i<treasureType.length;i++) {
			if (treasureType[i].name == collision.gameObject.name.Substring(0, 6)) {
				points = (i + 1) * 5;
				Debug.Log(points);
			}
		}
		
		spawner.GetComponent(SpawnItem).spawnCoin();
		Destroy(collision.gameObject);
		UIText.SendMessage("scoreCount", points);
	}
}