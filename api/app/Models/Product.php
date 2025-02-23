<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey ='product_id';
    protected $table = 'products';
    protected $guarded = ['product_id'];

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id', 'user_id');
    }
    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }
}
