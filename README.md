#Info-Screen

Codebase for easy creations of information screens. 

#Documentation
The Info-Screen project is build with jQuery and PHP. Bootstrap is at the moment not used in the foundation of Info-Screen, but is implemented for fast plugin development.

##Modules
The Info-Screen uses modules to represent different content and allows further development and creations of content to the Info-Screen.

Each module must be wrapped in a folder and contain a index file such as index.html or index.php and a info.json file. The info.json file is used to describe the plugin and set some plugin requirements.

###info.json
	{
		"name": "News",
		"folder": "newsticker",
		"enabled": true,
		"order": 6,
		"airTime": 10,
		"screenSettings": {
			"showHeader": true,
			"showFooter": true
		},
		"scripts": [
			"newsCycle.js"
		]
	}
	
The info.json file has three required fields (name, folder, enabled), the rest of the fields are optional.

* `name` Displayed on screen
* `folder` Folder name
* `enabled` Show or hide module in Info-Screen
* `order` If multiple plugins, they are sorted by the order descending first
* `airTime` Number of seconds used to show the plugin on screen.
* `screenSettings` Used to describe screen requirements
  *  `showHeader` Show or hide the header
  *  `showFooter` Show or hide the footer
* `scripts` List of JavaScripts that will be loaded on run.
	
###JavaScript Files
The JavaScript files are encouraged to be encapsulated and use the start and stop callback functions if necessary. 

####A typical JS boiler template
	(function(window) {

		var binding =  {
			start : startFunction,
			stop : stopFunction
		}

		function startFunction() {
		}

		function stopFunction() {
		}

		SCREEN.addListner(binding, "newsticker");
	})(window);

####Available methods
* `SCREEN.addListner(binding, "pluginFolder")`
* `SCREEN.updateDuration(seconds)`
* `SCREEN.updateCubeBounds()`
* `SCREEN.gotoNextModule()` 







