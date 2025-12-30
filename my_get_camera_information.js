/*

reference

https://github.com/webrtcHacks/WebRTC-Camera-Resolution


(chrome option)
chrome://media-internals/


*/


const camera_list = [
    {
        "label": "4K(UHD)",
        "width": 3840,
        "height": 2160
    },
    {
        "label": "1080p(FHD)",
        "width": 1920,
        "height": 1080
    },
    {
        "label": "UXGA",
        "width": 1600,
        "height": 1200
    },
    {
        "label": "720p(HD)",
        "width": 1280,
        "height": 720
    },
    {
        "label": "QHD（Quarter HD)",
        "width": 960,
        "height": 540
    },
    {
        "label": "SVGA",
        "width": 800,
        "height": 600
    },
    {
        "label": "VGA",
        "width": 640,
        "height": 480
    },
    {
        "label": "360p(nHD)",
        "width": 640,
        "height": 360
    },
    {
        "label": "CIF",
        "width": 352,
        "height": 288
    },
    {
        "label": "QVGA",
        "width": 320,
        "height": 240
    },
    {
        "label": "QCIF",
        "width": 176,
        "height": 144
    },
    {
        "label": "QQVGA",
        "width": 160,
        "height": 120
    }

];






const camera_list2 = [
    {
        "label": "720p(HD)",
        "width": 1280,
        "height": 720
    }
];







async function my_camera_number_setting(sw){

	let scan_list = {};

	if(sw==0){
		scan_list = camera_list2;
	}else if(sw==1){
		scan_list = camera_list;
	}else{
		scan_list = camera_list2;
	}


	let checking_tag;
	checking_tag = document.getElementById("checking_camera_message");

	if(checking_tag !=null){
		checking_tag.innerHTML="Checking....";
	}


	let stream_tmp = await navigator.mediaDevices.getUserMedia({ video: true , audio: false });

	let foundDevices;

	await navigator.mediaDevices.enumerateDevices().then((devices) => {
		// once  stop stream 
		stream_tmp.getTracks().forEach(track => track.stop());
		foundDevices = devices.filter( (device) => device.kind === "videoinput"  );
	});

console.log( foundDevices);

	let camera_device_info = {};

	foundDevices.forEach(function( one_device ) {
		let my_device_id;
		let my_label;
		for (let key in one_device) {
			if(key == 'deviceId') my_device_id = one_device[key];
			if(key == 'label') my_label = one_device[key];
		}
		camera_device_info[my_device_id]=my_label;
	});

//	console.log(camera_device_info);


	// making list
	let select_option_tags = document.getElementById("camera_select");

	// remove all options
	while(select_option_tags.lastChild){
		select_option_tags.removeChild(select_option_tags.lastChild);
	}

	let option_tag;
	option_tag = document.createElement("option");
	option_tag.innerHTML = "(not selected)";
	select_option_tags.appendChild(option_tag);

 check_stop_flg = 0;

	for (let key in camera_device_info) {
		for (let list_counter=0; list_counter < scan_list.length ; list_counter++ ) {
			 await get_info(list_counter, select_option_tags, key, camera_device_info);
			 if(check_stop_flg == 1)break;
		}
//console.log(select_option_tags);
		 if(check_stop_flg == 1)break;

	}

checking_tag = document.getElementById("checking_camera_message");
if(checking_tag !=null){
	checking_tag.innerHTML="Checking...end.";
}


	async function get_info(i, select_option_tags, key, camera_device_info){

		let candidate_label  = scan_list[i]['label'];
		let candidate_width  = scan_list[i]['width'];
		let candidate_height = scan_list[i]['height'];

//console.log("cl", candidate_label, candidate_width, candidate_height );

		let tmp_id  = key;
		let tmp_id2 = {};
		tmp_id2['deviceId'] =  tmp_id;
		option_camera_id['video'] = tmp_id2;
		option_camera_id['audio'] = false;      // stop audio input


/*
   {
        audio: false,
        video: {
            deviceId: xxxxxxxxxxxxx
            width: {exact: xxxxxxxxxxxxxxx},    
            height: {exact: xxxxxxxxxxxxxx}   
        }
    };
*/


		let tmp_id_width_exact   =  {};
		let tmp_id_height_exact  =  {};

		tmp_id_width_exact['exact']   =  candidate_width;
		tmp_id_height_exact['exact']  =  candidate_height;

		tmp_id2['width']   =  tmp_id_width_exact;
		tmp_id2['height']  =  tmp_id_height_exact;

		option_camera_id['video']  =  tmp_id2;

//console.log("options",option_camera_id);


		await navigator.mediaDevices.getUserMedia(option_camera_id)
			.then((face_video_background_stream ) => {

				let tr = (face_video_background_stream.getVideoTracks()[0]);

				let settings = tr.getSettings();  //  [0]?

				let video_width   = settings.width;
				let video_height  = settings.height;

//console.log("make", video_width, video_height);


				if(face_video_background_stream != null){
			       face_video_background_stream.getTracks().forEach(  track => track.stop()  );  
				}

				if(video_width * video_height > 0) {
					if(candidate_width + "x" + candidate_height === video_width + "x" + video_height) {

						console.log("match", candidate_width + "x" + candidate_height );

						option_tag = document.createElement("option");
						option_tag.value = key;
						option_tag.innerHTML = camera_device_info[key] +","+ (candidate_width + "x" + candidate_height);

 checking_tag = document.getElementById("checking_camera_message");
if(checking_tag !=null){
	checking_tag.innerHTML="Checking..."+":"+ (candidate_width + "x" + candidate_height);
}
						select_option_tags.appendChild(option_tag);
					}
				}
			})
			.catch((error) => {
				console.log('getUserMedia error!', error);
				return;
			});
	}
}


/*

{
  video: { deviceId: 'Device    ID' },
  audio: false
}
*/





document.getElementById('camera_select').addEventListener('change', ()=> {

	let tmp_tag = document.getElementById("camera_select")

	let s_index = tmp_tag.selectedIndex;
	let tmp_id  = tmp_tag.options[s_index].value;
	let tmp_id2 = {};
	tmp_id2['deviceId'] =  tmp_id;
	option_camera_id['video'] = tmp_id2;
	option_camera_id['audio'] = false;      // stop audio input


	let html_tmp  = (tmp_tag.options[s_index].innerHTML).split(",");
	let html_tmp2 = (html_tmp[1]).split("x");

	let tmp_id_width_exact   =  {};
	let tmp_id_height_exact  =  {};

	tmp_id_width_exact['exact']   =  html_tmp2[0]; // width
	tmp_id_height_exact['exact']  =  html_tmp2[1]; // height

	tmp_id2['width']   =  tmp_id_width_exact;
	tmp_id2['height']  =  tmp_id_height_exact;

	option_camera_id['video']  =  tmp_id2;



	console.log("options",option_camera_id);



	t();



	async function t(){

		let face_video_background_stream =  await navigator.mediaDevices.getUserMedia(option_camera_id);

//console.log("video tracks",face_video_background_stream.getVideoTracks());

		const track = face_video_background_stream.getVideoTracks()[0];

		let settings = (face_video_background_stream.getVideoTracks()[0]).getSettings();  //  [0]?
		let video_width   = settings.width;
		let video_height  = settings.height;
	
	console.log("make", video_width, video_height);

		if(face_video_background_stream != null){
			await face_video_background_stream.getTracks().forEach(  track => track.stop()  );  
		}
	}

});

let check_stop_flg = 0;

function check_stop(){
	check_stop_flg = 1;
}


