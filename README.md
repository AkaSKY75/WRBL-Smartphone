### The following steps are required to run the mobile application

1. Make sure you have both `NodeJS` and `npm` installed
2. `npx create-expo-app app_name && cd app_name`
3. `npx expo install react-native-bluetooth-classic with-rn-bluetooth-classic`
4. `npx expo install react-native-background-timer`
5. `npx expo install expo-device`
6. `npx expo install crypto-es`
7. Create a file called `eas.json` and add to its content:
```
{
	"build": {
		"development": {
	      "developmentClient": true,
	      "distribution": "internal"
		},
		"preview": {
			"distribution": "internal"
		},
		"production": {}
	}
}
```
8. Edit `app.json` file and add to `"plugins"` key the following:
```
"plugins": [
	[
		"with-rn-bluetooth-classic",
        {
			"peripheralUsageDescription": "Allow myDevice to check bluetooth peripheral info",
			"alwaysUsageDescription": "Allow myDevice to always use bluetooth info",
			"protocols": [
				"com.myCompany.p1",
				"com.myCompany.p2"
			]
        }
    ],
	[
    	"./plugins/backgroundTimer/app.plugin.js",
    	"backgroundTimer"
 	]
]
```
9.  Create a file called `app.plugin.js` at location `./plugins/backgroundTimer/app.plugin.js` and add the following content:
```
module.exports = require('./withBackgroundTimer.js');
```
10.  Create a file called `withBackgroundTimer.js` at location `./plugins/backgroundTimer/withBackgroundTimer.js` and add the following content:
```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const pkg = require('../../node_modules/react-native-background-timer/package.json');
const withVoice = (config, props = {}) => {
    const _props = props ? props : {};
    return config;
};
exports.default = config_plugins_1.createRunOncePlugin(withVoice, pkg.name, pkg.version);
```
11. `npx npm install eas-cli`
12. `npx expo prebuild`
13. `npx expo install expo-dev-client`
14. `npx expo run:android`