

function face_capture_start() {
//console.log("face_capture_start, videoEl=",videoEl);

	face_capture_loop_flg = true;

	if(typeof videoEl === 'undefined' ||  videoEl == null ){  
		return setTimeout(() => face_capture_start())
	}

	face_capture_canvas = document.createElement("canvas");
	face_capture_canvas.style.position = "absolute";
	face_capture_canvas.id             = "overlay";
//	face_capture_canvas.style.top      = "730px";
//	face_capture_canvas.style.left     = "0px";
	face_capture_canvas.style.minWidth = "100%";
	face_capture_canvas.style.zIndex = 20; 


	face_capture_canvas.setAttribute('width',  videoEl.width);
	face_capture_canvas.setAttribute('height',  videoEl.height);


	( document.getElementById("overlay_div") ).appendChild(face_capture_canvas);

	onPlay();

}


function face_capture_stop() {
	//stop loop
	face_capture_loop_flg = false;
	if(face_capture_canvas != null){
		face_capture_canvas.remove();
	}
}


let history_27y_array = new Array();
let history_8y_array = new Array();
let history_29y_array = new Array();

let history_0x_array = new Array();
let history_16x_array = new Array();
let history_29x_array = new Array();


let my_average  = function(arr) {
	var sum = 0;
	arr.forEach(function(elm) {
		sum += elm;
	});
	return sum/arr.length;
};


async function onPlay() {

//console.log("onplay check  face_capture_flg,face_capture_loop_flg",face_capture_flg,face_capture_loop_flg, videoEl);

	if(typeof face_capture_flg === 'undefined' ||     face_capture_flg == false){
		return;
	}


	if(videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded()){  
		// "isFaceDetectionModelLoaded()" is important to wait load model
		return setTimeout( onPlay, 80)
	}

	let result = await faceapi.detectSingleFace(videoEl, getFaceDetectorOptions()).withFaceLandmarks();

	if(result){


		// landmarks
		face_capture_canvas = document.getElementById("overlay");

		const dims = faceapi.matchDimensions(face_capture_canvas, videoEl, true)


		let displaySize = {};
		camera_src_settings = (stream.getVideoTracks()[0]).getSettings();
		face_camera_width = camera_src_settings.width;
		face_camera_height = camera_src_settings.height;
		displaySize['width']  = camera_mini_window_width;
		displaySize['height'] = face_camera_height * camera_mini_window_width / face_camera_width ;

		videoEl.width  =  camera_mini_window_width;
		videoEl.height =  face_camera_height * camera_mini_window_width / face_camera_width ;



/////		const displaySize = { width: 160, height: 120 };  

		const resizedResult = faceapi.resizeResults(result, displaySize)


// Math.round ( XXXX  *value ) /value;


		let value = 10;



		function my_history(arr, index, index2){

			if(arr.length < 10){
				arr.push( Math.round ( Number(result.landmarks.positions[index][index2])  * value)/value );
				return 0;
			}
			let average = my_average(arr);

			arr.push( Math.round ( Number(result.landmarks.positions[index][index2])  * value)/value );
			arr.shift();

			return average;
		}


		let min  =  Number(result.landmarks.positions[0]['x'])   ;
		let max  =  Number(result.landmarks.positions[16]['x'])  ;

		nose_x   =   Number(result.landmarks.positions[29]['x']) ;



		face_width    = max - min;
		nose_x_scale  = nose_x - (min+max)/2;
		nose_ratio    = nose_x_scale / face_width;

		let x_level =  nose_ratio * 2;


//console.log("x_level", x_level);


		min  = Number(result.landmarks.positions[27]['y'] );
		max  = Number(result.landmarks.positions[8]['y']  );

		nose_y = Number(result.landmarks.positions[29]['y']  );


		face_width    = max - min;
		nose_y_scale  = nose_y - (min + max)/2;
		nose_ratio    = nose_y_scale / face_width;

		let y_level =  nose_ratio * 1.5 + 0.5;



		x_max =  Number(result.landmarks.positions[8]['x']) ;
		y_max =  Number(result.landmarks.positions[8]['y']) ;

		x_min =  Number(result.landmarks.positions[30]['x']) ;
		y_min =  Number(result.landmarks.positions[30]['y']) ;

		x_dif = x_max - x_min;
		y_dif = y_max - y_min;

		atan_value = Math.atan(x_dif / y_dif);  // radian


// ----- mouth A

		min = Number(result.landmarks.positions[51]['y']);
		max = Number(result.landmarks.positions[57]['y']);

		nose_y =  Number(result.landmarks.positions[29]['y']) ;


		face_width    = max - min;
		nose_y_scale  = nose_y - (min + max)/2;
		nose_ratio    = nose_y_scale / face_width;


		let mouth_a_level  =  (1.68-(-nose_ratio*0.5))*1.2;


		if(mouth_a_level <= 0.6){
			mouth_a_level = 0;
		}



// ----- mouth I

		let mouth_i_level =  0;

// ----- mouth U

		let mouth_u_level  =  0;




/*
console.log(" x_level, y_level, atan_value=", x_level, y_level, atan_value);
*/



		value = 100;


		x_level = my_history2(  Math.round(x_level * value)/value ,history_x);
		y_level = my_history2(  Math.round(y_level * value)/value ,history_y);
		atan_value = my_history2(  Math.round(atan_value * value)/value ,history_z);



		if(avatar_enable){
			// redraw
			redraw_animation3(current_vrm[1], x_level, y_level, atan_value, mouth_a_level, mouth_i_level, mouth_u_level);
		}


		// draw landmarks
		faceapi.draw.drawFaceLandmarks(face_capture_canvas, resizedResult);


	}

	if(typeof face_capture_loop_flg !== 'undefined' &&     face_capture_loop_flg != false){
		setTimeout( () => onPlay())
	}


}



let history_x = new Array();
let history_y = new Array();
let history_z = new Array();

function my_history2(x,arr){

		if(arr.length < 5){
			arr.push( x );
			return 0;
		}
		let average = my_average(arr);
		// 今の配列の平均値を保存してから、配列変更
		arr.push( x );
		arr.shift();

		return average;
}









function redraw_animation3( vrm , x, y, z_radian, mouth_a, mouth_i, mouth_u) {

	if(typeof vrm === "undefined"){
		return;
	}

	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.z  = -z_radian * 0.75 ;
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).rotation.z = -z_radian * 0.28 ;

	// y <- x
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.y  =  x * Math.PI * 2 / 5 * 0.5  ;
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).rotation.y =  x * Math.PI * 2 / 5 * 0.5  ;

	// x <- -y
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.x  =  -y * Math.PI * 2 / 5 * 0.75 ;
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Chest).rotation.x =  -y * Math.PI * 2 / 5 * 0.28 ;



if(x < -0.5  ){ //   回転しているときは口を閉じる特別な処理
	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.A, 0);
//	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.I, 0);
//	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.U, 0);
	vrm.blendShapeProxy.update();

}else{
	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.A, mouth_a);
//	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.I, mouth_i);
//	vrm.blendShapeProxy.setValue(THREE.VRMSchema.BlendShapePresetName.U, mouth_u);
	vrm.blendShapeProxy.update();

}

	renderer.render(scene, camera);

}


