# Accounting

## Build

* `expo export --dev --public-url http://127.0.0.1:8008`
* `cp -R ./dist ../static-file-server`
  * open static-file-server
  * `yarn start`
* `EXPO_USERNAME="DevDavTyan" EXPO_PASSWORD="hRn&t2\!@JY@F-8W" EXPO_ANDROID_KEYSTORE_PASSWORD=adb8c36727fa4c17af08ac27b6282f86 EXPO_ANDROID_KEY_PASSWORD=bf29ca1672034edbba06890334bf6338 turtle build:android --keystore-path /Users/davit/work/free/spendings/@devdavtyan__Accounting-keystore.bak.jks --keystore-alias QGRldmRhdnR5YW4vQWNjb3VudGluZw== --type apk --allow-non-https-public-url --public-url http://127.0.0.1:8008/android-index.json`

## TODO

* combine to reducer and dispatch
  * services
  * index file service caller functions
  * index file state
* script to add timestamp by `id` *(if not a valid date, add start of that day)*
* calendar
  * open on app loaded
  * open on tap the date at the top of the screen
* when creating new spending use same date as in screen
