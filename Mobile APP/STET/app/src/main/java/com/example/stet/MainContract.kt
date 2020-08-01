package com.example.stet
interface MainContract {

    interface View{

    }

    interface Presenter{
        fun sendMessage(message: String)
        fun onDestroy()
    }

}