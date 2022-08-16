// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
//pk_live_DIH0BmB1obyjQvuimdsJI9MH - live
//pk_test_51Id2gRBVqVZ2ueLqtIH9GclmrHJII2dhR7s8iGJqGsaOzukryligGXvYNnMkS4nomXb5rAAw8mZYmOrJxHtinU2Z00J4rsWz7z



var stripe = Stripe('pk_live_DIH0BmB1obyjQvuimdsJI9MH');
var elements = stripe.elements();
var acid = "";
var tokenx = "";
var device = "";
function getUserDate(){
    var d = new Date();
  
    var date1 = d.getFullYear() + '-' +
              ((d.getMonth()+1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) +
              '-' +
              (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
  
  var time1 = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
              ':' +
              (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
              ':' +
              (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
  
              var dd = date1+ " " +time1;
            return dd;
  }



  function findNextPage(bot){
        
    switch (bot) {
    case 1:
        setTimeout(function(){
             window.location.href="/up/queen-formula-3.html";
        }, 500);
      break;
    case 3 :
        setTimeout(function(){
            window.location.href="/up/queen-formula-6.html";
       }, 500);
     
      break;
     case 6 :
        setTimeout(function(){
            window.location.href="/up/queen-formula-12.html";
       }, 500);
     
      break;
      
    default:
        setTimeout(function(){
            window.location.href="/up/queen-formula-3.html";
       }, 500);
      break;
  }

}


 function getCookie(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                  }
                  if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                  }
                }
                return "";

                    } //end getcookie function

     function checkCookie() {
       var uToken = getCookie("userToken");
       var dev = getCookie("device");
       if (dev != ""){
         device = dev;
       }
       tokenx = uToken;
       var acidx = getCookie("acid")
       if (acidx != ""){
         acid = acidx;
       }

     } //end checkCookie function
              
        
            checkCookie();

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  var sku = getParameterByName('sku');

  function recordPurchase(testid, price, bot){ //function to record purchase if there is an active test
    // fbq('track', 'Purchase', {
    //   value: price,
    //   currency: 'USD'
    //   });
    var page = getCookie('page');
    document.cookie="spid="+testid+";path=/";
    document.cookie="stp="+page+";path=/";;
    var mobile = getCookie('mobile');
    $.ajax({
      type: 'POST',
      url: 'https://pay.kaiserfitapp.com/split_test/purchase.php',
      crossDomain: true,
      data: {'testid': testid,'page_name': page,'price': price, 'mobile': mobile},
      dataType: 'json',
      success: function(data) {
        
        if (data.result){
          setTimeout(function(){
            findNextPage(data.bot);
          }, 500);
        } else {
          setTimeout(function(){
            findNextPage(data.bot);
          }, 500);
        }
        
      },
       error: function(data){
         console.log(data);
       }
        });
  }


  function vrecordPurchase(price){ //function to record purchase if there is an active test
    // fbq('track', 'Purchase', {
    //   value: price,
    //   currency: 'USD'
    //   });
    var page = getCookie('rec');
    var vsltest = getCookie('vsltest')
    document.cookie="spid="+vsltest+";path=/";
    document.cookie="stp="+page+";path=/";
    var mobile = getCookie('mobile');
    $.ajax({
      type: 'POST',
      url: 'https://pay.kaiserfitapp.com/split_test/purchase.php',
      crossDomain: true,
      data: {'testid': vsltest,'page_name': page,'price': price, 'mobile': mobile},
      dataType: 'json',
      success: function(data) {
        
      console.log('vsl')
        
      },
       error: function(data){
         console.log(data);
       }
        });
  }


// Create an instance of the card Element.
var card = elements.create('cardNumber', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

var cardexp = elements.create('cardExpiry', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

var cardcvc = elements.create('cardCvc', {
	classes : {
		base: "form-control",
		
		invalid:"error"
	}
	
	
	
});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#stripecn');
cardexp.mount('#stripexpd');
cardcvc.mount('#stripecc');

// Create a token or display an error when the form is submitted.
// var formx = document.getElementById('payment-form');
// formx.addEventListener('submit', function(event) {
//   event.preventDefault();
//   console.log(formx);

// });


var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  $("#btnStripe").prop('disabled', true);
  $("#btnStripe > #btnTxt").text('Completing Order...');
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
     // var errorElement = document.getElementById('card-errors');
     // errorElement.textContent = result.error.message;
      // $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
      // $("#modPurchase").modal('hide');
      
        $("#card-errors").html('');
     		$("#card-errors").append("<p style='color: red;'>"+ result.error.message +"</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#btnStripe").prop('disabled', false);
        $("#btnStripe > #btnTxt").text('Complete Secure Order');
    } else {
      
     
      
      // Send the token to your server.
      stripeTokenHandler(result.token);
   
    }
  });
});

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
 var fbclid = getCookie("_fbc");
  if (fbclid) {
    document.cookie ="fbclid="+fbclid+";path=/";
   
  } else {
    fbclid = getCookie("_fbp");
    document.cookie ="fbclid="+fbclid+";path=/";
  }
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
 
  var dd = $('#payment-form').serialize(); 
  var sku_id = getCookie("sku_id");
  var pdate = getUserDate();
  dd += "&sku_id=" + sku_id;
	dd += "&tokenx=" + tokenx;
  dd += "&acid=" + acid;
   dd += "&device=" + device;
 	dd += "&pdate="+pdate;
  dd += "&fbclid="+fbclid;
  // dd += "&pi_id="+pi_id;
  dd += "&url="+window.location.href;
  dd += "&eventid="+getCookie('_fbe_id');
  // Submit the form
  $.ajax({
    type: 'POST',
    url: 'https://pay.kaiserfitapp.com/stripe/createSetupIntent.php',
    crossDomain: true,
    data: dd,
    dataType: 'json',
    success: function(data) {
   
      if (data.result == "confirm"){
     
      
      document.cookie="_piid="+data.paymentIntent.id+";path=/"; //also the orderid
      document.cookie = "oid="+data.paymentIntent.id+";path=/";
      document.cookie = "__u_hash="+data.hash+";path=/";
        document.cookie="_clisk="+data.paymentIntent.client_secret+";path=/";
        document.cookie="cid="+data.customer.id+";path=/";
        document.cookie="cmail="+data.customer.email+";path=/";
        document.cookie="cName="+data.customer.name+";path=/";
        document.cookie = "orderprice="+ data.price+";path=/";
        document.cookie = "bot="+data.bot+";path=/";
        window.location.href = data.paymentIntent.next_action.redirect_to_url.url+";path=/";
      } 

    
      
      if(data.result == "true"){
       
        var price = data.price;
         
        // fbq('track', 'Purchase', {
        //   value: price,
        //   currency: 'USD'
        //   }, {eventID:event_id});
        var ip = getCookie('_uip');
        kTr('Purchase', ip);
          ttq.track('CompletePayment',{
            content_id: 'Queen Formula',
            quantity: parseInt(data.bot),
            price: price,
            value: price,
            currency: 'USD'});

          //   gtag('event', 'conversion', {
          //     'send_to': 'AW-10886811479/DB76CJPsy7QDENeensco',
          //     'value': price,
          //     'currency': 'USD',
          //     'transaction_id': data.orderid
          // });
      
       
        document.cookie = "bot="+data.bot+";path=/";
      document.cookie = "orderprice="+ data.price+";path=/";
       document.cookie = "cName="+data.firstName+";path=/"; 
      document.cookie = "cid="+data.cid+";path=/"; 
      document.cookie = "obx="+data.ob+";path=/";
      document.cookie = "cmail="+data.cmail+";path=/";
        document.cookie = "oid="+data.orderid+";path=/";
         document.cookie = "__u_hash="+data.hash+";path=/";
         document.cookie = "app=true;path=/";
  
      
  
      var testid = getCookie('testid');
      var v = getCookie('vsltest');
      if (v != '') {
        vrecordPurchase(price);
      }
      if (testid != ''){ // there is an active test
        recordPurchase(testid, price, data.bot);
      }  else {
        setTimeout(function(){
          findNextPage(data.bot);
        }, 500);
      }
       
      }
      
      if (data.result == "false"){
    
         $("#card-errors").html('');
     		$("#card-errors").append("<p style='color: red;'>Card Declined/Insufficient Funds.<br>Please Check your Card Details</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#btnStripe").prop('disabled', false);
        $("#btnStripe > #btnTxt").text('Complete Secure Order');
        return false;
      
        
      }

      
    },
      error: function (data, xhr,jqXHR, ajaxOptions, thrownError) {
        console.log('error', data, xhr, jqXHR, ajaxOptions, thrownError);
        $("#card-errors").html('');
     		$("#card-errors").append("<p style='color: red;'>Card Declined/Insufficient Funds.<br>Please Check your Card Details</p>");
        $('html, body').animate({ scrollTop: $('#card-errors').offset().top }, 'slow');
        $("#btnStripe").prop('disabled', false);
        $("#btnStripe > #btnTxt").text('Complete Secure Order');
      
        
      }, done: function () {

        $("#btnStripe").prop('disabled', false);
        $("#btnStripe > #btnTxt").text('Complete Secure Order');
      }
   
	 }); //end ajax
  
 
  
}


function kTr(eventName){
  if (window.location.hostname === 'localhost') {
    return false;
  }
  var url = window.location.href;
  var navAgent = navigator.userAgent;
  var fbc = getCookie('_fbc');

var data = {
    'eventName': eventName,
    'eventID': event_id,
    'URL': url,
    'userAgent': navAgent,
    'fbc': fbc,
    'ipv4Address': ipv4,
   
    }

    setTimeout(() => {
       
        $.ajax({
            type: 'POST',
            url: 'https://hook.integromat.com/rzwt665qate0d0bu5xhex9q7cr0lun7m',
            crossDomain: true,
            data: data,
            dataType: 'json'
      
            }); //end ajax

    }, 500);
   
    
}

