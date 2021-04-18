/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import "RNSplashScreen.h"
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <CodePush/CodePush.h>

#import <React/RCTLinkingManager.h>
#import <RNFirebaseLinks.h>




@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [RNFirebaseNotifications configure];
  [GMSServices provideAPIKey:@"AIzaSyDTwALDB3H417msJAeGaX737UYUKdUam90"];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"whitelabel"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
//  [RNSplashScreen show];
  return YES;
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)
   (NSArray<id<UIUserActivityRestoring>> *
   _Nullable))restorationHandler
{
  // I am passing the resolved url to both RCTLinking Manager and
  // Firebase Dynamic Link handler here....
  BOOL handled = [[FIRDynamicLinks dynamicLinks]
      handleUniversalLink:userActivity.webpageURL
      completion:^(FIRDynamicLink * _Nullable dynamicLink,
      NSError * _Nullable error) {
    if (!error) {
      [RCTLinkingManager application:application
            openURL:dynamicLink.url options:nil];
      [[RNFirebaseLinks instance] application:application
            openURL:dynamicLink.url options:nil];
     }
  }];
  if(!handled) {
  handled = [RCTLinkingManager application:application
       continueUserActivity:userActivity
       restorationHandler:restorationHandler];
  }
  return handled;
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
return [CodePush bundleURL];
#endif
}

@end
