
let hand_3d_loop_flg = false;


function hand_3d_loop(f){
	hand_3d_loop_flg = f;
	if(f){ hand_3d_main_loop(); }
}

function hand_3d_main_loop(){

	if(button_state == false)return;


	if(global_hand !=null){

		let finger1_x = global_hand.annotations.thumb[3][0]; 
		let finger1_y = global_hand.annotations.thumb[3][1]; 
		let finger1_z = global_hand.annotations.thumb[3][2]; 


		let finger2_x = global_hand.annotations.indexFinger[3][0]; 
		let finger2_y = global_hand.annotations.indexFinger[3][1]; 
		let finger2_z = global_hand.annotations.indexFinger[3][2]; 

		let finger3_x = global_hand.annotations.middleFinger[3][0]; 
		let finger3_y = global_hand.annotations.middleFinger[3][1]; 
		let finger3_z = global_hand.annotations.middleFinger[3][2]; 

		let finger4_x = global_hand.annotations.ringFinger[3][0]; 
		let finger4_y = global_hand.annotations.ringFinger[3][1]; 
		let finger4_z = global_hand.annotations.ringFinger[3][2]; 

		let finger5_x = global_hand.annotations.pinky[3][0]; 
		let finger5_y = global_hand.annotations.pinky[3][1]; 
		let finger5_z = global_hand.annotations.pinky[3][2]; 

		let finger6_x = global_hand.annotations.palmBase[0][0]; 
		let finger6_y = global_hand.annotations.palmBase[0][1]; 
		let finger6_z = global_hand.annotations.palmBase[0][2]; 



		let x = (finger2_x + finger3_x  +finger4_x)/3 - finger6_x;
		let y = (finger2_y + finger3_y  +finger4_y)/3 - finger6_y;
		let z = (finger2_z + finger3_z  +finger4_z)/3 - finger6_z;

// (x,y,z)->(r,θ,φ)

		var radius = Math.sqrt(x * x + y * y + z * z);
		var theta  = Math.acos(z / radius);
		var phi    = Math.atan2(y, x);

		if(typeof current_vrm[0] === 'undefined'){
console.log("undefined");
		}

		if(current_vrm[0] !=null && typeof current_vrm[0] != 'undefined' ){


			if(enable_x){
				current_vrm[0].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.x = (15+ 90)*Math.PI/180 - theta;
			}


			if(enable_y){
				current_vrm[0].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.y = (  90)*Math.PI/180   + phi;

				//hips
				current_vrm[0].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y = (  (   90)*Math.PI/180  + phi) *0.2  + Math.PI;

			}


			if(enable_z){

				let my_rot_z = Math.PI/2+ Math.atan2(  Math.cos(Math.PI/2  -phi),  Math.cos(phi)   );   

				if( my_rot_z > -40*Math.PI/180  && my_rot_z < 40*Math.PI/180 ){
					current_vrm[0].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head).rotation.z = my_rot_z  ;
				}
		
			}

			renderer.render(scene, camera);
		}

	}



	if(hand_3d_loop_flg == true ){
		setTimeout( hand_3d_main_loop,  100);
	}



}

