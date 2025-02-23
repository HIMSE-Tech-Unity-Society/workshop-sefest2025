<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::create([
            'name' => 'E - Book',
            'slug' => 'e-book',
            'icon' => 'asset/images/ebook.png'
        ]);
        Category::create([
            'name' => 'Template',
            'slug' => 'template',
            'icon' => 'asset/images/template.png'
        ]);
        Category::create([
            'name' => 'Course',
            'slug' => 'course',
            'icon' => 'asset/images/online-course.png'
        ]);
    }
}
