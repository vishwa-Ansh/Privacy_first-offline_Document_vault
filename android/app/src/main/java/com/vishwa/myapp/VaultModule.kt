package com.vishwa.myapp

import android.provider.Settings
import com.facebook.react.bridge.*
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class VaultModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VaultModule"
    }

    @ReactMethod
    fun hello(promise: Promise) {
        promise.resolve("Hello From Kotlin")
    }
    @ReactMethod
    fun ansh(promise: Promise){
        promise.resolve("y name is Ansh and yours")
    }
    @ReactMethod
    fun mmdd(promise:Promise){
        promise.resolve("my mane is Ansh vishwakarma")
    }
    @ReactMethod
    fun getAndroidId(promise : Promise) {
        try {
            val androidId = Settings.Secure.getString(reactApplicationContext.contentResolver,
            Settings.Secure.ANDROID_ID)
            promise.resolve(androidId)
        } catch (e: Exception) {

            promise.reject("ERROR", e.message)
    
        }
    }
}