
$(document).ready(function () { 

	checkCompliance();

});

function checkCompliance(){

	//alert('I am in compliance.js');

    $.ajax({
      url:"http://localhost:3000/api/prover/readcsv",
      dataType: 'JSON',
      async:false,
      success:function(data){

        document.getElementById('outcome').innerHTML="ID:"+data.ID+",q1:"
        +data.q1+",q2:"+data.q2+",q3:"+data.q3+",q4:"+data.q4+",q5:"+data.q5;

        var _id = data.ID;
        var _vals =[data.q1,data.q2,data.q3,data.q4,data.q5];

        //get a compilance object
        instance.methods.getDataObject(_id,_vals).call()
        			.then(function(resp){
		        		console.log("data object==>"+resp);

		        		//compialce checking
						instance.methods.findComplience(resp).call()
						.then(function(result){
							console.log("compliance results==>"+result);
							document.getElementById('compliance').innerHTML=result;	
						});


		        	});
      }

    });//end ajax
}




// function getUtility(){

// 	console.log("I am in utility js");


// }

// exports.getUtility=getUtility;


	// var script  = document.createElement('script');
 //  	script.src  = "./server.js";
 //  	script.type = 'text/javascript';
 //  	script.defer = true;
	// document.getElementsByTagName('head').item(0).appendChild(script);