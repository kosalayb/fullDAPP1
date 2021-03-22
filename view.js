$(document).ready(function () { 
	clearRecords();
	viewUser();
});


//clear fields
function clearRecords(){
  $("#clearRecords").click(function (){
    $("#setData").trigger('reset');
  });
}


//get json object from a given url
function getJson(_url){
	  $.ajax({
	    url:_url,
	    dataType: 'json',
	    success:function(data){
	    	//return data;
	    	var _jsonData= JSON.stringify(data,null,'\n');
	    	console.log("data :" + _jsonData);
	    	document.getElementById('add_to_me').innerHTML+=_jsonData+"<br>"+"<br>";

	    },
	    error:function(error){
	    	console.log("reading json object error :"+error);
	    }

	 });
}



function viewUser(){

	$("#viewRecords").click(function (){
		alert("view records");
		

		var id = $("#_id").val();
		console.log("id :" +id);

		var user=instance.methods.getUserHash(id).call().then(
				function(resp){
					console.log(resp);
					//read data from IPFS and write to view.html
					var url = "https://gateway.ipfs.io/ipfs/"+resp;
		          	getJson(url); // This takes some time

				}
			);



	});

}