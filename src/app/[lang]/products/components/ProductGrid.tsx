
import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import ProductMaster from "@/app/[lang]/components/PageProduct/ProductMaster";
import Image from "next/image";
import { getProductItemImage } from "@/utils/getProductImage";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  url: string;
  slug: string;
  image_second?: string;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  lang: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false, lang }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="bg-gray-200 w-full aspect-square rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <Image
          src={imageBaseUrl("/@static/img/products/No_Product_Found.png")}
          alt="No Product"
          className="mx-auto mb-2 w-1/4"
          width={250}
          height={250}
          loading="lazy"
        />
        <p>No products found</p>
      </div>
    );
  }

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ...products.map((item: any, index: any) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": baseUrl(`/product/${item.slug}`, lang),
                "image": [getProductItemImage(item)]
              })),
              {
                "@type": "ListItem",
                "position": 100,
                "url": baseUrl('/product/cheetah-3002h-2002h', lang),
              },
            ],
          })
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <div key={product.id} className="border border-gray-100">
          <ProductMaster
            data={product}
            promoted_badge={true}
            is_slider={0}
            discount_label={0}
            lang={lang}
            loading={index < 6}
          />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
