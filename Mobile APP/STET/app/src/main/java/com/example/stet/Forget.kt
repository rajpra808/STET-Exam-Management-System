package com.example.stet
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

import com.example.stet.ResetPassword
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.PhoneAuthCredential
import com.google.firebase.auth.PhoneAuthProvider
import com.wajahatkarim3.easyvalidation.core.view_ktx.validator
import kotlinx.android.synthetic.main.forget.*
import java.util.*
import java.util.concurrent.TimeUnit

class Forget : AppCompatActivity() {
    private var mAuth: FirebaseAuth? = null
    var codeSent: String? = null
    var P = 0
    var Q = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.forget)
        mAuth = FirebaseAuth.getInstance()
        loadLocate()
        page_forget_sendotp.setOnClickListener {
            if(validNumber(page_forget_phn_et,10)==0) {
                sendVerificationCode(page_forget_phn_et.text.toString())
            }
        }
        page_forget_verify.setOnClickListener {
                Toast.makeText(this@Forget,getString(R.string.verifying),Toast.LENGTH_LONG).show()

                    verifySignInCode()


        }
        page_forget_submit.setOnClickListener {
            if (P == 1) {
                var i = Intent(this, ResetPassword::class.java)
                i.putExtra("Phone", page_forget_phn_et.text.toString())
                startActivity(i)
            }
        }


    }

    private fun verifySignInCode() {
        val code: String = page_forget_enter_otp.text.toString()
        Log.d("code", "$code   $codeSent")
        val credential = PhoneAuthProvider.getCredential(codeSent!!, code)
        signInWithPhoneAuthCredential(credential)
    }

    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        mAuth?.signInWithCredential(credential)
            ?.addOnCompleteListener(
                this
            ) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(
                        this,
                        getString(R.string.verificationsuccessfull),
                        Toast.LENGTH_LONG
                    ).show()
                    page_forget_verify.text = getString(R.string.verify)
                        page_forget_verify.background = getDrawable(R.drawable.button_shape2)
                        page_forget_enter_otp.visibility = View.INVISIBLE
                        page_forget_sendotp.visibility = View.INVISIBLE
                        page_forget_otp.visibility = View.INVISIBLE
                    P = 1

                } else {
                    if (task.exception is FirebaseAuthInvalidCredentialsException) {
                        Toast.makeText(
                            this,
                            getString(R.string.incorrectcode), Toast.LENGTH_LONG
                        ).show()

                    }
                }
            }
    }

    private fun sendVerificationCode(phn: String) {

        val phone = "+91$phn"
        if (phone.isEmpty()) {
            return
        }
        if (phone.length < 10) {
            return
        }
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
            phone,
            60,
            TimeUnit.SECONDS,
            this,
            mCallbacks
        )

    }

    private var mCallbacks: PhoneAuthProvider.OnVerificationStateChangedCallbacks =
        object : PhoneAuthProvider.OnVerificationStateChangedCallbacks() {


            override fun onVerificationCompleted(phoneAuthCredential: PhoneAuthCredential) {
                Q=1
            }

            override fun onVerificationFailed(e: FirebaseException) {
                Log.d("error", e.toString())
            }

            override fun onCodeSent(
                s: String,
                forceResendingToken: PhoneAuthProvider.ForceResendingToken
            ) {
                super.onCodeSent(s, forceResendingToken)
                codeSent = s
                page_forget_sendotp.text = getString(R.string.resendotp)
                Toast.makeText(
                    this@Forget,
                    getString(R.string.otpsent),
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    private fun validNumber(editText: EditText, d: Int): Int {
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .validNumber()
            .onlyNumbers()
            .maxLength(d)
            .minLength(d)
            .addErrorCallback {
                editText.error = getString(R.string.enterupto) + d + getString(R.string.digitonlu)
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }
    private fun setLocate(Lang: String) {
        val locale = Locale(Lang)
        val config = Configuration()

        config.locale = locale
        baseContext.resources.updateConfiguration(config, baseContext.resources.displayMetrics)

        val editor = getSharedPreferences("Settings", Context.MODE_PRIVATE).edit()
        editor.putString("My_Lang", Lang)
        editor.apply()
    }
    private fun loadLocate() {
        val sharedPreferences = getSharedPreferences("Settings", Activity.MODE_PRIVATE)
        val language = sharedPreferences.getString("My_Lang", "")
        if (language != null) {
            setLocate(language)
        }
    }
}