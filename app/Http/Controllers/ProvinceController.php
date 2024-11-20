<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Province;

class ProvinceController extends Controller
{
    // Function untuk menampilkan semua data dan form create
    public function index()
    {
        $provinces = Province::all();
        return view('province.index', compact('provinces'));
    }

    // Function untuk menyimpan data baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'island_id' => 'required|integer'
        ]);

        Province::create([
            'name' => $request->input('name'),
            'island_id' => $request->input('island_id')
        ]);

        return redirect()->route('provinces.index')->with('success', 'Province berhasil ditambahkan.');
    }

    // Function untuk mengupdate data
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'island_id' => 'required|integer'
        ]);

        $province = Province::findOrFail($id);
        $province->name = $request->input('name');
        $province->island_id = $request->input('island_id');
        $province->save();

        return redirect()->route('provinces.index')->with('success', 'Province berhasil diperbarui.');
    }

    // Function untuk menghapus data
    public function destroy($id)
    {
        $province = Province::findOrFail($id);
        $province->delete();

        return redirect()->route('provinces.index')->with('success', 'Province berhasil dihapus.');
    }
}
