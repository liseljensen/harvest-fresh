'use strict';
var app = angular.module('app', [
  'ngRoute', 'ngAnimate'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {
        templateUrl: "partials/home.html"
        , controller: "PageCtrl"
    })

    // Pages
    .when("/guacamole", {
        templateUrl: "partials/guacamole.html"
        , controller: "PageCtrl"
    })
	
	.when("/pulp", {
        templateUrl: "partials/pulp.html"
        , controller: "PageCtrl"
    })
//    
//    // When url is /work-detail, look for a var and call it proj
//    .when("/work-detail/:proj", {
//        templateUrl: "partials/work-detail.html"
//        , controller: "WorkDetailCtrl"
//    })
//
//    .when("/experiences", {
//        templateUrl: "partials/experiences.html"
//        , controller: "PageCtrl"
//    })
//    
////    .when("/blog", {
////        templateUrl: "partials/blog.html"
////        , controller: "PageCtrl"
////    })
//    
//    .when("/contact", {
//        templateUrl: "partials/contact.html"
//        , controller: "PageCtrl"
//    })
//
//    // else 404
//    .otherwise("/404", {
//        templateUrl: "partials/404.html"
//        , controller: "PageCtrl"
//    });
}]);

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function () {

        // Check path and hide nav if it includes work detail
        var path = $location.path(),
            findWorkDetail = path.indexOf('work-detail');
        
        if (findWorkDetail !== -1) {
             $rootScope.hideHeader = true;
             $rootScope.hideFooter = true;
        }
        else {
            $rootScope.hideHeader = false;
            $rootScope.hideFooter = false;
        }

    })
});

app.directive("banner", function() {
  return {
    template: '<ng-include src="getTemplateUrl()"/>',
    //templateUrl: unfortunately has no access to $scope.user.type
    restrict: 'E',
    controller: function($scope, $rootScope, $location) {
      //function used on the ng-include to resolve the template
      $scope.getTemplateUrl = function() {
		  var path = $location.path(),
              findWorkDetail = path.indexOf('guacamole');
		  	console.log('guac' + findWorkDetail);
		  		
		  	switch(true) {
				case (path.indexOf('guacamole') === 1):
					return "partials/banners/guacamole.html";
					break;
				case (path.indexOf('pulp') === 1):
					return "partials/banners/pulp.html";
					break;
				default:
					return "partials/banners/home.html";
			}

      }
    }
  };
});
app.controller('PageCtrl', function ($scope) {
    console.log('Page Controller Called');
    // Add class page-effect
    //$scope.pageClass = 'page-effect';
});

app.controller("featuredRecipes", function ($scope, $window) {
    // Create array of project objects
    $scope.recipes = [
        {
            num: 1,
            src: "/images/recipes/featured/AvoCoconutSmothie.jpg",
            description: 'Avocado Coconut Smoothie',
            url_details: "good-choices"
        }
        , {
            num: 2,
            src: "/images/recipes/featured/CouscousAvoSalad.jpg",
            description: 'Couscous and Avocado Salad',
            url_details: "careers"
        }
        , {
            num: 3,
            src: "/images/recipes/featured/CouscousAvoSalad.jpg",
            description: 'Chimichurri Avocado Dressing',
            url_details: "fert-app"
        }
        , {
            num: 4,
            src: "/images/recipes/featured/SpcyFarmFieldBrk.jpg",
            description: 'Spicy Farm & Field Breakfast',
            url_details: "fall-harvest"
        }
        , {
            num: 5,
            src: "/images/recipes/featured/ZestyBrkSand.jpg",
            description: 'Zesty Breakfast Sandwich',
            url_details: "wwl"
        }
        , {
            num: 6,
            src: "/images/recipes/featured/AvocadoCrostini.jpg",
            description: 'Avocado Crostini',
            url_details: "brand"
        }
    ];
	
	$scope.onEnd = function(){
		$window.jQuery('.owl-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			navText:['<span class="glyphicon glyphicon-chevron-left"></span>','<span class="glyphicon glyphicon-chevron-right"></span>'],
			responsive:{
				0:{
					items:1
				},
			   992:{
					items:3
				}
			}
		});
	};
});

app.directive("repeatEnd", function(){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			console.log(scope.$last)
			if (scope.$last) {
				console.log('last');
				scope.$eval(attrs.repeatEnd);
			}
		}
	};
});

