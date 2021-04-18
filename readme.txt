====Installation====

npm install
cd ios && pod install 

====Run==== 

Android 
react-native run-Android 

ios
react-native run-ios 

====Change Salon====

Change Salon_id 
path : src/utils/api-configuration.tsx

====Change Salon Logo / Splash Image====

====Change Firebase ,sentry,Mixpanel account

====Hot code Push====


https://github.com/microsoft/appcenter-cli

 appcenter codepush deployment list -a nihal.console-gmail.com/whitelabel-iOS --k 


WhiteLabel iOS prod : JI28CJe4uuUYrmZjpBxdRFxYMkBMBUibhhTaN 
WhiteLabel iOS stage:  OJK2yDt4pSYOZxbt_1ZrZ3j_UbzUIKZOXEIyH


WhiteLabel android stag : Eejwe2OwD-aLb5eZtfLaYOVJvzDFI6k4sR8WN
WhiteLabel android prod : bpbnOkduvas5i-P77htpLfBgjBMa5pi5Ig8y8


appcenter codepush deployment list -a nihal.console-gmail.com/whitelabel-iOS --k


Creat app in appcenter

appcenter apps create -d stylesalon-iOS -o iOS -p React-Native


Create key for app 

appcenter codepush deployment add -a nihal.console-gmail.com/stylesalon-iOS  Production
  

Check if installed

appcenter codepush deployment history -a nihal.console-gmail.com/whitelabel-Android Staging


Release command 
 

appcenter codepush release-react -a nihal.console-gmail.com/stylesalon-iOS -d Production
 
appcenter codepush release-react -a nihal.console-gmail.com/stylesalon-Android -d Production



--description 






