package com.example.stet


import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat.startActivity
import kotlinx.android.synthetic.main.home.*


class ChatBot: AppCompatActivity() {
    var JSInterface: JavaScriptInterface? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.home)

        val webView = findViewById<WebView>(R.id.webView)
        val webSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webView.addJavascriptInterface(JSInterface, "JSInterface")
        webView.loadUrl("https://rajpra786.github.io/chatbot/")


    }

    class JavaScriptInterface
     internal constructor(var mContext: Context) {
        @JavascriptInterface
        fun changeActivity() {


        }

    }

}