<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;

class UserController extends Controller
{

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

        return redirect()->route('Homepage');
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

            $user = Auth::user();
            $token = base64_encode(Hash::make($user->email . now()));

            session(['authToken' => $token]);

            return redirect()->route('Homepage');
        }

        return back()->withErrors([
            'email' => 'Email atau kata sandi salah',
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
                'users.email',
                'users.isAdmin',
                'users.experience',
                'users.tier as user_tier',
                'tiers.imageLink as tier_image_link',
                DB::raw('COUNT(user_answers.id) as total_quizzes_taken'),
                DB::raw('SUM(user_answers.totalCorrectAnswer) as total_correct_answer')
            )
            ->where('users.id', $user->id)
            ->groupBy(
                'users.username',
                'users.email',
                'users.isAdmin',
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
            'email' => $userProfile->email,
            'is_admin' => $userProfile->isAdmin,
            'user_experience' => $userProfile->experience,
            'user_tier' => $userProfile->user_tier,
            'tier_photo_link' => $userProfile->tier_image_link,
            'exp_to_next_tier' => $expToNextTier,
            'total_quiz' => $userProfile->total_quizzes_taken * 5 ?? 0,
            'total_correct_answer' => $userProfile->total_correct_answer ?? 0,
        ];

        return response()->json($response);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            // Ambil informasi user dari Google
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Cari user berdasarkan email atau buat user baru
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'username' => $googleUser->getName(),
                    'password' => bcrypt('google-default-password'), // Password dummy
                ]
            );

            // Login user
            Auth::login($user);

            $user = Auth::user();
            $token = base64_encode(Hash::make($user->email . now()));

            session(['authToken' => $token]);

            // Redirect ke halaman profile
            return redirect()->route('Homepage')->with('success', 'Login menggunakan Google berhasil!');
        } catch (\Exception $e) {
            // Jika terjadi error
            return redirect('/')->withErrors(['error' => 'Gagal login menggunakan Google.']);
        }
    }
}
