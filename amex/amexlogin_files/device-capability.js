// **globals/device-capability.js** checks the device capability for the **mEngage** experience.

/* Default is 'device-not-capable'*/
tests = {
	//assume high end
	supportsHighEnd: true,
	// List of un-supported features
	unsupportedFeatures: [],
	run : function() {
		// define the feature tests that we need
		var features =	[
		            /* ---------------------------------------------------------------
		             * "Touch" capability test not done. This is because, there are 
		             * few Android browsers, which says "Touch not supported" while
		             * its is actually supported. E.g: Motorola DroidX, Atrix
		             */
					//{"label":"Touch", 			"test": this.supportsTouch()},
					/* ---------------------------------------------------------------
					 * 'Webkit' check involves a dependency on zepto.js ($.browser).
					 * Hence this check is moved to server side. At server side, same 
					 * logic as in zepto.js is implemented.
					 */
					//{"label":"is Webkit", 		"test": $.browser.webkit},
		            /* ---------------------------------------------------------------
		             * Local Storage is not used - hence not tested
		             */
					//{"label":"Local Storage", 	"test": this.supportsLocalStorage()},
					{"label":"Session Storage", "test": this.supportsSessionStorage()},
					{"label":"App Cache", 		"test": this.supportsAppCache()}
					/* ---------------------------------------------------------------
					 * Geo-location is not checked, as the user can explicitly disable
					 * it. Hence checking this doesn't really help
					 */
					//{"label":"Geo-location", 	"test": this.supportsGeoLocation()}
					];

		// iterate through the defined feature tests
		var f, feature;
		for (f = 0; f < features.length; f++) {
			feature = features[f];
			if (!feature.test) {
				this.supportsHighEnd = false;
				this.unsupportedFeatures[this.unsupportedFeatures.length] = feature.label;
			}
		}
		return this.supportsHighEnd;
	},
	// feature test for HTML5 local storage support
	supportsLocalStorage : function() {
		return !!(('localStorage' in window) && window['localStorage']);
	},
	supportsSessionStorage : function() {
		return !!(('sessionStorage' in window) && window['sessionStorage']);
	},
	// feature test for HTML5 touch event support
	supportsTouch: function() {
		return !!(('createTouch' in document) && document['createTouch']);
	},
	// feature test for HTML5 app cache support
	supportsAppCache : function() {
		return !!window.applicationCache;
	},
	// feature test for HTML5 geo-location support
	supportsGeoLocation : function() {
		return !!navigator.geolocation;
	}
};
if (tests.run()){
	document.cookie = "deviceCapable" + "=" + "true";
} else {
	document.cookie = "deviceCapable" + "=" + "false";
	document.cookie = "featuresUnsupported" + "=" + tests.unsupportedFeatures;
}