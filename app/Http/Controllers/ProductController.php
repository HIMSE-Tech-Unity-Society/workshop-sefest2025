<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


/**
 * @OA\Get(
 * path="/api/product/all",
 * tags={"product"},
 * summary="Product get for all",
 *      @OA\Response(
 *          response=200,
 *          description="success",
 *          @OA\JsonContent(
 *              @OA\Property(property="current_page", type="number", example=1),
 *              @OA\Property(property="data", type="array",
 *                  @OA\Items(type="object",
 *                      @OA\Property(property="product_id", type="number", example=1),
 *                      @OA\Property(property="creator_id", type="number", example=1),
 *                      @OA\Property(property="category_id", type="number", example=1),
 *                      @OA\Property(property="title", type="string", example="Online Course"),
 *                      @OA\Property(property="slug", type="string", example="online-course"),
 *                      @OA\Property(property="overview", type="string", example="ini adalah produk saya"),
 *                      @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                      @OA\Property(property="price", type="number", example=5000),
 *                      @OA\Property(property="creator", type="object",
 *                          @OA\Property(property="user_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="johndoe"),
 *                          @OA\Property(property="avatar", type="string", example="image.png"),
 *                      ),
 *                      @OA\Property(property="category", type="object",
 *                          @OA\Property(property="category_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="E - Book"),
 *                      )
 *                  )
 *              ),
 *              @OA\Property(property="first_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="from", type="number", example=1),
 *              @OA\Property(property="last_page", type="number", example=1),
 *              @OA\Property(property="links", type="array",
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="&laquo; Previous"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *                  @OA\Property(property="label", type="string", example="1"),
 *                  @OA\Property(property="active", type="boolean", example=true)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="Next &raquo;"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                )
 *              ),
 *              @OA\Property(property="last_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="next_page_url", type="string", example="null"),
 *              @OA\Property(property="path", type="string", example="http://127.0.0.1:8000/api/product/all"),
 *              @OA\Property(property="per_page", type="number", example=6),
 *              @OA\Property(property="prev_page_url", type="number", example=null),
 *              @OA\Property(property="to", type="number", example=2),
 *              @OA\Property(property="total", type="number", example=2),
 *          )
 *      ),
 * )
 * @OA\Get(
 * path="/api/product/search",
 * tags={"product"},
 * summary="Product get for search",
 *     @OA\Parameter(
 *          in="query",
 *          name="category_id",
 *          required=false,
 *          @OA\Schema(type="int"),
 *      ),
 *     @OA\Parameter(
 *          in="query",
 *          name="keyword",
 *          required=false,
 *          @OA\Schema(type="string"),
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="success",
 *          @OA\JsonContent(
 *              @OA\Property(property="current_page", type="number", example=1),
 *              @OA\Property(property="data", type="array",
 *                  @OA\Items(type="object",
 *                      @OA\Property(property="product_id", type="number", example=1),
 *                      @OA\Property(property="creator_id", type="number", example=1),
 *                      @OA\Property(property="category_id", type="number", example=1),
 *                      @OA\Property(property="title", type="string", example="Online Course"),
 *                      @OA\Property(property="slug", type="string", example="online-course"),
 *                      @OA\Property(property="overview", type="string", example="ini adalah produk saya"),
 *                      @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                      @OA\Property(property="price", type="number", example=5000),
 *  *                   @OA\Property(property="creator", type="object",
 *                          @OA\Property(property="user_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="johndoe"),
 *                          @OA\Property(property="avatar", type="string", example="image.png"),
 *                      ),
 *                      @OA\Property(property="category", type="object",
 *                          @OA\Property(property="category_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="E - Book"),
 *                      )
 *                  )
 *              ),
 *              @OA\Property(property="first_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="from", type="number", example=1),
 *              @OA\Property(property="last_page", type="number", example=1),
 *              @OA\Property(property="links", type="array",
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="&laquo; Previous"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *                  @OA\Property(property="label", type="string", example="1"),
 *                  @OA\Property(property="active", type="boolean", example=true)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="Next &raquo;"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                )
 *              ),
 *              @OA\Property(property="last_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="next_page_url", type="string", example="null"),
 *              @OA\Property(property="path", type="string", example="http://127.0.0.1:8000/api/product/all"),
 *              @OA\Property(property="per_page", type="number", example=6),
 *              @OA\Property(property="prev_page_url", type="number", example=null),
 *              @OA\Property(property="to", type="number", example=2),
 *              @OA\Property(property="total", type="number", example=2),
 *          )
 *      ),
 * )
 *
 * @OA\Get(
 *      path="/api/product/detail/{slug}",
 *      @OA\Parameter(
 *          in="path",
 *          name="slug",
 *          required=true,
 *          @OA\Schema(type="string"),
 *          @OA\Examples(example="string", value="online-course", summary="an string value"),
 *      ),
 *      tags={"product"},
 *      summary="product detail",
 *      @OA\Response(
 *          response=200,
 *          description="success",
 *          @OA\JsonContent(
 *             @OA\Property(property="data", type="object",
 *              @OA\Property(property="product", type="object",
  *                     @OA\Property(property="product_id", type="number", example=1),
 *                      @OA\Property(property="creator_id", type="number", example=1),
 *                      @OA\Property(property="category_id", type="number", example=1),
 *                      @OA\Property(property="title", type="string", example="Online Course"),
 *                      @OA\Property(property="slug", type="string", example="online-course"),
 *                      @OA\Property(property="overview", type="string", example="ini adalah produk saya"),
 *                      @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                      @OA\Property(property="price", type="number", example=5000),
 *                      @OA\Property(property="creator", type="object",
 *                          @OA\Property(property="user_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="johndoe"),
 *                          @OA\Property(property="avatar", type="string", example="image.png"),
 *                          @OA\Property(property="email", type="string", example="johndoe@sefest.com"),
 *                          @OA\Property(property="job", type="string", example="software engineer at pt kharisma indah"),
 *                          @OA\Property(property="bank_name", type="string", example="bca"),
 *                          @OA\Property(property="account_number", type="string", example="1201220011"),
 *                          @OA\Property(property="account_owner_name", type="string", example="johndoe"),
 *                          @OA\Property(property="created_at", type="string", example="2025-01-29T13:44:30.000000Z"),
 *                          @OA\Property(property="updated_at", type="string", example="2025-01-29T13:44:30.000000Z"),
 *                          @OA\Property(property="totalproductbycreator", type="number", example=5),
 *                      ),
 *                      @OA\Property(property="category", type="object",
 *                          @OA\Property(property="category_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="E - Book"),
 *                      )
 *              ),
 *              @OA\Property(property="others", type="array",
 *                  @OA\Items(type="object",
 *                      @OA\Property(property="product_id", type="number", example=1),
 *                      @OA\Property(property="creator_id", type="number", example=1),
 *                      @OA\Property(property="category_id", type="number", example=1),
 *                      @OA\Property(property="title", type="string", example="Online Course"),
 *                      @OA\Property(property="slug", type="string", example="online-course"),
 *                      @OA\Property(property="overview", type="string", example="ini adalah produk saya"),
 *                      @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                      @OA\Property(property="price", type="number", example=5000),
 *  *                   @OA\Property(property="creator", type="object",
 *                          @OA\Property(property="user_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="johndoe"),
 *                          @OA\Property(property="avatar", type="string", example="image.png"),
 *                      ),
 *                      @OA\Property(property="category", type="object",
 *                          @OA\Property(property="category_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="E - Book"),
 *                      )
 *                  )
 *              ),
 *             )
 *          )
 *
 *       ),
 *     )
 *
 * @OA\Get(
 *    path="/api/creator/product",
 *    tags={"product"},
 *    summary="creator get product",
 *    @OA\Parameter(
 *          in="header",
 *          name="Authorization",
 *          required=true,
 *          @OA\Schema(type="string"),
 *          @OA\Examples(example="string", value="Bearer 1|Mkf3uIuT7EnM0QsiKcgyt1j9JuS5ZmKm9euElgcue781ff07", summary="string"),
 *      ),
 *    @OA\Response(
 *        response=200,
 *        description="success",
*          @OA\JsonContent(
 *              @OA\Property(property="current_page", type="number", example=1),
 *              @OA\Property(property="data", type="array",
 *                  @OA\Items(type="object",
 *                      @OA\Property(property="product_id", type="number", example=1),
 *                      @OA\Property(property="creator_id", type="number", example=1),
 *                      @OA\Property(property="category_id", type="number", example=1),
 *                      @OA\Property(property="title", type="string", example="Online Course"),
 *                      @OA\Property(property="slug", type="string", example="online-course"),
 *                      @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                      @OA\Property(property="price", type="number", example=5000),
 *                      @OA\Property(property="category", type="object",
 *                          @OA\Property(property="category_id", type="number", example=1),
 *                          @OA\Property(property="name", type="string", example="E - Book"),
 *                      )
 *                  )
 *              ),
 *              @OA\Property(property="first_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="from", type="number", example=1),
 *              @OA\Property(property="last_page", type="number", example=1),
 *              @OA\Property(property="links", type="array",
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="&laquo; Previous"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *                  @OA\Property(property="label", type="string", example="1"),
 *                  @OA\Property(property="active", type="boolean", example=true)
 *                ),
 *                @OA\Items(type="object",
 *                  @OA\Property(property="url", type="string", nullable=true, example=null),
 *                  @OA\Property(property="label", type="string", example="Next &raquo;"),
 *                  @OA\Property(property="active", type="boolean", example=false)
 *                )
 *              ),
 *              @OA\Property(property="last_page_url", type="string", example="http://127.0.0.1:8000/api/product/all?page=1"),
 *              @OA\Property(property="next_page_url", type="string", example="null"),
 *              @OA\Property(property="path", type="string", example="http://127.0.0.1:8000/api/product/all"),
 *              @OA\Property(property="per_page", type="number", example=6),
 *              @OA\Property(property="prev_page_url", type="number", example=null),
 *              @OA\Property(property="to", type="number", example=2),
 *              @OA\Property(property="total", type="number", example=2),
 *          )
 *     ),
 * )
 */



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::with(['creator:user_id,name,avatar', 'category:category_id,name'])->select(['product_id', 'creator_id', 'category_id', 'title', 'slug', 'overview', 'cover', 'price'])->paginate(6);
        return response()->json($product, 200);
    }

    public function getAllbycreator()
    {
        $product = Product::where('creator_id', Auth::user()->user_id)->with(['category:category_id,name'])->select('product_id','creator_id','category_id','title','slug','cover','price')->paginate(6);
        return response()->json($product);
    }
    public function getOnebycreator($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if ($product->creator_id != Auth::user()->user_id) {
            return response()->json([
                "data" => [],
                "message" => "Tidak boleh membuka product orang lain"
            ], 200);
        }
        return response()->json([
            "data" => $product,
        ], 200);
    }

    public function search(Request $request)
    {
        $query = Product::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('keyword')) {
            $query->where('title', 'like', "%{$request->keyword}%");
        }
        $products = $query->with(['creator:user_id,name,avatar', 'category:category_id,name'])->select(['product_id', 'creator_id', 'category_id', 'title', 'slug', 'overview', 'cover', 'price'])->paginate(6);
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cover' => 'required|image',
            'product' => 'required',
            'title' => 'required',
            'category_id' => 'required|numeric',
            'overview' => 'required',
            'price' => 'required|numeric'
        ]);
        $slug = Str::slug($request->title);
        while (true) {
            $slug_count = DB::table("products")->where('slug', $slug)->count();

            if ($slug_count == 0) {
                break;
            }
            $slug = Str::slug($request->title) . '-' . Str::random(5);
        }
        $filename = Str::slug($request->title) . '-' . Str::random(5) . '.' . $request->cover->extension();
        $request->cover->storeAs('cover', $filename, 'public');
        $product = Product::create([
            "creator_id" => Auth::user()->user_id,
            "category_id" => $request->category_id,
            "overview" => $request->overview,
            "title" => $request->title,
            "slug" => $slug,
            "price" => $request->price,
            "cover" => $filename,
            "product" => $request->product,
        ]);
        return response()->json([
            "message" => "product berhasil ditambahkan",
            "data" => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)->with(['creator', 'category:category_id,name'])->first(['product_id', 'creator_id', 'category_id', 'title', 'slug', 'overview', 'cover', 'price']);
        $totalProductsByCreator = Product::where('creator_id', $product->creator_id)->count();
        $product->creator["totalproductbycreator"] = $totalProductsByCreator;
        $others = Product::whereNot('product_id', $product->product_id)
        ->with(['creator:user_id,name,avatar', 'category:category_id,name'])->limit(5)->get(['product_id', 'creator_id', 'category_id', 'title', 'slug', 'overview', 'cover', 'price']);
        return response()->json([
            "data" => [
                "product" => $product,
                "others" => $others
            ]
        ], 200);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $request->validate([
            'cover' => 'nullable|image',
            'product' => 'required',
            'title' => 'required',
            'category_id' => 'required|numeric',
            'overview' => 'required',
            'price' => 'required|numeric'
        ]);
        $product = Product::where('slug', $slug)->first();
        $query = [
            "product" => $request->product,
            "title" => $request->title,
            "category_id" => $request->category_id,
            "overview" => $request->overview,
            "price" => $request->price
        ];
        if ($request->cover) {
            if ($product->cover) {
                $imagePath = public_path('storage/cover/' . $product->cover);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            $filename = Str::slug($request->title) . '-' . Str::random(5) . '.' . $request->cover->extension();
            $request->cover->storeAs('cover', $filename, 'public');
            $query['cover'] = $filename;
        }
        $product->update($query);
        return response()->json([
            "data" => $product,
        ], 200);

        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if ($product->cover) {
            $imagePath = public_path('storage/cover/' . $product->cover);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        $product->delete();
        return response()->json([
            "message" => "Product sudah dihapus"
        ], 200);
        //
    }
}
