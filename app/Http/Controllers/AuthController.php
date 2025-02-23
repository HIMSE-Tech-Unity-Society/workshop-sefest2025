<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Post (
 *     path="/api/login",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                      type="object",
 *                      @OA\Property(
 *                          property="email",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="password",
 *                          type="string"
 *                      )
 *                 ),
 *                 example={
 *                     "email":"email@sefest.com",
 *                     "password":"PasswordSefest2025"
 *                }
 *             )
 *         )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Success",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Login Success"),
 *              @OA\Property(property="access_token", type="string", example="1|widjwijdiwjdialdjaiwjdiwjd"),
 *              @OA\Property(property="token_type", type="string", example="Bearer"),
 *          )
 *      ),
 * ),
 * @OA\Post (
 *     path="/api/register",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                      type="object",
 *                      @OA\Property(
 *                          property="name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="email",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="password",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="job",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="bank_name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="account_number",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="account_owner_name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="avatar",
 *                          type="binary"
 *                      )
 *                 ),
 *                 example={
 *                     "name":"John",
 *                     "email":"john@sefest.com",
 *                     "password":"PasswordSefest2025",
 *                     "job":"a student and freelancer full-stack engineer from indonesia, specialized in web development",
 *                     "bank_name":"bca",
 *                     "account_number":"1201220011",
 *                     "account_owner_name":"johndoe",
 *                     "avatar":"image.png",
 *                }
 *             )
 *         )
 *      ),
 *      @OA\Response(
 *          response=201,
 *          description="Success",
 *          @OA\JsonContent(
 *                  @OA\Property(property="message", type="string", example="akun berhasil dibuat, silahkan ke halman login"),
 *              ),
 *          )
 *      ),
 * )
 * @OA\Post (
 *     path="/api/logout",
 *     tags={"Auth"},
 *      @OA\Response(
 *          response=200,
 *          description="Success",
 *          @OA\JsonContent(
 *                  @OA\Property(property="message", type="string", example="logout sukses, terimakasih!"),
 *              ),
 *          )
 *      ),
 * )
 * @OA\Get (
 *     path="/api/user",
 *     tags={"Auth"},
 *      @OA\Response(
 *          response=200,
 *          description="Success",
 *          @OA\JsonContent(
 *                  @OA\Property(
 *                      type="object",
 *                      @OA\Property(
 *                          property="name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="email",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="password",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="job",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="bank_name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="account_number",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="account_owner_name",
 *                          type="string"
 *                      ),
 *                      @OA\Property(
 *                          property="avatar",
 *                          type="binary"
 *                      )
 *                 ),
 *                 example={
 *                     "name":"John",
 *                     "email":"john@sefest.com",
 *                     "password":"PasswordSefest2025",
 *                     "job":"a student and freelancer full-stack engineer from indonesia, specialized in web development",
 *                     "bank_name":"bca",
 *                     "account_number":"1201220011",
 *                     "account_owner_name":"johndoe",
 *                     "avatar":"image.png",
 *                }
 *              ),
 *          )
 *      ),
 * )
 */

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required",
            "password" => "required",
        ]);
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => "Login Success",
            'access_token' => $token,
            "user" => $user,
            'token_type' => 'Bearer'
        ], 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
            'job' => 'required|string',
            'bank_name' => 'required',
            'account_number' => 'required',
            'account_owner_name' => 'required',
            'avatar' => 'nullable|image'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->errors()], 409);
        }
        $query = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
            "job" => $request->job,
            "bank_name" => $request->bank_name,
            "account_number" => $request->account_number,
            "account_owner_name" => $request->account_owner_name
        ];
        if ($request->hasFile("avatar")) {
            $avatar = $request->file('avatar')->store('avatar', 'public');
            $query['avatar'] = $avatar;
        }
        // dd($query);
        $user = User::create($query);
        return response()->json([
            "message" => "akun berhasil dibuat, silahkan ke halman login"
        ], 201);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'logout sukses, terimakasih!',
        ]);
    }
}
