var loading = false;

jQuery(document).ready(function($) {
	'use strict';

  var top_header = $('.parallax-content');
  top_header.css({'background-position':'center center'}); // better use CSS

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.8)+'px)'});
    
    var about = $("#about").offset();
    about = about.top;
    if( st >= about  ){
      initForm();
    } else {
      initedForm = false;
    }

  });

  // navigation click actions 
  $('.scroll-link').on('click', function(event){
      event.preventDefault();
      var sectionID = $(this).attr("data-id");
      scrollToID( sectionID, 750);            
  });

  $('#registrarBtn').on('click', function(event){
      event.preventDefault();
      
      $.LoadingOverlay("show", {image:"",fontawesome:"fa fa-cog fa-spin"});
      setTimeout(function(){
          $.LoadingOverlay("hide",true);
          
          Swal.fire({
              title: 'Registrado',
              type: 'success',
              html: 'Agradecemos tus sugerencias...!!!',
              // animation: false,
              showConfirmButton: false,
              timer: 3000,
              // customClass: {
              //     popup: 'wow tada'
              // }
          }).then((result) => {
              Swal.close();
          })
      }, 3000);

  });

  loading = true;
});

wow = new WOW(
    {
        animateClass: 'animated',
        mobile:       true,
        live:         true
    }
);
new WOW().init();

var ctx = null;
var canvas = null;
var interval = null;
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
function snow(){
    
    var W = window.innerWidth;
    var H = window.innerHeight;

    //canvas init
    if (!canvas)
        canvas = document.getElementById("canvas");
    
    canvas.width = W;
    canvas.height = H;

    if (!ctx)
        ctx = canvas.getContext("2d");
    else 
        ctx.clearRect(0, 0, W, H);
    
    //snowflake particles
    var mp = 10; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp //density
        })
    }
    
    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);

        size = Math.floor(Math.random() * 21); 
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);

            ctx.drawImage(document.getElementById("scream"), p.x, p.y, 15, 15);
            // ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        // ctx.fill();

        update();
    }
    
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;
            
            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W+5 || p.x < -5 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }
    
    //animation loop
    if (interval)
        clearInterval( interval );

    interval = setInterval(draw, 33);
    
}

window.onload = snow;
// window.onresize = snow;

// scroll function
function scrollToID(id, speed, callback){
  var offSet = 0;
  var targetOffset = $(id).offset().top - offSet;
  var mainNav = $('#main-nav');
  $('html,body').animate({scrollTop:targetOffset}, speed, function(){ 
      initForm();
  });
}
if (typeof console === "undefined") {
  console = {
      log: function() { }
  };
}

var initedForm = false;
function initForm(){
  if (!initedForm) {
      
      initedForm = true;

      $('#about>.container .service-item .icon')
      .addClass('rubberBand')
      .on(animationEnd, function() {
          $(this).removeClass('rubberBand');
      })

      $('#about>.container .service-item h1')                
      .addClass('tada')
      .on(animationEnd, function() {
          $(this).removeClass('tada');
      })
      
      // $('#ninia').focus();

  }
}
