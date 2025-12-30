
let hand_track_loop_flg = false;

function hand_track_loop(f){
	hand_track_loop_flg = f;
	if(f){ hand_track_main_loop(); }
}

function hand_track_main_loop(){

	let hand_x = 0;
	let hand_y = 0;

	if(typeof global_hand !=='undefined' && global_hand!=null){

		if(current_vrm[0] ==null || typeof current_vrm[0] === 'undefined' ){
			setTimeout( hand_track_main_loop,  80);
		 }

		let z =  current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.z;

/*
		renderer.setSize(window.innerHeight * video.width       /  video.height,   window.innerHeight  );
		camera.aspect =   video.width /video.height ;  
		camera.updateProjectionMatrix();  
*/

		let window_width   =  window.innerHeight * video.width       /  video.height;
		let window_height  =  window.innerHeight ;


		new_width_3d   = -  z * camera.getFilmWidth() / camera.getFocalLength() ;
		new_height_3d  =    z * camera.getFilmHeight() / camera.getFocalLength() ;





/*

https://stackoverflow.com/questions/53881693/three-js-perspectivecamera-focallength-off-by-a-factor-of-two-inconsistent-with
https://threejs.org/docs/#api/en/cameras/PerspectiveCamera

                        |
                        |
                        |camera.getFilmHeight()（getFilmWidth()）
                        |
＜FOV/2                 |
camera.getFocalLength() |
------------------------





*/



		let hand_center_x2 = hand_center_x * (video.width   *   window.innerHeight   /  video.height)/video.width;
		let hand_center_y2 = hand_center_y* window.innerHeight/video.height;


//console.log("hand_center_x,y",hand_center_x,hand_center_y);
//console.log("hand_center_x2,y2",hand_center_x2,hand_center_y2);

	
//		let new_hand_x  =     hand_center_x2 - window_width  / 2;
		let new_hand_x  =     hand_center_x2 - window_width;
		let new_hand_y  =     hand_center_y2 - window_height / 2;

//console.log("new_hand_x,new_hand_y",new_hand_x,new_hand_y);


		let hand3d_x =    new_hand_x  / window_width   * new_width_3d  ;
		let hand3d_y =    new_hand_y  / window_height  * new_height_3d ;


//console.log("hand3d_x,hand3d_y",hand3d_x,hand3d_y);


		if(character_track){
			current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.x  =   hand3d_x;
			current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.y  =   hand3d_y;
			renderer.render(scene, camera);
		}

	}


	if(hand_track_loop_flg == true ){
		setTimeout( hand_track_main_loop,  80);
	}



}









