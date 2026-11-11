package com.menteplus.app;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
public class MainActivity extends Activity {
  private WebView web;
  @Override public void onCreate(Bundle b){super.onCreate(b);getWindow().setStatusBarColor(0xff0c1021);getWindow().setNavigationBarColor(0xff11182d);web=new WebView(this);web.setWebViewClient(new WebViewClient());web.setWebChromeClient(new WebChromeClient());WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);web.loadUrl("file:///android_asset/index.html");setContentView(web);}
  @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
}
