<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Batik;
use Illuminate\Support\Facades\DB;

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
        $pulau = $request->input('pulau');
        $provinsi = $request->input('provinsi');
        $page = $request->input('page', 1); 

        $limit = 9;
        $offset = ($page - 1) * $limit;

        $query = DB::table('batiks');

        if (!is_null($pulau)) {
            $query->where('islandId', $pulau);
        }

        if (!is_null($provinsi)) {
            $query->where('provinceId', $provinsi);
        }

        $query->offset($offset)->limit($limit);

        $batik = $query->get();

        return Inertia::render('Catalog', [
            'batik' => $batik
        ]);
    }
}
