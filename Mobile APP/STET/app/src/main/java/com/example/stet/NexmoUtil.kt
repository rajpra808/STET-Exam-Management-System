import android.content.Context
import com.nexmo.sdk.NexmoClient
import com.nexmo.sdk.core.client.ClientBuilderException
import com.nexmo.sdk.verify.client.VerifyClient
import com.nexmo.sdk.verify.event.*
import java.io.IOException

/**
 * Handle mobile number verification feature of app.
 */
class NexmoUtil : VerifyClientListener, SearchListener {
    private var mNexmoListener: NexmoListener? = null
    private var mCountryCode: String? = null
    private var mMobileNumber: String? = null

    /**
     * Set Callback listener.
     *
     * @param listener instance.
     */


    @Override
    fun setListener(listener: NexmoListener?) {
        mNexmoListener = listener
        if (verifyClient != null) {
            verifyClient!!.removeVerifyListeners()
            verifyClient!!.addVerifyListener(this)
        }
    }

    @Override
    override fun onException(e: IOException?) {
        // Crashlytics.logException(e)
        if (mNexmoListener != null) {
            mNexmoListener!!.onMobileVerificationError(null)
        }
    }

    @Override
    override fun onVerifyInProgress(verifyClient: VerifyClient?, userObject: UserObject?) {
        if (mNexmoListener != null) {
            mNexmoListener!!.onMobileVerificationInProgress(verifyClient, userObject)
        }
    }

    @Override
    override fun onUserVerified(verifyClient: VerifyClient?, userObject: UserObject?) {
        if (mNexmoListener != null) {
            mNexmoListener!!.onMobileNumberVerified(verifyClient, userObject)
        }
    }

    @Override
    override fun onError(verifyClient: VerifyClient?, errorCode: VerifyError?, user: UserObject?) {
        if (mNexmoListener != null) {
            mNexmoListener!!.onMobileVerificationError(errorCode)
        }
    }

    /**
     * Send number for get OTP.
     *
     * @param countryCode  country code.
     * @param mobileNumber mobile number.
     */

    fun getVerifiedUser(countryCode: String?, mobileNumber: String?) {
        mCountryCode = countryCode
        //        mCountryCode = "IN"
        mMobileNumber = mobileNumber
        verifyClient?.getUserStatus(mCountryCode, mobileNumber, this@NexmoUtil)
    }

    /**
     * Cancel verified number.
     *
     * @param countryCode  country code.
     * @param mobileNumber mobile number.
     */

    private fun cancelVerification(countryCode: String?, mobileNumber: String?) {
        verifyClient?.command(
            countryCode,
            mobileNumber,
            Command.LOGOUT,
            object : CommandListener {
                override fun onSuccess(command: Command?) {
                    sendOtp(countryCode, mobileNumber)
                }

                override fun onError(
                    command: Command?,
                    verifyError: VerifyError?,
                    s: String?
                ) {
                    if (mNexmoListener != null) {
                        mNexmoListener!!.onMobileVerificationError(verifyError)
                    }
                }

                override fun onException(e: IOException?) {
                    //Crashlytics.logException(e)
                    if (mNexmoListener != null) {
                        mNexmoListener!!.onMobileVerificationError(null)
                    }
                }
            })
    }

    /**
     * Get OPT
     *
     * @param countryCode  country code.
     * @param mobileNumber mobile number.
     */

    private fun sendOtp(countryCode: String?, mobileNumber: String?) {
        if (verifyClient != null && countryCode != null && mobileNumber != null) {
            verifyClient!!.getVerifiedUser(countryCode, mobileNumber)
            //          verifyClient.getVerifiedUser("IN", mobileNumber)
        }
    }

    /**
     * Verify OTP.
     *
     * @param otp value.
     */

    fun checkPinCode(otp: String?) {
        if (verifyClient != null && otp != null) {
            verifyClient!!.checkPinCode(otp)
        }
    }

    override fun onUserStatus(userStatus: UserStatus) {
        if (userStatus === UserStatus.USER_VERIFIED) {
            cancelVerification(mCountryCode, mMobileNumber)
        } else {
            sendOtp(mCountryCode, mMobileNumber)
        }
    }

    override fun onError(verifyError: VerifyError?, s: String?) {
        if (mNexmoListener != null) {
            mNexmoListener!!.onMobileVerificationError(verifyError)
        }
    }

    interface NexmoListener {
        /**
         * Number verification under progress.
         *
         * @param verifyClient instance.
         * @param userObject   instance.
         */
        fun onMobileVerificationInProgress(
            verifyClient: VerifyClient?,
            userObject: UserObject?
        )

        /**
         * Enter OTP verified.
         *
         * @param verifyClient instance.
         * @param userObject   instance.
         */
        fun onMobileNumberVerified(
            verifyClient: VerifyClient?,
            userObject: UserObject?
        )

        /**
         * Nexmo API's error.
         *
         * @param verifyError instance.
         */
        fun onMobileVerificationError(verifyError: VerifyError?)
    }

    companion object {
        var verifyClient: VerifyClient? = null
        private var mInstance: NexmoUtil? = null
        fun getInstance(context: Context): NexmoUtil? {
            if (verifyClient == null) {
                mInstance = NexmoUtil()
                try {
                    val nexmoClient: NexmoClient? = NexmoClient.NexmoClientBuilder()
                        .context(context)
                        .applicationId("e3712551")
                        .sharedSecretKey("D0kwDNQLzHYDxUnU")
                        .build()
                    verifyClient = VerifyClient(nexmoClient)
                } catch (e: ClientBuilderException) {
                    //Crashlytics.logException(e)
                }
            }
            return mInstance
        }


    }

}