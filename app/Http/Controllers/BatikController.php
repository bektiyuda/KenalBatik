<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Batik;

class BatikController extends Controller
{
    public function index(Request $request)
    {
        $islandId = $request->query('pulau');

        $batiks = collect();

        if ($islandId) {
            $batiks = Batik::where('islandId', $islandId)->get();
        }

        return Inertia::render('Homepage', [
            'batiks' => $batiks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'islandId' => 'required|integer|exists:islands,id',
        ]);

        Batik::create($validated);

        return redirect()->route('homepage');
    }

    public function catalog(Request $request)
    {
        //Mengambil data batik sesui dengan query param pulau atau provinsi dan memberikan pagination dengan offset 9 dan limit 9
        
    }
}
