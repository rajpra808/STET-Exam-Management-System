package com.example.stet


import android.app.AlertDialog
import android.app.ProgressDialog
import android.content.DialogInterface
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity


class ChatBot: AppCompatActivity() {            //This file is for chatbot activity.

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.home)

        val webView = findViewById<WebView>(R.id.webView)
        val alertDialog: AlertDialog = AlertDialog.Builder(this).create()      //alert dialog
        val progressBar = ProgressDialog.show(this@ChatBot, "AYA CHATBOT", "Loading...")
        //webview client
        webView.webViewClient = object : WebViewClient() {
            //url loading
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                Log.i("TAG", "Processing webview url click...")
                view.loadUrl(url)
                return true
            }
            //url loaded
            override fun onPageFinished(view: WebView, url: String) {
                Log.i("TAG", "Finished loading URL: $url")
                if (progressBar.isShowing) {
                    progressBar.dismiss()
                }
            }
            //on error
            override fun onReceivedError(
                view: WebView,
                errorCode: Int,
                description: String,
                failingUrl: String
            ) {
                Log.e("TAG", "Error: $description")
                Toast.makeText(this@ChatBot, "Oh no! $description", Toast.LENGTH_SHORT).show()
                alertDialog.setTitle("Error")
                alertDialog.setMessage(description)
                alertDialog.setButton("OK",
                    DialogInterface.OnClickListener { _, _ -> return@OnClickListener })
                alertDialog.show()
            }
        }
        //loadurl
        webView.loadUrl("https://rajpra786.github.io/chatbot/")


    }



}