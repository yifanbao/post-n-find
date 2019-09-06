package com.postnfind;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

public class MainActivity extends SplashActivity implements OnImagePickerPermissionsCallback {
  private PermissionListener listener;

  @Override
  public LinearLayout createSplashLayout() {
    LinearLayout view = new LinearLayout(this);
    TextView textView = new TextView(this);

    view.setBackgroundColor(Color.parseColor("#FFFFFF"));
    view.setGravity(Gravity.CENTER);

    textView.setBackgroundColor(Color.parseColor("#3C00DF"));
    textView.setText("PostNFind");
    textView.setGravity(Gravity.CENTER);
    textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

    view.addView(textView);
    return view;
  }

  @Override
  public void setPermissionListener(PermissionListener listener)
  {
    this.listener = listener;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
  {
    if (listener != null)
    {
      listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
}
