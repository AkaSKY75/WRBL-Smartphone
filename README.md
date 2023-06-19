### The following steps are required to run the mobile application

1. Make sure you have both `NodeJS` and `npm` installed
2. `npx create-expo-app app_name && cd app_name`
3. `npx expo install react-native-bluetooth-classic with-rn-bluetooth-classic`
4. `npx expo install react-native-background-timer`
5. `npx expo install expo-device`
6. `npx expo install crypto-es`
7. `npm install @bugsnag/expo@^48.1.0 @react-native-community/hooks@^3.0.0 @react-native-community/masked-view@^0.1.11 @react-native-community/netinfo@^9.3.10 @react-navigation/bottom-tabs@^6.5.7 @react-navigation/material-top-tabs@^6.6.2 @react-navigation/native@^6.1.6 @react-navigation/stack@^6.3.16 expo-system-ui@~2.2.1 formik@^2.4.1 react@18.2.0 react-native@0.71.8 react-native-gesture-handler@^2.11.0 react-native-reanimated@^3.2.0 react-native-safe-area-context@^4.5.3 react-native-screens@^3.20.0 yup@^1.2.0`
8. Create a file called `eas.json` and add to its content:
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
9. Edit `app.json` file and add to `"plugins"` key the following:
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
10.  Create a file called `app.plugin.js` at location `./plugins/backgroundTimer/app.plugin.js` and add the following content:
```
module.exports = require('./withBackgroundTimer.js');
```
11.  Create a file called `withBackgroundTimer.js` at location `./plugins/backgroundTimer/withBackgroundTimer.js` and add the following content:
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
12. `npx npm install eas-cli`
13. `npx expo prebuild`
14. `npx expo install expo-dev-client`
15. `npx expo run:android`