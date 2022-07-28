function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  }

  function quizzy(em){
    var cc = getCookie('cquiz');
    if (!(!cc)) {
      var quizobj = JSON.parse( cc );
      var datax = {
        'email': em,
        'q1': quizobj[0].q1,
        'q2': quizobj[0].q2,
        'q3': quizobj[0].q3,
        'q4': quizobj[0].q4,
        'q5': quizobj[0].q5,
        'q6': quizobj[0].q6,
        'q7': quizobj[0].q7,
        'q8': quizobj[0].q8,
        'q9': quizobj[0].q9
      };
  
      $.ajax({
        type: 'POST',
        url: 'https://hook.integromat.com/lpn42xlyofn08inr5p8ttefbc7u8j5b5',
        crossDomain: true,
        data: datax,
        dataType: 'json',
        success: function(data){
          console.log(".");
        }
        });
    }
   

  }
  
  function sendToInt(em, f, cn){
    
    var gclid= getCookie("gglid");

     
     
   
      
    var country_code = iti.getSelectedCountryData()["dialCode"];
   //var cmail = phn.intlTelInput('getSelectedCountryData').dialCode;
    var ccde = "+"+country_code;
    var nums = ccde + " "+cn;
    
    $.ajax({
    type: 'POST',
    url: 'https://hook.integromat.com/t9hlpiegh97whrpu0dq6nsoj1dn44y8y',
    crossDomain: true,
    data: {'email': em, 'name': f, 'phone': nums, 'fbclid': "", 'gclid':gclid},
    dataType: 'json',
    success: function(data) {
           
    return nums;
    }
    });
    return nums;
  }


  $(".customer-info").on("blur", function(){

   var info = $(this).attr("id");
  
    var div = $("#"+info);
    $(div).removeClass('is-invalid');
    $(div).removeClass('is-valid');
   
   switch(info){
    case "fname":
        if (div.val()===""){
            div.addClass('is-invalid');
        } else {
            div.addClass('is-valid');
        }

        break;
    case "email":
        if (div.val()==="" || !isEmail(div.val())){
            div.addClass('is-invalid');
        } else {
            div.addClass('is-valid');
        }
    break;

    case "cnum":
        if (div.val()=="" || !checkIntl()){
            div.addClass('is-invalid');
        }  else {
            div.addClass('is-valid');
        }
    break;
    default: break;
   }

  
    var check = step1();

    if (check){
        console.log('proceed');
        var f=$("#fname").val();
     
        var em=$("#c-email").val();
        var cn=$("#cnum").val();
        $("#step1-circle").removeClass('bg-dark');
        $("#step1-circle").addClass('bg-success');
        $("#step-2").show();
          //   quizzy(em);
        //    var x = sendToInt(em, f, cn);

      //combine the country code and number
        //   var form = document.getElementById('checkout-form');
        //   var hiddenInput = document.createElement('input');
        //   hiddenInput.setAttribute('type', 'hidden');
        //   hiddenInput.setAttribute('name', 'phones');
        //   hiddenInput.setAttribute('value', x);
        //   form.appendChild(hiddenInput);
    } else {
        console.log('sadf')
        
    }
  });

  function step1(){
    var customerInfo = $(".customer-info");
    var fc = 0;
    $.each(customerInfo, function(key, val){
       

        let x = $("#"+val.id).hasClass('is-valid');
        if (x) {
            fc++;
        }
   
    });


    if (fc===3){
        return true;
    } else {
        return false;
    }
  }
  


// var dba = getParameterByName('dba');
// var pack = prices.find(x => x.id == dba).alias;
// var price = prices.find(x => x.id == dba).price;

// var desc = prices.find(x => x.id == dba).name;


// //check if shipping fee should be applied
// if (dba === 'bronze'){
//     let tp = 78.95;
//     $("#shipping").removeClass('d-none');
//     $("#subtotal-price").text(tp);
//     $("#total-price").text(tp);
// } else {
//     $("#subtotal-price").text(price);
//     $("#total-price").text(price);
// }
//populate order summary
// $('.bundle-pack').text(pack);
// $('#bundle-price').text(price);
// $("#bundle-img").attr('src', 'components/img_assets/bundle/'+ pack +'.webp');
// $("#bundle-badge").attr('src', 'components/img_assets/'+pack+'-pack.webp');
// $("#bundle-bot").text(desc);



var input = document.querySelector("#cnum");
      var dc="";
 var iti =   window.intlTelInput(input,{
      
      
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        //    fbq('track', 'InitiateCheckout', {}, {eventID:event_id});
        //   kTr('InitiateCheckout', resp.ip);
        //   document.cookie = "_fbe_id="+event_id;
        //   document.cookie="_uip="+resp.ip;
          dc = countryCode;
        });
      },
    initialCountry: "auto",
    utilsScript: "build/js/utils.js?1613236686837",
    
    } );
  
 //var inputx = document.querySelector("#cnum"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin


var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
     
      validMsg.classList.remove("hide");
       return true;
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
      return false;
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

function checkIntl(){
   //reset();
  var inputx = document.querySelector("#cnum");
    if (inputx.value.trim()) {
    if (iti.isValidNumber()) {
     
      //validMsg.classList.remove("hide");
       return true;
    } else {
      //inputx.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      //errorMsg.classList.remove("hide");
      return false;
    }
  }
  
}