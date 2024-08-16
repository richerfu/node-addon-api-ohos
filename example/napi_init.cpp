//
// Created by ranger on 2024/8/16.
//
#include <napi.h>

Napi::Value Method(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // 判断参数是否符合预期
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
        return env.Null();
    }

    // 也是判断参数是否符合预期
    if (!info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    // 获取 JS 参数并且转成 C++ 类型
    double arg0 = info[0].As<Napi::Number>().DoubleValue();
    double arg1 = info[1].As<Napi::Number>().DoubleValue();
    // 将 add 之后的数据创建成 JS 的 number 数据
    Napi::Number num = Napi::Number::New(env, arg0 + arg1);

    return num;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "hello"),
                Napi::Function::New(env, Method));
    return exports;
}

NODE_API_MODULE(example, Init)