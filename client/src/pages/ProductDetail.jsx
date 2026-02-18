import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart, FiShare2, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

// Lazy load heavy reviews component
const ProductReviews = React.lazy(() => import('../components/ProductReviews'));

import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  // ... existing hooks ...
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  
  // State for SKU variants
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use the centralized API instance (port 5001)
        const { data } = await import('../services/api').then(module => module.default.get(`/products/${id}`));
        
        if (data.success) {
          setProduct(data.data);
          // Reset selections when product changes
          setSelectedSize('');
          setSelectedColor('');
          setQuantity(1);
        } else {
            setError('Product not found');
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        fetchProduct();
    }
  }, [id]);


  // Derived state for variants (Safe to access product with optional chaining)
  const variants = product?.variants || [];
  
  const availableSizes = useMemo(() => {
    if (!variants.length) return [];
    const sizes = new Set(variants.map(v => v.size).filter(Boolean));
    return Array.from(sizes);
  }, [variants]);

  const availableColors = useMemo(() => {
    if (!variants.length) return [];
    const filtered = selectedSize 
        ? variants.filter(v => v.size === selectedSize)
        : variants;
    const colors = new Set(filtered.map(v => v.color).filter(Boolean));
    return Array.from(colors);
  }, [variants, selectedSize]);

  const currentVariant = useMemo(() => {
    if (!variants.length) return null;
    return variants.find(v => 
        (!v.size || v.size === selectedSize) && 
        (!v.color || v.color === selectedColor)
    );
  }, [variants, selectedSize, selectedColor]);

  const currentPrice = currentVariant ? currentVariant.price : product?.price;
  const currentStock = currentVariant ? currentVariant.stock : product?.stock;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    
    // Validate variant selection if variants exist
    if (variants.length > 0 && (!selectedSize && availableSizes.length > 0)) {
        alert('Please select a size');
        return;
    }
    if (variants.length > 0 && (!selectedColor && availableColors.length > 0)) {
        alert('Please select a color');
        return;
    }

    addToCart({
        id: product._id,
        name: product.name,
        price: currentPrice,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        sku: currentVariant?.sku || product.sku
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, currentVariant, selectedSize, selectedColor, quantity, addToCart, variants, currentPrice, availableSizes, availableColors]);

  // Loading and Error states (Must be AFTER all hooks)
  if (loading) {
     return (
      <div className="min-h-screen bg-essente-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C5A059] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
     return (
      <div className="min-h-screen bg-essente-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-elegant text-essente-charcoal mb-4">
            {error || "Product Not Found"}
          </h2>
          <button
            onClick={() => navigate('/collection')}
            className="px-6 py-3 bg-essente-charcoal text-white rounded-lg hover:bg-essente-charcoal/90 transition-colors"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  // SEO: Structured Data (JSON-LD) - Safe now as product is guaranteed
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Essenté"
    },
    "sku": currentVariant ? currentVariant.sku : product.sku || product._id,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "CAD",
      "price": currentPrice,
      "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8", 
      "reviewCount": product.numReviews || 89
    }
  };

  return (
    <div className="min-h-screen bg-essente-cream">
      <Helmet>
        <title>{`${product.name} | Essenté`}</title>
        <meta name="description" content={product.description.substring(0, 160)} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-essente-charcoal">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/collection')} className="hover:text-essente-charcoal">Collection</button>
          <span>/</span>
          <span className="text-essente-charcoal">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"      // Lazy loading enabled
                  decoding="async"    // Async decoding
                  width="600"         // Explicit width to prevent layout shift
                  height="600"        // Explicit height
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {product.isNewCollection && (
                <div className="absolute top-4 left-4 bg-[#C5A059] text-white px-4 py-2 rounded-full text-sm font-medium">
                  New Collection
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-elegant text-essente-charcoal mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiHeart
                      key={i}
                      className={i < 4 ? 'fill-[#C5A059] text-[#C5A059]' : 'text-gray-300'}
                      size={18}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">({product.numReviews} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light text-essente-charcoal">CAD ${currentPrice}</span>
                {product.compareAtPrice && (
                  <span className="text-xl text-gray-400 line-through">CAD ${product.compareAtPrice}</span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="border-t border-gray-200 pt-6 space-y-4">
                {/* Size Selector */}
                {availableSizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="flex gap-2">
                       {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md transition-all ${
                            selectedSize === size
                              ? 'border-[#C5A059] bg-[#C5A059] text-white'
                              : 'border-gray-300 hover:border-[#C5A059] text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {availableColors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="flex gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-md transition-all ${
                            selectedColor === color
                              ? 'border-[#C5A059] bg-[#C5A059] text-white'
                              : 'border-gray-300 hover:border-[#C5A059] text-gray-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Stock Status */}
                 <div className="mt-2 text-sm">
                    {currentVariant ? (
                        isOutOfStock ? (
                            <span className="text-red-600 font-medium">Out of Stock</span>
                        ) : (
                             <span className="text-green-600">In Stock: {currentStock}</span>
                        )
                    ) : (
                        <span className="text-gray-500">Select options to see availability</span>
                    )}
                 </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock || quantity >= currentStock}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || (product.variants?.length > 0 && !currentVariant)}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-essente-charcoal text-white hover:bg-essente-charcoal/90'
                }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck size={20} />
                    Added to Cart!
                  </>
                ) : isOutOfStock ? (
                   'Out of Stock' 
                ) : (
                  <>
                    <FiShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#C5A059] hover:text-[#C5A059] transition-colors">
                <FiHeart size={20} />
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#C5A059] hover:text-[#C5A059] transition-colors">
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <FiTruck className="text-[#C5A059]" size={20} />
                <span>Free shipping on orders over CAD $100</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiRefreshCw className="text-[#C5A059]" size={20} />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiShield className="text-[#C5A059]" size={20} />
                <span>2-year warranty included</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="border-t border-gray-200 pt-6">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                Category: {product.category}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section (Lazy Loaded) */}
        <div className="border-t border-gray-200 pt-12">
          <Suspense fallback={<div className="text-center py-4">Loading reviews...</div>}>
             <ProductReviews productId={product.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
