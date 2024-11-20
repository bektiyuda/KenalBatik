<?php

namespace App\Http\Controllers;

use App\Models\Island;
use Illuminate\Http\Request;

class IslandController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|regex:/^[\pL\s]+$/u'
        ], [
            'name.required' => 'Nama batik tidak boleh kosong.',
            'name.regex' => 'Nama batik hanya boleh terdiri dari huruf.'
        ]);

        $island = Island::create([
            'name' => $validatedData['name']
        ]);

        return view('xxx', [
            'island' => $island
        ]);
    }

    public function getIslands()
    {
        $islands = Island::all();

        return view('xxx', [
            'islands' => $islands
        ]);
    }

    public function getIsland($id)
    {
        $island = Island::find($id);

        return view('xxx', [
            'island' => $island
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|regex:/^[\pL\s]+$/u'
        ], [
            'name.required' => 'Nama batik tidak boleh kosong.',
            'name.regex' => 'Nama batik hanya boleh terdiri dari huruf.'
        ]);

        $island = Island::find($id);
        $island->name = $validatedData['name'];
        $island->save();

        return view('xxx', [
            'island' => $island
        ]);
    }

    public function delete($id)
    {
        $island = Island::find($id);
        $island->delete();

        return view('xxx');
    }
}
