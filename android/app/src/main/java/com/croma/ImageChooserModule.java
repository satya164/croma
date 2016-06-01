package com.croma;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.support.annotation.Nullable;
import android.support.v4.content.CursorLoader;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


public class ImageChooserModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final int PICK_IMAGE = 3500;
    private static final int PICK_IMAGE_WITH_CAMERA = 3501;

    private static final String ERR_ACTIVITY_DOES_NOT_EXIST = "Activity doesn't exist";
    private static final String ERR_PICKER_CANCELLED = "Image picker was cancelled";
    private static final String ERR_FAILED_TO_PICK = "Failed to pick image";

    private static final String ERR_ACTIVITY_DOES_NOT_EXIST_CODE = "ERR_ACTIVITY_DOES_NOT_EXIST";
    private static final String ERR_PICKER_CANCELLED_CODE = "ERR_PICKER_CANCELLED";
    private static final String ERR_FAILED_TO_PICK_CODE = "ERR_FAILED_TO_PICK";

    private Promise mPickerPromise;
    private Uri mOutputImageUri;

    public ImageChooserModule(ReactApplicationContext reactContext) {
        super(reactContext);

        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "ImageChooserModule";
    }

    private void cleanupPendingItems() {
        mOutputImageUri = null;
        mPickerPromise = null;
    }

    private void resolvePromise(WritableMap map) {
        if (mPickerPromise != null) {
            mPickerPromise.resolve(map);
        }
        cleanupPendingItems();
    }

    private void rejectPromise(String code, String reason) {
        if (mPickerPromise != null) {
            mPickerPromise.reject(code, reason);
        }
        cleanupPendingItems();
    }

    private void rejectPromise(Exception reason) {
        if (mPickerPromise != null) {
            mPickerPromise.reject(reason);
        }
        cleanupPendingItems();
    }

    @Nullable
    private String getPathFromUri(Uri contentUri) {
        if (contentUri.getScheme().equals("file")) {
            return contentUri.getPath();
        }

        String[] projection = {MediaStore.Images.Media.DATA};

        CursorLoader loader = new CursorLoader(getReactApplicationContext(), contentUri, projection, null, null, null);
        Cursor cursor = loader.loadInBackground();

        try {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);

            cursor.moveToFirst();

            return cursor.getString(column_index);
        } catch (RuntimeException e) {
            return null;
        } finally {
            cursor.close();
        }
    }

    private String getNameFromUri(Uri contentUri) {
        if (contentUri.getScheme().equals("file")) {
            return contentUri.getLastPathSegment();
        }

        String[] projection = {MediaStore.MediaColumns.DISPLAY_NAME};

        Cursor metaCursor = getReactApplicationContext().getContentResolver().query(contentUri, projection, null, null, null);

        if (metaCursor != null) {
            try {
                if (metaCursor.moveToFirst()) {
                    return metaCursor.getString(0);
                }
            } finally {
                metaCursor.close();
            }
        }

        return contentUri.getLastPathSegment();
    }

    private long getSizeFromUri(Uri contentUri) {
        if (contentUri.getScheme().equals("file")) {
            return new File(contentUri.getPath()).length();
        }

        Cursor cursor = getReactApplicationContext().getContentResolver().query(contentUri, null, null, null, null);

        if (cursor != null) {
            cursor.moveToFirst();

            long size = cursor.getLong(cursor.getColumnIndex(OpenableColumns.SIZE));

            cursor.close();

            return size;
        }

        return 0;
    }

    @Nullable
    private WritableMap getImageData(@Nullable  Uri uri) {
        if (uri == null) {
            return null;
        }

        BitmapFactory.Options options = new BitmapFactory.Options();

        options.inJustDecodeBounds = true;

        String path = getPathFromUri(uri);

        if (path != null) {
            BitmapFactory.decodeFile(path, options);

            WritableMap map = Arguments.createMap();

            map.putInt("height", options.outHeight);
            map.putInt("width", options.outWidth);
            map.putDouble("size", getSizeFromUri(uri));
            map.putString("name", getNameFromUri(uri));
            map.putString("uri", uri.toString());

            return map;
        } else {
            return null;
        }
    }

    @ReactMethod
    public void pickImage(final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            mPickerPromise = promise;
        } else {
            promise.reject(ERR_ACTIVITY_DOES_NOT_EXIST_CODE, ERR_ACTIVITY_DOES_NOT_EXIST);
            return;
        }

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            galleryIntent.setType("image/*");

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

            currentActivity.startActivityForResult(chooserIntent, PICK_IMAGE);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void pickImageWithCamera(final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            mPickerPromise = promise;
        } else {
            promise.reject(ERR_ACTIVITY_DOES_NOT_EXIST_CODE, ERR_ACTIVITY_DOES_NOT_EXIST);
            return;
        }

        try {
            final File path = new File(Environment.getExternalStorageDirectory() + File.separator + "Croma" + File.separator);
            final String image = "IMG_" + System.currentTimeMillis() + ".jpg";
            final File outputImage = new File(path, image);

            path.mkdirs();

            mOutputImageUri = Uri.fromFile(outputImage);

            final List<Intent> cameraIntents = new ArrayList<>();
            final Intent captureIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
            final PackageManager packageManager = getReactApplicationContext().getPackageManager();
            final List<ResolveInfo> listCam = packageManager.queryIntentActivities(captureIntent, 0);

            for (ResolveInfo res : listCam) {
                final String packageName = res.activityInfo.packageName;
                final Intent intent = new Intent(captureIntent);

                intent.setComponent(new ComponentName(res.activityInfo.packageName, res.activityInfo.name));
                intent.setPackage(packageName);
                intent.putExtra(MediaStore.EXTRA_OUTPUT, mOutputImageUri);

                cameraIntents.add(intent);
            }

            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            galleryIntent.setType("image/*");

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

            chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, cameraIntents.toArray(new Parcelable[cameraIntents.size()]));
            currentActivity.startActivityForResult(chooserIntent, PICK_IMAGE_WITH_CAMERA);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    public void onActivityResult(final int requestCode, final int resultCode, final Intent intent) {
        if (requestCode == PICK_IMAGE || requestCode == PICK_IMAGE_WITH_CAMERA) {
            if (mPickerPromise != null) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    rejectPromise(ERR_PICKER_CANCELLED_CODE, ERR_PICKER_CANCELLED);
                } else if (resultCode == Activity.RESULT_OK) {
                    try {
                        WritableMap map;

                        if (requestCode == PICK_IMAGE_WITH_CAMERA && mOutputImageUri != null && (intent == null || intent.getData() == null)) {
                            map = getImageData(mOutputImageUri);
                        } else {
                            Uri uri = intent.getData();
                            map = getImageData(uri);
                        }

                        if (map != null) {
                            resolvePromise(map);
                        } else {
                            rejectPromise(ERR_FAILED_TO_PICK_CODE, ERR_FAILED_TO_PICK);
                        }
                    } catch (Exception e) {
                        rejectPromise(e);
                    }
                }
            }
        }
    }
}
