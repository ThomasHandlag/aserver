<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ServerController extends Controller
{

    public function index()
    {
        $data = DB::select("SELECT * FROM users WHERE id NOT IN (SELECT id FROM admin)");
        return Inertia::render('AppDashboard', ['index' => 0, 'users' => $data]);
    }
    public function getReport(Request $request)
    {
        $user_count = DB::table('users')->count('id');
        $data_count = DB::table('datas')->count('id');
        $post_count = DB::table('posts')->count('id');

        return Inertia::render(
            'AppDashboard',
            [
                'index' => 1,
                'report' => [
                    $user_count,
                    $data_count,
                    $post_count
                ]
            ]
        );
    }

    public function getUsers(Request $request)
    {
        $data = DB::select("SELECT * FROM users WHERE id NOT IN (SELECT id FROM admin)");
        return Inertia::render('AppDashboard', ['users' => $data]);
    }

    public function getData()
    {
        $data = DB::select('SELECT * FROM datas');
        return Inertia::render('AppDashboard', ['data' => $data, 'index' => 2]);
    }

    public function storeData(Request $request)
    {
        // dd($request->file('img'));
        $file = $request->file('img');
        $extension = $file->extension();
        $path = $file->storeAs('images', substr(Hash::make(trim($request->error, ' ')), 0, 10) . '.' . $extension);
        DB::insert(
            "INSERT INTO datas (error, solution, description, img, reason, tags) VALUES (?, ?, ?, ?, ?, ?)",
            [
                $request->error, $request->solution,
                $request->description, $path,
                $request->reason, $request->tag
            ]
        );
        return redirect('server');
    }

    public function deleteData(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            DB::delete("DELETE FROM datas WHERE id = ?", [$id]);
        }
        return redirect('server');
    }

    public function updateData(Request $request)
    {
        $file = $request->file('img');
        $extension = $file->extension();
        $path = $file->storeAs('images', substr(Hash::make(trim($request->error, ' ')), 0, 10) . '.' . $extension);
        DB::update(
            "UPDATE datas SET error = ?, solution = ?, description = ?, img = ?, reason = ?, tags = ?, img = ? WHERE id = ?",
            [
                $request->error, $request->solution, $request->description, $path, $request->reason, $request->tag,
                $path, $request->id
            ]
        );
        return redirect('server');
    }
}
