package com.menteplus.app;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.Locale;

public class MainActivity extends Activity {
  private WebView web;
  private TextToSpeech tts;
  private boolean ttsReady = false;

  @Override
  public void onCreate(Bundle b) {
    super.onCreate(b);
    getWindow().setStatusBarColor(0xffffffff);
    getWindow().setNavigationBarColor(0xffffffff);
    if (Build.VERSION.SDK_INT >= 26) {
      getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
    } else {
      getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    }

    tts = new TextToSpeech(this, status -> {
      if (status == TextToSpeech.SUCCESS) {
        int r = tts.setLanguage(Locale.US);
        if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) r = tts.setLanguage(Locale.ENGLISH);
        ttsReady = r != TextToSpeech.LANG_MISSING_DATA && r != TextToSpeech.LANG_NOT_SUPPORTED;
      }
    });

    web = new WebView(this);
    web.setWebViewClient(new WebViewClient());
    web.setWebChromeClient(new WebChromeClient());
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setTextZoom(100);
    s.setMediaPlaybackRequiresUserGesture(false);
    web.addJavascriptInterface(new Bridge(), "AndroidTTS");
    web.loadUrl("file:///android_asset/index.html");
    setContentView(web);
  }

  class Bridge {
    @JavascriptInterface
    public void speak(String text, float rate) {
      if (tts == null || !ttsReady) return;
      tts.setSpeechRate(rate <= 0 ? 1f : rate);
      tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "mp");
    }
    @JavascriptInterface
    public boolean ready() { return ttsReady; }
  }

  @Override
  public void onBackPressed() {
    web.evaluateJavascript("window.handleBack && window.handleBack()", v -> {
      if (!"true".equals(v)) MainActivity.super.onBackPressed();
    });
  }

  @Override
  protected void onPause() { super.onPause(); if (tts != null) tts.stop(); }

  @Override
  protected void onDestroy() { if (tts != null) tts.shutdown(); super.onDestroy(); }
}
