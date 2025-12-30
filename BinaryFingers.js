
// binary fingers

/*

The following sites were referred:

https://learn.ml5js.org/#/reference/handpose

https://editor.p5js.org/tkyko13/sketches/oPRDIiUb9

https://zenn.dev/tkyko13/scraps/b028812b0b9dc3

*/


let HandPose;
let handResult;


let canvas ;

var digital= "00000";
let f0=0, f1=0, f2=0, f3=0, f4=0;



	let hand_center_x;
	let hand_center_y;
	let global_hand;



	let hand_img_cx, hand_img_cy;


function setup(){
}


function my_setup0(){

	canvas = createCanvas(window.innerWidth, window.innerHeight);
	fill(255,   255, 255);
	rect(0, 0,window.innerWidth, window.innerHeight);

console.log("option_camera_id",  option_camera_id);

	if(typeof option_camera_id === 'undefined' || option_camera_id == null || !Object.keys(option_camera_id).length){
		my_option_camera_id['video'] = true;
		my_option_camera_id['audio'] = false;
	}else{
		my_option_camera_id = option_camera_id;
	}

console.log("my_option_camera_id",my_option_camera_id);


	video = createCapture(my_option_camera_id, () => {

		HandPose = ml5.handpose(video);


		HandPose.on('predict', result => {
			handResult = result;
		});

	});

	video.hide();

	// dummy
	hand_video =createCapture(my_option_camera_id, () => {
	});
	hand_video.hide();

}






      
function my_setup() {

		HandPose = ml5.handpose(video);
		HandPose.on('predict', result => {
			handResult = result;
		});

//	video.hide();

}








