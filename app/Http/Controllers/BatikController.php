<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Batik;
use App\Models\Island;
use App\Models\Province;
use App\Services\SupabaseService;
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

    public function createDashboard()
    {
        $provinces = Province::all();
        $islands = Island::all();

        return view('create-batik', compact('provinces', 'islands'));
    }

    public function create(Request $request, SupabaseService $supabaseService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'islandId' => 'required|integer',
            'city' => 'required|string',
            'tag' => 'nullable|string',
            'provinceId' => 'required|integer',
            'image' => 'required|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = $request->file('image')->getPathname();
        $imageName = $request->file('image')->getClientOriginalName();
        $imageUrl = $supabaseService->uploadFile($imagePath, $imageName);

        $batik = Batik::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'islandId' => $validated['islandId'],
            'city' => $validated['city'],
            'tag' => $validated['tag'],
            'provinceId' => $validated['provinceId'],
            'linkImage' => $imageUrl,
        ]);

        return redirect()->route('batik.manage')->with('success', 'Batik berhasil ditambahkan.');
    }

    function delete($id)
    {
        $batik = Batik::find($id);
        $batik->delete();

        return redirect()->route('batik.manage')->with('success', 'Batik berhasil ditambahkan.');
    }

    public function updateDashboard($id)
    {
        $batik = Batik::findOrFail($id);
        $provinces = DB::table('provinces')->get();
        $islands = DB::table('islands')->get();

        return view('edit-batik', [
            'batik' => $batik,
            'provinces' => $provinces,
            'islands' => $islands,
        ]);
    }


    public function update(Request $request, SupabaseService $supabaseService, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'islandId' => 'required|integer',
            'city' => 'required|string',
            'tag' => 'nullable|string',
            'provinceId' => 'required|integer',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        ]);

        $batik = Batik::findOrFail($id);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->getPathname();
            $imageName = $request->file('image')->getClientOriginalName();
            $imageUrl = $supabaseService->uploadFile($imagePath, $imageName);

            $batik->linkImage = $imageUrl;
        }

        $batik->name = $validated['name'];
        $batik->description = $validated['description'];
        $batik->islandId = $validated['islandId'];
        $batik->city = $validated['city'];
        $batik->tag = $validated['tag'];
        $batik->provinceId = $validated['provinceId'];

        $batik->save();

        return redirect()->route('batik.manage');
    }

    public function manageBatik(Request $request)
    {
        $search = $request->input('search');

        $query = Batik::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('city', 'like', "%{$search}%");
        }

        $batiks = $query->get();

        return view('manage-batik', compact('batiks', 'search'));
    }
}
