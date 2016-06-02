package com.croma;


import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import me.croma.image.Color;
import me.croma.image.Image;
import me.croma.image.KMeansColorPicker;

public class ColorExtractorModule extends ReactContextBaseJavaModule {

    public ColorExtractorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ColorExtractorModule";
    }

    private Bitmap getBitmap(Uri uri) throws FileNotFoundException {
        final InputStream stream = getReactApplicationContext().getContentResolver().openInputStream(uri);

        return BitmapFactory.decodeStream(stream);
    }

    private List<Color> getColorList(Bitmap bitmap, int count) throws IOException {
        BitmapImage b = new BitmapImage(bitmap);

        KMeansColorPicker k = new KMeansColorPicker();

        return k.getUsefulColors(b, count);
    }


    @ReactMethod
    public void extractColors(final String uri, final int count, final Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Bitmap bitmap = getBitmap(Uri.parse(uri));
                    final List<Color> colors = getColorList(bitmap, count);

                    WritableArray data = Arguments.createArray();

                    for (int i = 0; i < colors.size(); i++) {
                        data.pushString(colors.get(i).toHexString());
                    }

                    promise.resolve(data);
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    private class BitmapImage extends Image {
        private Bitmap mBitmap;

        public BitmapImage(Bitmap b) {
            super(b.getWidth(), b.getHeight());
            mBitmap = b;
        }

        @Override
        public Color getColor(int x, int y) {
            return new Color(mBitmap.getPixel(x, y));
        }

        @Override
        public BitmapImage getScaledInstance(int width, int height) {
            Bitmap resized = Bitmap.createScaledBitmap(mBitmap, width, height, true);

            return new BitmapImage(resized);
        }
    }
}

