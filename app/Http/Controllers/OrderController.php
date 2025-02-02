<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getJualanAll()
    {
        $orders  = Order::where('creator_id', Auth::user()->user_id)->with('product.creator')->paginate(9);
        return response()->json($orders, 200);
        //

    }
    public function getPembelianAll(){
        $orders  = Order::where('buyer_id', Auth::user()->user_id)->with('product.creator')->paginate(9);
        return response()->json($orders, 200);

    }

    public function search(){

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "creator_id" => "required|numeric",
            "buyer_id" => "required|numeric",
            "product_id" => "required|numeric",
            "total" => "required|numeric",
            "proof" => "required|image"
        ]);

        $filename = Str::random(5) . '.' . $request->proof->extension();
        $request->proof->storeAs('proof', $filename, 'public');
        Order::create([
            "creator_id" => $request->creator_id,
            "buyer_id" => $request->buyer_id,
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
            return response()->json([
                "data" => $order->with(['product' => function ($query){
                    $query->select('product_id','category_id', 'title','slug', 'product', 'price','overview', 'cover', 'creator_id');
                },'product.creator'])->first()
            ], 200);
        }
        return response()->json([
            "data" => $order->with(['product' => function ($query){
                $query->select('product_id','category_id', 'title','slug', 'price','overview', 'cover', 'creator_id');
            },'product.creator'])->first()
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
