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
       // webView.loadUrl("file:///android_asset/bot.html")
        /*webView.loadData("<html>\n" +
                "<head>\n" +
                " <script type=\"text/javascript\">\n" +
                "\n" +
                "                window.__be = window.__be || {};\n" +
                "                window.__be.id = \"5f1d4359b474b300070e27b1\";\n" +
                "                (function() {\n" +
                "                var be = document.createElement('script');\n" +
                "                be.type = 'text/javascript';\n" +
                "                be.async = true;\n" +
                "                be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';\n" +
                "                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(be, s);\n" +
                "                })();\n" +
                "\n" +
                " </script>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n" +
                "\n" +
                "<p> This is STET CHATBOT </p>\n" +
                "</body>\n" +
                "</html>\n","text/html", "UTF-8")*/


    }

    class JavaScriptInterface
     internal constructor(var mContext: Context) {
        @JavascriptInterface
        fun changeActivity() {


        }

    }

    /*lateinit var adapter: ChatAdapter
    lateinit var ref: DatabaseReference
    lateinit var aiService: AIService
    lateinit var aiDataAIService: AIDataService
    var user: String? = null

    lateinit var mPresenter : MainContract.Presenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
       initPresenter()
        val recyclerView = findViewById<View>(R.id.rvChat) as RecyclerView
        recyclerView.setHasFixedSize(true)
        val layoutManager = LinearLayoutManager(this)
        layoutManager.stackFromEnd = true

        recyclerView.layoutManager = layoutManager
        ref.keepSynced(true)

        btnSend.setOnClickListener {
            val message = edChat.text.toString()
            if (message != "") {
                mPresenter.sendMessage(message)
            } else {
                aiService.startListening()
                Toast.makeText(applicationContext, "Enter message first", Toast.LENGTH_SHORT).show()
            }
            edChat.setText("")
        }

        val options = FirebaseRecyclerOptions.Builder<ChatMessage>()
            .setQuery(ref.child("chat"), ChatMessage::class.java)
            .build()

        adapter = ChatAdapter(options)

        recyclerView.adapter = adapter

        adapter.registerAdapterDataObserver(object : RecyclerView.AdapterDataObserver() {
            override fun onItemRangeInserted(positionStart: Int, itemCount: Int) {
                super.onItemRangeInserted(positionStart, itemCount)

                val msgCount = adapter.itemCount
                val lastVisiblePosition = layoutManager.findLastCompletelyVisibleItemPosition()

                if (lastVisiblePosition == -1 || positionStart >= msgCount - 1 && lastVisiblePosition == positionStart - 1) {
                    recyclerView.scrollToPosition(positionStart)
                }
            }
        })

    }

    override fun onStart() {
        super.onStart()
        adapter.startListening()


    }

    override fun onStop() {
        super.onStop()
        adapter.stopListening()
        mPresenter.onDestroy()
    }

    private fun initPresenter(){
        val aiConfiguration = ai.api.android.AIConfiguration("4d69deed68c741538601a96a606b8913",
            AIConfiguration.SupportedLanguages.English,
            ai.api.android.AIConfiguration.RecognitionEngine.System)

        aiService = AIService.getService(this, aiConfiguration)
        aiDataAIService = AIDataService(aiConfiguration)
        ref = FirebaseDatabase.getInstance().reference

        mPresenter = MainPresenter(aiDataAIService, ref)

    }*/
}