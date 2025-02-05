<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

/**
 * @OA\Post(
 *    path="/api/order",
 *    tags={"Order"},
 *    summary="create order",
 *     @OA\RequestBody(
 *       @OA\MediaType(
 *           mediaType="application/json",
 *           @OA\Schema(
 *               @OA\Property(
 *                    type="object",
 *                    @OA\Property(
 *                        property="creator_id",
 *                        type="number"
 *                    ),
 *                    @OA\Property(
 *                        property="product_id",
 *                        type="number"
 *                    ),
 *                    @OA\Property(
 *                        property="total",
 *                        type="number"
 *                    ),
 *                    @OA\Property(
 *                        property="proof",
 *                        type="binary"
 *                    )
 *               ),
 *               example={
 *                   "creator_id":1,
 *                   "product_id":1,
 *                   "total":5000.00,
 *                   "proof":"image.png",
 *              }
 *           )
 *       )
 *    ),
 *    @OA\Response(
 *        response=200,
 *        description="success",
 *        @OA\JsonContent(
 *            @OA\Property(property="message", type="string", example="Order Berhasil dibu"),
 *        )
 *     ),
 *   )
 *
 *  * @OA\Get(
 *     path="/api/creator/order/purchase",
 *     tags={"Order"},
 *     summary="Get list of purchase orders",
 *     description="Retrieve a paginated list of purchase orders with details including product and creator information.",
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         description="Page number for pagination",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             default=1
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of items per page",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             default=9
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="current_page", type="integer", example=1),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="order_id", type="integer", example=1),
 *                     @OA\Property(property="creator_id", type="integer", example=1),
 *                     @OA\Property(property="product_id", type="integer", example=7),
 *                     @OA\Property(property="buyer_id", type="integer", example=2),
 *                     @OA\Property(property="is_paid", type="integer", example=1),
 *                     @OA\Property(property="proof", type="string", example="ksiJX.png"),
 *                     @OA\Property(property="total", type="string", example="5000.00"),
 *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-31T18:48:12.000000Z"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-31T20:03:28.000000Z"),
 *                     @OA\Property(
 *                         property="product",
 *                         type="object",
 *                         @OA\Property(property="product_id", type="integer", example=7),
 *                         @OA\Property(property="creator_id", type="integer", example=1),
 *                         @OA\Property(property="category_id", type="integer", example=1),
 *                         @OA\Property(property="title", type="string", example="online course"),
 *                         @OA\Property(property="slug", type="string", example="online-course"),
 *                         @OA\Property(property="product", type="string", example="https://drive.google.com/drive/folders/1DHarYlQe5EAHue2QKlKvSaXwrRsoy9Vd"),
 *                         @OA\Property(property="overview", type="string", example="ini adalah produk saya yang sudah di masukkan kedalam memek"),
 *                         @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                         @OA\Property(property="price", type="string", example="5000.00"),
 *                         @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-31T07:50:50.000000Z"),
 *                         @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-31T07:50:50.000000Z"),
 *                         @OA\Property(
 *                             property="creator",
 *                             type="object",
 *                             @OA\Property(property="user_id", type="integer", example=1),
 *                             @OA\Property(property="name", type="string", example="Raihan siyun"),
 *                             @OA\Property(property="email", type="string", example="rsiyun@sefest.com"),
 *                             @OA\Property(property="avatar", type="string", example="avatar/TWrfdcbkNVSRLLhdhwZqojaKjG1ysQfQpIRxm6Th.png"),
 *                             @OA\Property(property="job", type="string", example="software engineer at pt kharisma indah"),
 *                             @OA\Property(property="bank_name", type="string", example="bca"),
 *                             @OA\Property(property="account_number", type="string", example="129801209912"),
 *                             @OA\Property(property="account_owner_name", type="string", example="Raihan Siyun"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-29T13:44:30.000000Z"),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-29T13:44:30.000000Z")
 *                         )
 *                     )
 *                 )
 *             ),
 *             @OA\Property(property="first_page_url", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase?page=1"),
 *             @OA\Property(property="from", type="integer", example=1),
 *             @OA\Property(property="last_page", type="integer", example=1),
 *             @OA\Property(property="last_page_url", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase?page=1"),
 *             @OA\Property(
 *                 property="links",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="url", type="string", nullable=true, example=null),
 *                     @OA\Property(property="label", type="string", example="&laquo; Previous"),
 *                     @OA\Property(property="active", type="boolean", example=false)
 *                 )
 *             ),
 *             @OA\Property(property="next_page_url", type="string", nullable=true, example=null),
 *             @OA\Property(property="path", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase"),
 *             @OA\Property(property="per_page", type="integer", example=9),
 *             @OA\Property(property="prev_page_url", type="string", nullable=true, example=null),
 *             @OA\Property(property="to", type="integer", example=3),
 *             @OA\Property(property="total", type="integer", example=3)
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal Server Error",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Internal Server Error")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/creator/order/sales",
 *     tags={"Order"},
 *     summary="Get list of sales orders",
 *     description="Retrieve a paginated list of purchase orders with details including product and creator information.",
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         description="Page number for pagination",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             default=1
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Number of items per page",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             default=9
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             @OA\Property(property="current_page", type="integer", example=1),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="order_id", type="integer", example=1),
 *                     @OA\Property(property="creator_id", type="integer", example=1),
 *                     @OA\Property(property="product_id", type="integer", example=7),
 *                     @OA\Property(property="buyer_id", type="integer", example=2),
 *                     @OA\Property(property="is_paid", type="integer", example=1),
 *                     @OA\Property(property="proof", type="string", example="ksiJX.png"),
 *                     @OA\Property(property="total", type="string", example="5000.00"),
 *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-31T18:48:12.000000Z"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-31T20:03:28.000000Z"),
 *                     @OA\Property(
 *                         property="product",
 *                         type="object",
 *                         @OA\Property(property="product_id", type="integer", example=7),
 *                         @OA\Property(property="creator_id", type="integer", example=1),
 *                         @OA\Property(property="category_id", type="integer", example=1),
 *                         @OA\Property(property="title", type="string", example="online course"),
 *                         @OA\Property(property="slug", type="string", example="online-course"),
 *                         @OA\Property(property="product", type="string", example="https://drive.google.com/drive/folders/1DHarYlQe5EAHue2QKlKvSaXwrRsoy9Vd"),
 *                         @OA\Property(property="overview", type="string", example="ini adalah produk saya yang sudah di masukkan kedalam memek"),
 *                         @OA\Property(property="cover", type="string", example="online-course-IylF1.png"),
 *                         @OA\Property(property="price", type="string", example="5000.00"),
 *                         @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-31T07:50:50.000000Z"),
 *                         @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-31T07:50:50.000000Z"),
 *                         @OA\Property(
 *                             property="creator",
 *                             type="object",
 *                             @OA\Property(property="user_id", type="integer", example=1),
 *                             @OA\Property(property="name", type="string", example="Raihan siyun"),
 *                             @OA\Property(property="email", type="string", example="rsiyun@sefest.com"),
 *                             @OA\Property(property="avatar", type="string", example="avatar/TWrfdcbkNVSRLLhdhwZqojaKjG1ysQfQpIRxm6Th.png"),
 *                             @OA\Property(property="job", type="string", example="software engineer at pt kharisma indah"),
 *                             @OA\Property(property="bank_name", type="string", example="bca"),
 *                             @OA\Property(property="account_number", type="string", example="129801209912"),
 *                             @OA\Property(property="account_owner_name", type="string", example="Raihan Siyun"),
 *                             @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-29T13:44:30.000000Z"),
 *                             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-29T13:44:30.000000Z")
 *                         )
 *                     )
 *                 )
 *             ),
 *             @OA\Property(property="first_page_url", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase?page=1"),
 *             @OA\Property(property="from", type="integer", example=1),
 *             @OA\Property(property="last_page", type="integer", example=1),
 *             @OA\Property(property="last_page_url", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase?page=1"),
 *             @OA\Property(
 *                 property="links",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="url", type="string", nullable=true, example=null),
 *                     @OA\Property(property="label", type="string", example="&laquo; Previous"),
 *                     @OA\Property(property="active", type="boolean", example=false)
 *                 )
 *             ),
 *             @OA\Property(property="next_page_url", type="string", nullable=true, example=null),
 *             @OA\Property(property="path", type="string", example="http://127.0.0.1:8000/api/creator/order/purchase"),
 *             @OA\Property(property="per_page", type="integer", example=9),
 *             @OA\Property(property="prev_page_url", type="string", nullable=true, example=null),
 *             @OA\Property(property="to", type="integer", example=3),
 *             @OA\Property(property="total", type="integer", example=3)
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal Server Error",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Internal Server Error")
 *         )
 *     )
 * )
 *
 *
 * @OA\Put(
 *      path="/api/creator/order/approve/{order}",
 *      operationId="Title",
 *      tags={"Order"},
 *      summary="approve Order",
 *      @OA\Parameter(
 *          description="Parameter with example",
 *          in="path",
 *          name="order",
 *          required=true,
 *          @OA\Schema(type="int"),
 *          @OA\Examples(example="int", value="1", summary="an int value"),
 *      ),
 *     @OA\RequestBody(
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 @OA\Property(
 *                      type="object",
 *                      @OA\Property(
 *                          property="is_paid",
 *                          type="number"
 *                      )
 *                 ),
 *                 example={
 *                     "is_paid":"0"
 *                }
 *             )
 *         )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="success",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="status berhasil diubah")
 *          )
 *       ),
 *     )
 *
 */


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getJualanAll()
    {
        $orders = Order::where('creator_id', Auth::user()->user_id)->with(['product' => function($query){
            $query->select('product_id', 'cover', 'title', 'slug', 'overview', 'cover', 'price', 'creator_id');
        }, 'product.creator'])->paginate(9);
        return response()->json($orders, 200);
        //

    }
    public function getPembelianAll(){
        $orders  = Order::where('buyer_id', Auth::user()->user_id)->with(['product' => function($query){
            $query->select('product_id', 'cover', 'title', 'slug', 'overview', 'cover', 'price', 'creator_id');
        }, 'product.creator'])->paginate(9);
        return response()->json($orders, 200);

    }

    public function search(){

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // tidak boleh dibeli oleh creator sendiri

        $request->validate([
            "creator_id" => "required|numeric",
            // "buyer_id" => "required|numeric",
            "product_id" => "required|numeric",
            "total" => "required|numeric",
            "proof" => "required|image"
        ]);

        $filename = Str::random(5) . '.' . $request->proof->extension();
        $request->proof->storeAs('proof', $filename, 'public');
        Order::create([
            "creator_id" => $request->creator_id,
            "buyer_id" => Auth::user()->user_id,
            "product_id" => $request->product_id,
            "total" => $request->total,
            "proof" => $filename,
            "is_paid" => 0
        ]);
        return response()->json([
            "message" => "order berhasil dibuat"
        ], 200);
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {

        if ($order->is_paid == 1) {
            $order->load(['product' => function ($query) {
                $query->select('product_id', 'category_id', 'title', 'slug', 'product', 'price', 'overview', 'cover', 'creator_id');
            }, 'buyer', 'creator']);

            return response()->json([
                "data" => $order
            ], 200);
        }
        $order->load(['product' => function ($query) {
            $query->select('product_id', 'category_id', 'title', 'slug', 'price', 'overview', 'cover', 'creator_id');
        },'buyer', 'creator']);
        $order['product']['product'] = null;
        return response()->json([
            "data" => $order
        ], 200);
    }


    public function updatePaid(Request $request, Order $order){
        $request->validate([
            "is_paid" => "required|numeric"
        ]);
        $order->update([
            "is_paid" => $request->is_paid
        ]);
        return response()->json([
            "message" => "status berhasil diubah"
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