app.controller("products", function ($scope, $window) {
    // Create array of project objects
    $scope.products = [
        {
            type: "guacamole",
			name: "Western Guacamole",
			id: "western-guac",
            src: "/images/products/guac-western.jpg",
            description: 'Chunky texture and homemade flavor seasoned with onion, red bell pepper and a touch of jalapeño',
			application: {
				idea: "Add Harvest Fresh™ Western Guacamole to a vegetarian wrap with white beans, red cabbage & cheddar.",
				link: "",
				image: "/images/recipes/applications/W_AvoBeanWrap.jpg"
			},
			nutritionals: {
				image: "nutritional-western-guacamole.gif",
				pdf: "guac-western.pdf"
			},
			skus: [
				{
					sku: "1943425",
					pack_type: "12/1",
					portion: "Bag",
					weight: "12/14",
					case_dim: "11.375\" x 8.875\" x 6\"",
					case_cube: "0.30",
					cases: "17 x 8"
				},
				{
					sku: "029830",
					pack_type: "6/3",
					portion: "Bag",
					weight: "18/20",
					case_dim: "12.625\" x 8\" x 8.5\"",
					case_cube: "0.43",
					cases: "18 x 6"
				},
				{
					sku: "012641",
					pack_type: "6/2 - chilled",
					portion: "Bag",
					weight: "12/14",
					case_dim: "15.875\" x 9.875\" x 3.75\"",
					case_cube: "0.28",
					cases: "12 x 8"
				}
				
			]
        },
		{
            type: "guacamole",
			name: "Extreme Supreme®",
			id: "extreme-supreme",
            src: "/images/products/guac-extreme.jpg",
            description: 'Big avocado chunks with tomato, onion and cilantro for homemade texture and flavor.',
			application: {
				idea: "Mix Harvest Fresh™ Extreme Supreme® Guacamole with your favorite egg salad and serve on a pita with a side of fresh veggies.",
				link: "",
				image: "/images/recipes/applications/Ex_AvoEggSaladSand.jpg"
			},
			nutritionals: {
				image: "nutritional-extreme-supreme.gif",
				pdf: "extreme-supreme.pdf"
			},
			skus: [
				{
					sku: "932666",
					pack_type: "12/1",
					portion: "Bag",
					weight: "12/14",
					case_dim: "11.375\" x 8.875\" x 6\"",
					case_cube: "0.30",
					cases: "17 x 8"
				},
				{
					sku: "935667",
					pack_type: "6/3",
					portion: "Bag",
					weight: "18/20",
					case_dim: "12.625\" x 8\" x 8.5\"",
					case_cube: "0.43",
					cases: "18 x 6"
				},
				{
					sku: "012672",
					pack_type: "6/2 - chilled",
					portion: "Bag",
					weight: "12/14",
					case_dim: "15.875\" x 9.875\" x 3.75\"",
					case_cube: "0.28",
					cases: "12 x 8"
				}
				
			]
        },
		{
            type: "guacamole",
			name: "Zesty Guacamole",
			id: "zesty-guac",
            src: "/images/products/guac-zesty.jpg",
            description: 'Featuring a blend of peppers for the perfect kick to delight and excite.',
			application: {
				idea: "Add Harvest Fresh™ Zesty Guacamole to Mac n' Cheese for a creamy, spicy twist on a traditional favorite.",
				link: "",
				image: "/images/recipes/applications/Z_ZestyMacCheese.jpg"
			},
			nutritionals: {
				image: "nutritional-zesty-guacamole.gif",
				pdf: "guac-zesty.pdf"
			},
			skus: [
				{
					sku: "030294",
					pack_type: "12/1",
					portion: "Bag",
					weight: "12/14",
					case_dim: "11.375\" x 8.875\" x 6\"",
					case_cube: "0.30",
					cases: "17 x 8"
				},
				{
					sku: "030287",
					pack_type: "6/3",
					portion: "Bag",
					weight: "18/20",
					case_dim: "12.625\" x 8\" x 8.5\"",
					case_cube: "0.43",
					cases: "18 x 6"
				}
			]
        },
		{
            type: "guacamole",
			name: "Especial",
			id: "especial",
            src: "/images/products/guac-especial.jpg",
            description: 'Perfectly ripened avocado chunks with jalapeño, cilantro, garlic, tomato and seasonings. Simply thaw, mash in the bag and serve.',
			application: {
				idea: "Top a flatbread with Harvest Fresh™ Especial Guacamole and veggies for an especially delicious flatbread.",
				link: "",
				image: "/images/recipes/applications/Es_FlatBrdEspecial.jpg"
			},
			nutritionals: {
				image: "nutritional-especial.gif",
				pdf: "especial.pdf"
			},
			skus: [
				{
					sku: "021087",
					pack_type: "15/1",
					portion: "Bag",
					weight: "15/17",
					case_dim: "15.625\" x 9.625\" x 9.25\"",
					case_cube: "0.91",
					cases: "9 x 9"
				}
			]
        }
       
    ];
});


