$(document).ready(function () { 

	console.log("current account @user reg" + account);
	clearRecords();
	addUser();
});


//clear fields
function clearRecords(){
  $("#clearRecords").click(function (){
    $("#setData").trigger('reset');
  });
}


function addUser(){

	$("#addRecords").click(async function (){

		alert("Adding user details");

		var id = $("#_id").val();

		var jsonUser=JSON.stringify({
			"id" : id,
			"name":$("#_name").val(),
			"dept":$("#_dept").val()
		});

		//var instance=getInstance();

		//write user json object to IPFS and hash is recorded on the blockchain
		$.ajax({
			url: "http://localhost:3000/writeJSON",
			method:"POST",
			data:jsonUser,
			contentType:"application/json",
			success: function(_hash){ 
				//alert(_hash);
				console.log("write Json to IPFS:"+_hash);
				console.log("current account @user reg" + account);

				//TODO: Record on blockchain - map(serial number, hash of the file)
				instance.methods.addUserHash(id,_hash)
				.send({
						from: account,
						gas:150000,
						gasPrice:'125000000000'
					})
				.then(function(tx){
					console.log("Transaction for adding a user:",tx);
				});

			},
			error:function(jqXHR, textStatus, errorThrown){
			   	console.log("POST ERROR :"+errorThrown);
			}
		});



	});

}