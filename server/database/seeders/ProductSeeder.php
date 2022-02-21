<?php

namespace Database\Seeders;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'MacBook Pro',
            'price' => 2499.99,
            'description' => 'MackBook Pro',
            'image' => 'https://www.cnet.com/a/img/At7JXOb2erGg-eOdKylQhFKfeJY=/2021/10/23/80425069-0d3e-4c67-9085-a66e6177fc60/macbook-pro-2021-cnet-review-12.jpg'
        ]);

        Product::create([
            'name' => 'Dell Vostro 3557',
            'price' => 1499.99,
            'description' => 'Dell Vostro 3557',
            'image' => 'https://i.gadgets360cdn.com/products/laptops/large/1525207698_635_inspiron-15-3567.jpg'
        ]);

        Product::create([
            'name' => 'iPhone 13 Pro',
            'price' => 649.99,
            'description' => 'iPhone 13 Pro',
            'image' => 'https://www.apple.com/in/iphone-13/images/overview/hero/hero_1_static__d195o2nfxt26_large.jpg'
        ]);

        Product::create([
            'name' => 'Remax 610D Headset',
            'price' => 8.99,
            'description' => 'Remax 610D Headset',
            'image' => 'https://i.ytimg.com/vi/TUmsGULI6Pk/maxresdefault.jpg'
        ]);

        Product::create([
            'name' => 'Samsung LED TV',
            'price' => 41.99,
            'description' => 'Samsung LED TV',
            'image' => 'https://images.samsung.com/is/image/samsung/in-full-hd-tv-t5770-ua43t5770aubxl-ua--r----auxxl-227140883?$720_576_PNG$'
        ]);

        Product::create([
            'name' => 'Samsung Digital Camera',
            'price' => 144.99,
            'description' => 'Samsung Digital Camera',
            'image' => 'https://images.samsung.com/is/image/samsung/uk-camera-st72zzbpbg-ec-st72zzbpbgb-001-front-black'
        ]);

        Product::create([
            'name' => 'Huawei GR 5 2017',
            'price' => 148.99,
            'description' => 'Huawei GR 5 2017',
            'price' => 6.79,
            'image' => 'https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2016/12/Huawei-GR5-2017.jpg'
        ]);
        Product::create([
            'name' => 'Watch',
            'price' => 250,
            'description' => 'Good watch',
            'image' => 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        ]);
        Product::create([
            'name' => 'Bag',
            'price' => 350,
            'description' => 'Good Bag',
            'image' => 'https://m.media-amazon.com/images/I/71t0CFsc4sL._SX450_.jpg'
        ]);
        Product::create([
            'name' => 'perfume',
            'price' => 100,
            'description' => 'Good perfume',
            'image' => 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80'
        ]);
        
    }
}
