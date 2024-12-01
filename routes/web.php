<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\BatikController;
use Illuminate\Http\Request;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthenticationAdmin;
use App\Http\Middleware\AuthenticationUser;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Homepage', [
        'authToken' => session('authToken'), // Ambil token dari sesi
    ]);
})->name('Homepage');


Route::get('/healt-check', function() {
    return view('check');
});

Route::get('/prequiz', function () {
    return Inertia::render('PreQuiz');
});

Route::get('/catalog', function (Request $request) {
    $pulau = $request->query('pulau');
    return Inertia::render('Catalog', ['pulau' => $pulau]);
});

Route::get('/cerita', function () {
    return Inertia::render('Cerita');
});

Route::get('/tentangkita', function () {
    return Inertia::render('TentangKita');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

// Route::get('/kuis', function () {
//     return Inertia::render('Kuis');
// });

// PROVINCE
Route::get('/provinces', [ProvinceController::class, 'index'])->name('provinces.index');
Route::post('/provinces', [ProvinceController::class, 'store'])->name('provinces.store');
Route::put('/provinces/{id}', [ProvinceController::class, 'update'])->name('provinces.update');
Route::delete('/provinces/{id}', [ProvinceController::class, 'destroy'])->name('provinces.destroy');

// HOMEPAGE
// Route::get('/homepage', [BatikController::class, 'index'])->name('homepage');
Route::get('/homepage', [BatikController::class, 'index'])->middleware('auth');


//Katalog
Route::get('/catalog', [BatikController::class, 'catalog'])->name('catalog');

//Overview
Route::get('/batik/{id}', [BatikController::class, 'overview'])->name('overview');

//Register
Route::get('/register', [UserController::class, 'registerForm'])->name('register.form');
Route::post('/register', [UserController::class, 'register'])->name('register');

//Login
Route::post('/login', [UserController::class, 'authenticate'])->name('login');
// Route::get('login', function() {
//     return view('login');
// })->name('login');

//Quiz
Route::get('/kuis', [QuizController::class, 'getQuiz'])->middleware(AuthenticationUser::class)->name('quiz');
Route::post('/check-answer', [QuizController::class, 'checkAnswer'])->name('checkanswer');

//Profile
Route::get('/profile', [UserController::class, 'profile'])->middleware(AuthenticationUser::class)->name('profile');

Route::get('/healt-check', function() {
    return view('check');
});

Route::post('/logout', function(Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    // Redirect ke route dengan nama 'Homepage'
    return redirect()->route('Homepage');
})->name('logout');


