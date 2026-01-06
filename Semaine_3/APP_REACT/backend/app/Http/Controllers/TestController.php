
<?php
// app/Http/Controllers/TestController.php
namespace App\Http\Controllers;


use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testConnection()
    {
        return response()->json([
            'message' => 'Connexion API réussie',
            'timestamp' => now(),
            'status' => 'OK'
        ]);
    }

    public function testAuth(Request $request)
    {
        return response()->json([
            'message' => 'Authentification réussie',
            'user' => $request->user(),
            'authenticated' => auth()->check()
        ]);
    }
}
