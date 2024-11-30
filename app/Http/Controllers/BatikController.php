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
            $batiks = Batik::where('islandId', $islandId)->get();;
        }

        return Inertia::render('Homepage', [
            'batiks' => $batiks
        ]);
    }

   public function tes()
{
    $batiks = Batik::all();

    return Inertia::render('Catalog', [
        'batiks' => $batiks,
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

    $query = DB::table('batiks')
        ->join('provinces', 'batiks.provinceId', '=', 'provinces.id')
        ->join('islands', 'batiks.islandId', '=', 'islands.id')
        ->select(
            'batiks.*',
            'provinces.name as province_name',
            'islands.name as island_name'
        );

    if (!is_null($pulau)) {
        $query->where('batiks.islandId', $pulau);
    }

    if (!is_null($provinsi)) {
        $query->where('batiks.provinceId', $provinsi);
    }

    $total = $query->count();
    $batik = $query->offset($offset)->limit($limit)->get();

    $islands = DB::table('islands')->get();
    $provinces = DB::table('provinces')->get();

    return Inertia::render('Catalog', [
        'batik' => $batik,
        'islands' => $islands,
        'provinces' => $provinces,
        'currentPage' => (int)$page,
        'totalPages' => (int) ceil($total / $limit),
        'selectedIsland' => $pulau,
        'selectedProvince' => $provinsi,
    ]);
}

    public function overview($id)
    {
        $batik = DB::table('batiks')
        ->join('provinces', 'batiks.provinceId', '=', 'provinces.id')
        ->select('batiks.*', 'provinces.name as province_name') 
        ->where('batiks.id', $id)
        ->first();


        if (!$batik) {
            return redirect('/catalog')->with('error', 'Batik tidak ditemukan.');
        }

        $relatedBatik = DB::table('batiks')
            ->join('provinces', 'batiks.provinceId', '=', 'provinces.id')
            ->select('batiks.*', 'provinces.name as province_name')
            ->where('batiks.id', '!=', $id)
            ->inRandomOrder()
            ->limit(3)
            ->get();

        return Inertia::render('Overview', [
            'batik' => $batik,
            'relatedBatik' => $relatedBatik,
        ]);
    }
}
