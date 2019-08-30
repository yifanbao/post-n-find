package com.postnfind;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

/*
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AsyncStoragePackage(),
            new MapsPackage(),
            new NavigationReactPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
  */

  @Override
  	public boolean isDebug() {
  		// Make sure you are using BuildConfig from your own application
  		return BuildConfig.DEBUG;
  	}

  	protected List<ReactPackage> getPackages() {
  		// Add additional packages you require here
  		// No need to add RnnPackage and MainReactPackage
  		return Arrays.<ReactPackage>asList(
  			// eg. new VectorIconsPackage()
  			new AsyncStoragePackage(),
  			new VectorIconsPackage(),
        new MapsPackage(),
        new ImagePickerPackage()
  		);
  	}

  	@Override
  	public List<ReactPackage> createAdditionalReactPackages() {
  		return getPackages();
  	}
}
