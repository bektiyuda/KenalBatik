<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Homepage');
});


Route::get('/healt-check', function() {
    return view('check');
});