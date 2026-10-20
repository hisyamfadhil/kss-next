import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { identity, products } = await request.json();
        // let identity = {
        // "shipping_first_name": "",
        // "shipping_last_name": "",
        // "shipping_email": "",
        // "shipping_phone_number": "",
        // "shipping_company_name": "",
        // "shipping_address": "",
        // "country_id": "",
        // "state_id": "",
        // "shipping_city": "",
        // "shipping_zip_code": "",
        // "shipping_notes": "",
        // }

        // let products = [{
        //     "id": "22e7ccaa-1902-4823-8710-ab78772b4ce0", 
        //     "product_id": 505, 
        //     "product_type": "physical", 
        //     "product_title": "Cheetah 7001H", 
        //     "slug": "cheetah-7001h-505", 
        //     "sku": "", 
        //     "image": "http://localhost:8080/uploads/images/202206/img_x250_62ad64d9bb4715-00843043-17903960.png", 
        //     "quantity": 1, 
        //     "unit_price": 100, 
        //     "total_price": 100, 
        //     "currency": "IDR", 
        //     "discount_rate": 0, 
        //     "is_stock_available": true, 
        //     "options": []
        // }]

        // orders
        // order_number
        // buyer_id = 0
        // buyer_type = guest
        // price_subtotal
        // price_vat
        // price_shipping
        // price_total
        // price_currency
        // status = 0
        // payment_method = Cash On Delivery
        // payment_status = awaiting_payment

        // order products
        // order_id
        // seller_id = 1
        // buyer_id = 0
        // buyer_type = guest
        // product_id
        // product_type
        // listing_type
        // product_title
        // product_slug
        // product_unit_price
        // product_quantity
        // product_currency
        // product_vat_rate
        // product_vat
        // product_total_price
        // variation_option_ids
        // commission_rate
        // order_status
        // is_approved
        // shipping_tracking_number
        // shipping_tracking_url
        // shipping_method
        // seller_shipping_cost

        // order shipping
        // order_id
        // shipping_first_name
        // shipping_last_name
        // shipping_company_name
        // shipping_email
        // shipping_phone_number
        // shipping_address
        // shipping_country
        // shipping_state
        // shipping_city
        // shipping_zip_code
        // shipping_notes

        // billing_first_name
        // billing_last_name
        // billing_company_name
        // billing_email
        // billing_phone_number
        // billing_address
        // billing_country
        // billing_state
        // billing_city
        // billing_zip_code

        const [last_order_number] = await pool.query(`
            SELECT order_number FROM orders ORDER BY id DESC LIMIT 1
        `);
        const test_price_total = products.reduce((sum, item) => sum + item.total_price, 0);
        const test_vat_rate = products.reduce((sum, item) => sum + item.vat_rate, 0);

        let order_number_new = last_order_number.order_number + 1
        let buyer_id = 0
        let buyer_type = "guest"
        let price_subtotal = test_price_total
        let price_vat = test_vat_rate
        let price_shipping = 0
        let price_total = test_price_total + test_vat_rate
        let price_currency = products[0].currency
        let status = 0
        let payment_method = "Cash On Delivery"
        let payment_status = "payment_received"


        const insertOrders = await pool.query(`INSERT INTO orders 
        (order_number, buyer_id, buyer_type, price_subtotal, price_vat, price_shipping, price_total, price_currency, status, payment_method, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            order_number_new,
            buyer_id,
            buyer_type,
            price_subtotal,
            price_vat,
            price_shipping,
            price_total,
            price_currency,
            status,
            payment_method,
            payment_status
        ]);

        let order_id = insertOrders.insertId
        let test_insertOrderProducts = []
        for (const item of products) {
            let seller_id = item.user_id
            let product_id = item.product_id
            let product_type = item.product_type
            let listing_type = item.listing_type
            let product_title = item.product_title
            let product_slug = item.slug
            let product_unit_price = item.unit_price
            let product_quantity = item.quantity
            let product_currency = item.currency
            let product_vat_rate = item.vat_rate
            let product_vat = 0
            let product_total_price = item.total_price
            let variation_option_ids = "a:0:{}"
            let commission_rate = 10
            let order_status = "order_processing"
            let is_approved = 0
            let shipping_tracking_number = ""
            let shipping_tracking_url = ""
            let shipping_method = ""
            let seller_shipping_cost = 0


            const insertOrderProducts = await pool.query(`INSERT INTO order_products (
                order_id, seller_id, buyer_id, buyer_type, product_id, product_type, listing_type, 
                product_title, product_slug, product_unit_price, product_quantity, product_currency, 
                product_vat_rate, product_vat, product_total_price, variation_option_ids, 
                commission_rate, order_status, is_approved, shipping_tracking_number, 
                shipping_tracking_url, shipping_method, seller_shipping_cost
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                order_id, seller_id, buyer_id, buyer_type, product_id, product_type, listing_type,
                product_title, product_slug, product_unit_price, product_quantity, product_currency,
                product_vat_rate, product_vat, product_total_price, variation_option_ids,
                commission_rate, order_status, is_approved, shipping_tracking_number,
                shipping_tracking_url, shipping_method, seller_shipping_cost
            ]);
            test_insertOrderProducts.push(insertOrderProducts)
        }
        // return NextResponse.json({ insertOrders });

        let shipping_first_name = identity.shipping_first_name
        let shipping_last_name = identity.shipping_last_name
        let shipping_company_name = identity.shipping_company_name
        let shipping_email = identity.shipping_email
        let shipping_phone_number = identity.shipping_phone_number
        let shipping_address = identity.shipping_address
        let shipping_country = identity.country
        let shipping_state = identity.state
        let shipping_city = identity.shipping_city
        let shipping_zip_code = identity.shipping_zip_code
        let shipping_notes = identity.shipping_notes
        let billing_first_name = identity.shipping_first_name
        let billing_last_name = identity.shipping_last_name
        let billing_company_name = identity.shipping_company_name
        let billing_email = identity.shipping_email
        let billing_phone_number = identity.shipping_phone_number
        let billing_address = identity.shipping_address
        let billing_country = identity.country
        let billing_state = identity.state
        let billing_city = identity.shipping_city
        let billing_zip_code = identity.shipping_zip_code

        const insertOrderShipping = await pool.query(`INSERT INTO order_shipping (
        order_id, shipping_first_name, shipping_last_name, shipping_company_name, shipping_email,
        shipping_phone_number, shipping_address, shipping_country, shipping_state, shipping_city,
        shipping_zip_code, shipping_notes, billing_first_name, billing_last_name, billing_company_name,
        billing_email, billing_phone_number, billing_address, billing_country, billing_state,
        billing_city, billing_zip_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            order_id, shipping_first_name, shipping_last_name, shipping_company_name, shipping_email,
            shipping_phone_number, shipping_address, shipping_country, shipping_state, shipping_city,
            shipping_zip_code, shipping_notes, billing_first_name, billing_last_name, billing_company_name,
            billing_email, billing_phone_number, billing_address, billing_country, billing_state,
            billing_city, billing_zip_code
        ]);        

        return NextResponse.json({ order_number: order_number_new });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
}