/* --------------- WAYPOINT ------------------ */
	function wayPoint() {
		jQuery('.main-header-v1').waypoint(function() {
			setTimeout(function() {
				jQuery('.text-1').addClass('animated fadeInUp');
			}, 100);
			setTimeout(function() {
				jQuery('.main-header-v1 .banner-caption-text h2').addClass('animated fadeInDown');
			}, 100);
		}, { offset: '50%' });
		
		jQuery('.content-1').waypoint(function() {
			setTimeout(function() {
				jQuery('.image-banner-2').addClass('animated fadeInUp');
			}, 100);
		}, { offset: '70%' });
		jQuery('.content-2 , .content-8').waypoint(function() {
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(1)').addClass('animated fadeInUp');
			}, 100);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(2)').addClass('animated fadeInUp');
			}, 200);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(3)').addClass('animated fadeInUp');
			}, 300);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(4)').addClass('animated fadeInUp');
			}, 400);
		}, { offset: '50%' });
	}


jQuery(document).ready(function(){
	//sticky menu
	if (jQuery(window).width() >= 992) {
		jQuery(window).on('scroll', function() {
			var menuHeight =($('.header-top-v-1').height());
			if ($(window).scrollTop() > menuHeight) {
				jQuery('.header-top-v-1').addClass('sticky-menu');
				jQuery('.logo').addClass('logosticky');
			}else{
				jQuery('.header-top-v-1').removeClass('sticky-menu');
				jQuery('.logo').removeClass('logosticky');
			}	
		});
	}	
	// parallax 
	var contentNewsletter = jQuery('.content-newsletter');
	 if (contentNewsletter.length) {
		contentNewsletter.parallax({
		speed : 0.5
		});
	 }
	// mobile social links
	jQuery('.toggle-share-alt').on('click',function(event){
		event.preventDefault();
		jQuery(this).next().slideToggle();
		jQuery('.header-search').removeClass('state-show');
	});
	// Mobile Menu
	jQuery('.menu-toogle,  #mobileNav2').on('click',function(event){
		event.preventDefault();
		jQuery('.navigation-mobile').toggleClass('active');
		jQuery('.navigation-mobile').slideToggle(150).stopPropagation();		
	});
	// Navigation Submenu
	jQuery('.navigation-mobile .menu-item-has-children >a').on('click',function(event){
		event.preventDefault();
		jQuery(this).toggleClass('active');
		jQuery(this).next().slideToggle();
	});
	// Toggle Search
	jQuery('.toggle-search-form').on('click',function  (event) {
		event.preventDefault();
		jQuery('.header-search').toggleClass('state-show');
	});
	
	
	// Ajax Contact form Submit
	jQuery('.contact-form form').on('submit', function(event){
    event.preventDefault();
    var formdata = jQuery('.contact-form form').serializeArray();
    jQuery.ajax({
      url: 'php/contact.php',
      type: 'POST',
      async: true,
      data: formdata,     
    }).done(function() {
          jQuery('.contact-form .form-messges').removeClass('hidden');
          jQuery('.contact-form .btn').attr('disabled', 'disabled');
      });
  });
  // waypoint
	if (jQuery(window).width() >= 992) { wayPoint(); }
	// Twitter Widget
	jQuery('.twitter-posts').twittie({
		'username':'ThemeForest',
		'count': 3,
		'template': '{{tweet}}',
		'apiPath':'php/api/tweet.php'
	});

});
jQuery(window).on('resize', function() {
		if ($(window).width() >= 992) { wayPoint(); }
})
.on('load',function(){
	// Isotope
	// Product Filter
	var $container = jQuery('.product-list');
	// initialize isotope
	$container.isotope({
	  itemSelector: '.product-grid'
	});
	// filter items when filter link is clicked
	jQuery('.product-list-filter a').on('click', function(){
		jQuery('.product-list-filter a').removeClass('active');
		jQuery(this).addClass('active');
	  var selector = jQuery(this).attr('data-filter');
	  $container.isotope({ filter: selector });
	  return false;
	});
	// product image lightbox
	$('.mfp-image').magnificPopup({
		type:"image",
		removalDelay: 500,
		callbacks: {
		   beforeOpen: function() {
		     // just a hack that adds mfp-anim class to markup 
		      this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		      this.st.mainClass = this.st.el.attr('data-effect');
		   }
		 },
		 closeOnContentClick: true,
		 midClick: true
	});
});