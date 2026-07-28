package com.vishwa.myapp

import com.facebook.react.bridge.Promise
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
}