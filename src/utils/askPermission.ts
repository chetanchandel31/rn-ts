import { PermissionsAndroid, ToastAndroid } from "react-native";

export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    console.log(granted);

    if (
      granted["android.permission.READ_EXTERNAL_STORAGE"] === "denied" ||
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] === "denied"
    ) {
      // if statement changed as per type inference
      ToastAndroid.show(
        "We cannot proceed without permissions",
        ToastAndroid.LONG
      );
      requestPermission();
    }
  } catch (err) {
    console.log(err);
  }
};
