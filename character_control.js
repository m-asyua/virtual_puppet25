


function character_reset(number){

	if(current_vrm[number] == null){
		return;
	}


	let create_pose    =  current_vrm[number].humanoid.getPose();

	for(let bone_index=0 ; bone_index< bone_names.length; bone_index++){
	
		if(bone_index==0){ // except  hips
		}else{
			key_bone_name = bone_names[bone_index]   ;
			create_pose[key_bone_name].rotation[0]  =  0;
			create_pose[key_bone_name].rotation[1]  =  0;
			create_pose[key_bone_name].rotation[2]  =  0;
			create_pose[key_bone_name].rotation[3]  =  0;
		}
	}

	current_vrm[number].humanoid.setPose(create_pose); // assign pose 





if(number==0){
    current_vrm[number].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y   = characters_rotation[0][1];  // Y-axis;
}
if(number==1){
    current_vrm[number].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y   = characters_rotation[1][1];  // Y-axis;
}

	current_vrm[number].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).rotation.z   =   Math.PI /180 * upper_arm_option_angle;
	current_vrm[number].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).rotation.z  =  -Math.PI /180 * upper_arm_option_angle;

	current_vrm[number].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).rotation.z   =   Math.PI /180 * lower_arm_option_angle;
	current_vrm[number].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).rotation.z  =  -Math.PI /180 * lower_arm_option_angle;

	renderer.render(scene, camera);

}





let bone_names = new Array(
"hips",
"spine",
"chest",
"upperChest",
"neck",
"head",
"leftShoulder",
"leftUpperArm",
"leftLowerArm",
"leftHand",
"leftUpperLeg",
"leftLowerLeg",
"leftFoot",
"leftToes",
"leftThumbDistal",
"leftThumbIntermediate",
"leftThumbProximal",
"leftIndexDistal",
"leftIndexIntermediate",
"leftIndexProximal",
"leftMiddleDistal",
"leftMiddleIntermediate",
"leftMiddleProximal",
"leftRingDistal",
"leftRingIntermediate",
"leftRingProximal",
"leftLittleDistal",
"leftLittleIntermediate",
"leftLittleProximal",
"leftEye",
"rightShoulder",
"rightUpperArm",
"rightLowerArm",
"rightHand",
"rightUpperLeg",
"rightLowerLeg",
"rightFoot",
"rightToes",
"rightThumbDistal",
"rightThumbIntermediate",
"rightThumbProximal",
"rightIndexDistal",
"rightIndexIntermediate",
"rightIndexProximal",
"rightMiddleDistal",
"rightMiddleIntermediate",
"rightMiddleProximal",
"rightRingDistal",
"rightRingIntermediate",
"rightRingProximal",
"rightLittleDistal",
"rightLittleIntermediate",
"rightLittleProximal",
"rightEye");




function character_change_sub( number ){

	current_vrm[number].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).rotation.set(
		characters_rotation[number][0],
		characters_rotation[number][1],
		characters_rotation[number][2]
	);

	current_vrm[number].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.set(
		characters_position[number][0],
		characters_position[number][1],
		characters_position[number][2]
	);

	renderer.render(scene, camera);

}

function read_vrm_file(character_id, input){

	let reader = new FileReader();
	reader.addEventListener('load', function() {

		// remove character
		let old_vrm   =  current_vrm;
		if(typeof old_vrm === "undefined"){
		}else{
			scene.remove(old_vrm.scene);
		}

		let vrm_file_content = reader.result;

		character_load_flg_change(-1);
		vrm_model_load(character_id, vrm_file_content);
		vrm_anime_check_change(character_change_sub, character_id);

	}, true)

	reader.readAsDataURL(input);

}

function vrm_model_load(character_id, vrm_file_name){



	my_loader = new THREE.GLTFLoader();
	my_loader.crossOrigin = 'anonymous';           //    different origin

	my_loader.load(  vrm_file_name,  ( gltf ) => {

//		THREE.VRMUtils.removeUnnecessaryJoints( gltf.scene );

			THREE.VRM.from( gltf ).then( ( vrm ) => {

				character_load_flg_change(0);
				character_arm_option( vrm );

				vrm.scene.scale.set(0.5,0.5,  1);



/*
				vrm.scene.scale.x = 0.5;
				vrm.scene.scale.y = 0.5;
				vrm.scene.scale.z = 0.5;
*/


//	scene.add( vrm.scene );  
// move 

				current_vrm[character_id]  =  vrm;

				if(debug)console.log(current_vrm[character_id]);




setTimeout( ()=>{

	if(character_id == 0){
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.x = Number(document.getElementById('puppet_x').value);
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.y = Number(document.getElementById('puppet_y').value);
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.z = Number(document.getElementById('puppet_z').value);
	    current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y = Number(document.getElementById('puppet_ry').value);
	}else if(character_id == 1){
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.x = Number(document.getElementById('avatar_x').value);
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.y = Number(document.getElementById('avatar_y').value);
		current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.z = Number(document.getElementById('avatar_z').value);
	    current_vrm[character_id].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y = Number(document.getElementById('avatar_ry').value);
	}

	scene.add( vrm.scene );
	renderer.render(scene, camera);

},1000);



			} );
		},
		( progress ) => {
 			if(debug){
 				let percent = ( progress.loaded / progress.total ) * 100; 
				console.log("Loading model..."+vrm_file_name+","+percent+"%" );
			}
		},
			( error ) => console.error( error )
	);
}


function character_load_flg_change(num){
	character_load_flg   =  num;
}

function character_load_flg_check(){
	return character_load_flg;
}

function character_arm_option( vrm ) {
	// T-pose to A-pose

	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).rotation.z   =   Math.PI /180 * upper_arm_option_angle;
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).rotation.z  =  -Math.PI /180 * upper_arm_option_angle;

	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).rotation.z   =   Math.PI /180 * lower_arm_option_angle;
	vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLowerArm).rotation.z  =  -Math.PI /180 * lower_arm_option_angle;

	renderer.render(scene, camera);
}

function vrm_anime_check_change(callback, character_id){
	if(character_load_flg_check() == -1){
		setTimeout(vrm_anime_check_change, vrm_loading_interval, callback, character_id);
	}else{
		if(debug)console.log("vrm_anime_check_change");
		callback(character_id);
	}
}







