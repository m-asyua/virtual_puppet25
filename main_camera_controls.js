
let video;

let my_option_camera_id ={};

function setup(){
}

function main_camera_start(){

console.log("option_camera_id",  option_camera_id);

	if(typeof option_camera_id === 'undefined' || option_camera_id == null || !Object.keys(option_camera_id).length){
		my_option_camera_id['video'] = true;
		my_option_camera_id['audio'] = false;
	}else{
		my_option_camera_id = option_camera_id;
	}

console.log("my_option_camera_id",my_option_camera_id);

	video = createCapture(my_option_camera_id, () => {
	});
	video.hide();


	renderer.setSize(window.innerHeight * video.width       /  video.height,   window.innerHeight  );
	camera.aspect =   video.width /video.height ;
	camera.updateProjectionMatrix();

}



function main_camera_stop(){

	if(video != null ){
		video.remove();  // remove DOM element created by p5.js
		//// video.stop(); //XXcannot use. only stop video capture. The camera is still open.
		///		video=null;
  	}
}



function drawLandmarks(landmarks) {

	textSize(20);

	for (var i = 0; i < landmarks.length; i++) {

		if( i % 4 == 0  && i != 0){
			fill(255,   0, 0);
		}else{
			fill(0, 0, 0);
		}

		text(i, landmarks[i][0], landmarks[i][1]);

	}

}

function drawNumber(landmarks) {

	textSize(20);
//	fill(255, 255, 255);


if(display_hand_mark){

	for (var i = 0; i < landmarks.length; i++) {

		if( i % 4 == 0  && i != 0){
			fill(255,   0, 0);
			let n = i / 4 -1;
			let bit = Math.pow(2,n);


			text(bit, 
					landmarks[i][0] * (video.width   *   window.innerHeight   /  video.height)/video.width, 
					landmarks[i][1] * window.innerHeight/video.height
			);



		}

	}



}




	if(video && typeof handResult[0].annotations.thumb !== 'undefined'){
		fill(255,   255, 0);

		hand_center_x = (handResult[0].annotations.thumb[1][0] +  handResult[0].annotations.pinky[0][0] ) /2;
		hand_center_y = (handResult[0].annotations.thumb[1][1] +  handResult[0].annotations.pinky[0][1] ) /2;

		hand_img_cx = hand_center_x * (video.width   *   window.innerHeight   /  video.height)/video.width; 
		hand_img_cy = hand_center_y * window.innerHeight/video.height


		if(display_hand_mark){
			text("X", 
				hand_img_cx, 
				hand_img_cy
			);
		}

	}


}



function draw() {


	if(typeof video === 'undefined' || video == null)return;

	if(handResult && handResult[0]) {
		global_hand = handResult[0];
	}

//	resizeCanvas(window.innerWidth, window.innerHeight);

	resizeCanvas(
			video.width   *   window.innerHeight   /  video.height, 
			window.innerHeight
		);

	if(main_camera_loop_flg){
		if(video) {
			image(video, 0, 0,
				video.width   *   window.innerHeight   /  video.height, 
				window.innerHeight
			);
		}else{
			fill(0,0,0);
 			rect(0, 0,  
					 window.innerHeight, 
				window.innerHeight
	 		);  
		}
	}



	if(handResult && handResult[0]) {
		drawNumber(handResult[0].landmarks);
	}


}

