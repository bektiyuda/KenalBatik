<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function registerForm()
    {
        return Inertia::render('register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('register.form');
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('profile');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function profile()
    {
        $user = Auth::user();

        $userProfile = DB::table('users')
            ->leftJoin('tiers', 'users.tier', '=', 'tiers.name')
            ->leftJoin('user_answers', 'users.id', '=', 'user_answers.userId')
            ->select(
                'users.username',
                'users.experience',
                'users.tier as user_tier',
                'tiers.imageLink as tier_image_link',
                DB::raw('COUNT(user_answers.id) as total_quizzes_taken'),
                DB::raw('SUM(user_answers.totalCorrectAnswer) as total_correct_answer')
            )
            ->where('users.id', $user->id)
            ->groupBy(
                'users.username',
                'users.experience',
                'users.tier',
                'tiers.imageLink'
            )
            ->first();

        $expToNextTier = match ($userProfile->user_tier) {
            'BatikPemula' => 25,
            'BatikPenjelajah' => 50,
            'BatikSatria' => 75,
            'BatikJawara', 'BatikLegenda' => 100,
        };

        $response = [
            'username' => $userProfile->username,
            'user_experience' => $userProfile->experience,
            'user_tier' => $userProfile->user_tier,
            'tier_photo_link' => $userProfile->tier_image_link,
            'exp_to_next_tier' => $expToNextTier,
            'total_quiz' => $userProfile->total_quizzes_taken ?? 0,
            'total_correct_answer' => $userProfile->total_correct_answer ?? 0,
        ];

        return Inertia::render('profile', ['response' => $response]);
    }
}
