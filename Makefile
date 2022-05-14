file-server:
	cd ../static-file-server && yarn start;

android:
	expo build:android -t apk --no-wait;
	expo export --dev --public-url http://127.0.0.1:8008;
	cp -R ./dist ../static-file-server;
	export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_301`;
	EXPO_USERNAME="DevDavTyan" EXPO_PASSWORD="hRn&t2\!@JY@F-8W" EXPO_ANDROID_KEYSTORE_PASSWORD=adb8c36727fa4c17af08ac27b6282f86 EXPO_ANDROID_KEY_PASSWORD=bf29ca1672034edbba06890334bf6338 turtle build:android --keystore-path /Users/davit/work/free/spendings/@devdavtyan__Accounting-keystore.bak.jks --keystore-alias QGRldmRhdnR5YW4vQWNjb3VudGluZw== --type apk --allow-non-https-public-url --public-url http://127.0.0.1:8008/android-index.json;
