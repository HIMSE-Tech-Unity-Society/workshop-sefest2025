<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $primaryKey = 'order_id';
    protected $table = 'orders';
    protected $guarded = ['order_id'];

    public function creator(){
        return $this->hasOne(User::class, 'user_id', 'creator_id');
    }
    public function buyer(){
        return $this->hasOne(User::class, 'user_id', 'buyer_id');
    }
    public function product(){
        return $this->hasOne(Product::class, 'product_id', 'product_id');
    }
    //
}
