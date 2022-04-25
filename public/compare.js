var current_time = new Date();
var current_year = current_time.getFullYear();
var current_month = current_time.getMonth() + 1;
var current_date = current_time.getDate();
var current_time = current_date + "/" + current_month + "/" + current_year;



Handlebars.registerHelper("compare",function(a,b,options){
 	 if(a == b){
		 return options.fn(this);
  	}else{
		return options.inverse(this);
     }
});	