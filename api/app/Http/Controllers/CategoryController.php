<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

/**
     * @OA\Get (
     *     path="/api/category",
     *     tags={"category"},
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(property="data", type="array",
     *                @OA\Items(type="object",
     *                 @OA\Property(property="category_id", type="number", example=1),
     *                 @OA\Property(property="name", type="string", example="E - Book"),
     *                 @OA\Property(property="slug", type="string", example="e-book"),
     *                 @OA\Property(property="icon", type="string", example="asset/images/ebook.png"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-29T13:29:47.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-29T13:29:47.000000Z"),
     *                ),
     *              ),
     *          )
     *      ),
     * )
     */
class CategoryController extends Controller
{
    //
    public function index(){
        $categories = Category::all();
        return response()->json([
            "data" => $categories,
        ], 200);
    }
}
