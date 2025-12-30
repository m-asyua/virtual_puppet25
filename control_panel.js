


let open_control_panel_flg = -1;

function open_control_panel(){
	let my_panel = document.getElementById("open_panel");
	if(open_control_panel_flg == 1){
		document.getElementById("open_panel").style.visibility ="hidden";
//		document.getElementById("control_panel").style.visibility ="hidden";
//		control_panel_flg =  1;
	}else if(open_control_panel_flg == -1){
		document.getElementById("open_panel").style.visibility ="visible";
		document.getElementById("control_panel").style.visibility ="visible";
		control_panel_flg = -1;
	}
	open_control_panel_flg *= -1;
}





// X
document.getElementById('puppet_x').addEventListener('change', ()=> {
	if(current_vrm[0] !== undefined){
		current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.x = Number( document.getElementById('puppet_x').value);
		renderer.render(scene, camera);
	}
});

// Y
document.getElementById('puppet_y').addEventListener('change', ()=> {
	if(current_vrm[0] !== undefined){
		current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.y = Number( document.getElementById('puppet_y').value);
		renderer.render(scene, camera);
	}
});

// Z
document.getElementById('puppet_z').addEventListener('change', ()=> {
	if(current_vrm[0] !== undefined){
		current_vrm[0].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.z =  Number(document.getElementById('puppet_z').value);
		renderer.render(scene, camera);
	}
});

// rot Y
document.getElementById('puppet_ry').addEventListener('change', ()=> {
   	if(current_vrm[0] !== undefined){
		current_vrm[0].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y =Number(document.getElementById('puppet_ry').value);
		renderer.render(scene, camera);
	}
});






// X
document.getElementById('avatar_x').addEventListener('change', ()=> {
	if(current_vrm[1] !== undefined){
		current_vrm[1].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.x = Number( document.getElementById('avatar_x').value);
		renderer.render(scene, camera);
	}
});

// Y
document.getElementById('avatar_y').addEventListener('change', ()=> {
	if(current_vrm[1] !== undefined){
		current_vrm[1].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.y = Number( document.getElementById('avatar_y').value);
		renderer.render(scene, camera);
	}
});

// Z
document.getElementById('avatar_z').addEventListener('change', ()=> {
	if(current_vrm[1] !== undefined){
		current_vrm[1].humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Hips).position.z =  Number(document.getElementById('avatar_z').value);
		renderer.render(scene, camera);
	}
});

// rot Y
document.getElementById('avatar_ry').addEventListener('change', ()=> {
   	if(current_vrm[1] !== undefined){
		current_vrm[1].humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.Hips).rotation.y =Number(document.getElementById('avatar_ry').value);
		renderer.render(scene, camera);
	}
});



function set_bgcolor(color){
	if( color == 'black' )document.body.style.backgroundColor = "#000000";
	if( color == 'white' )document.body.style.backgroundColor = "#ffffff";
	if( color == 'blue'  )document.body.style.backgroundColor = "#0000ff";
	if( color == 'green' )document.body.style.backgroundColor = "#00ff00";
	if( color == 'other' ){
		document.body.style.backgroundColor = document.getElementById("color_text").value;
	}
}


// margin
function my_margin_setting(){

	function my_margin(id){
		let tag_id = document.getElementById(id).style;
		tag_id.left = my_left_margin + "px";
		tag_id.top  = my_top_margin  + "px";
	}

	my_margin("canvas-frame");
//	my_margin("control_panel");
//	my_margin("camera_window");

}


//control_panel_toggle
function making_control_panel_toggle(){

	let target_tag = document.getElementById("target_control_panel");
	let span_tag = document.createElement("span");
	span_tag.style.position='relative';
	span_tag.innerHTML = "-";
	span_tag.style.zIndex = 20;

	span_tag.setAttribute('onclick', 'control_panel_sw()' );

//console.log(span_tag);
	document.body.insertBefore(span_tag,target_tag);


}


//
function control_panel_sw(){
	let control_panel_tag = document.getElementById("control_panel");

	if(control_panel_tag == null)return;

	if(control_panel_flg == 1){
		control_panel_tag.style.visibility ="hidden";

		document.getElementById("open_panel").style.visibility ="hidden";
		open_control_panel_flg = -1;

	
	}else if(control_panel_flg == -1){
		control_panel_tag.style.visibility ="visible";


	}
	control_panel_flg *= -1;
}


//
//
function option_check(){

	let radio_tags = document.querySelectorAll('input[type="radio"]');
	for(let i=0; i < radio_tags.length; i++) {
		radio_tags[i].checked = false;
	}


	let back_tag = document.getElementsByName("back");
	let cnt = 0;
	back_tag.forEach( (key) => {
		if(key.value  ==  body_bgcolor){  back_tag[cnt].checked = true; }
		cnt++;
	});
	document.body.style.backgroundColor = body_bgcolor;


}



function check_radio_button(radio_name){
	let radios  = document.getElementsByName(radio_name);
	let checkValue = '';
	for (let i = 0; i < radios.length; i++){
		if(radios.item(i).checked){
			checkValue = radios.item(i).value;
			break;
		}
	}
	return checkValue;
}





