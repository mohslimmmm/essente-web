const productService = require('./product.service');

/**
 * Create product handler
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products handler
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product handler
 */
const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product handler
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product handler
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get dummy products handler
 */
const getDummyProducts = async (req, res, next) => {
  const dummyProducts = [
    // Living Room Collection
    {
      id: '1',
      name: 'Velvet Sofa',
      description: 'Luxurious velvet sofa with deep cushioning and elegant gold legs.',
      price: 1299,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '2',
      name: 'Minimalist Bed Frame',
      description: 'Sleek platform bed with clean lines and premium oak finish.',
      price: 899,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '3',
      name: 'Ceramic Vase Set',
      description: 'Handcrafted ceramic vases in neutral tones, set of 3.',
      price: 89,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1581783342308-f792ca1c76c4?auto=format&fit=crop&q=80&w=2030',
      isNewCollection: false
    },
    {
      id: '4',
      name: 'Leather Armchair',
      description: 'Premium full-grain leather armchair with brass accents.',
      price: 1450,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '5',
      name: 'Marble Coffee Table',
      description: 'Italian Carrara marble top with gold-finished steel base.',
      price: 799,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '6',
      name: 'Linen Bedding Set',
      description: 'Pure Belgian linen duvet cover and pillowcases in ivory.',
      price: 249,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '7',
      name: 'Oak Desk',
      description: 'Solid oak writing desk with minimalist Scandinavian design.',
      price: 649,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=2036',
      isNewCollection: false
    },
    {
      id: '8',
      name: 'Wool Throw Blanket',
      description: 'Merino wool throw in charcoal grey with subtle herringbone pattern.',
      price: 159,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1580301762395-9c6496707831?auto=format&fit=crop&q=80&w=2000',
      isNewCollection: false
    },
    {
      id: '9',
      name: 'Brass Table Lamp',
      description: 'Art deco inspired brass lamp with linen shade.',
      price: 189,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '10',
      name: 'Velvet Cushion Set',
      description: 'Set of 4 velvet cushions in complementary earth tones.',
      price: 119,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '11',
      name: 'Leather Office Chair',
      description: 'Ergonomic office chair with premium leather and chrome base.',
      price: 549,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '12',
      name: 'Nightstand Pair',
      description: 'Matching walnut nightstands with soft-close drawers.',
      price: 399,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '13',
      name: 'Abstract Canvas Art',
      description: 'Large format abstract art in muted tones, 120x90cm.',
      price: 449,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=2058',
      isNewCollection: true
    },
    {
      id: '14',
      name: 'Bookshelf Unit',
      description: 'Modular oak bookshelf with adjustable shelving.',
      price: 729,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '15',
      name: 'Cashmere Throw',
      description: '100% pure cashmere throw in camel beige.',
      price: 329,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '16',
      name: 'Floor Mirror',
      description: 'Full-length mirror with brass frame, 180cm height.',
      price: 379,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '17',
      name: 'Dining Chair Set',
      description: 'Set of 4 upholstered dining chairs in dove grey.',
      price: 899,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '18',
      name: 'Scented Candle Collection',
      description: 'Luxury candle trio: Sandalwood, Amber, and White Tea.',
      price: 95,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1602874801006-e7d7a9e9a9b2?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '19',
      name: 'Desk Organizer Set',
      description: 'Leather desk accessories set with gold detailing.',
      price: 149,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '20',
      name: 'Ottoman Bench',
      description: 'Tufted velvet ottoman with hidden storage.',
      price: 429,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1916',
      isNewCollection: false
    },
    {
      id: '21',
      name: 'Silk Pillowcase Set',
      description: 'Mulberry silk pillowcases, hypoallergenic, set of 2.',
      price: 129,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2071',
      isNewCollection: true
    },
    {
      id: '22',
      name: 'Wall Clock',
      description: 'Minimalist wall clock with brass hands and silent movement.',
      price: 89,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '23',
      name: 'Wardrobe Armoire',
      description: 'Solid wood armoire with mirrored doors and soft lighting.',
      price: 1599,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '24',
      name: 'Desk Lamp',
      description: 'Adjustable LED desk lamp with touch controls and USB port.',
      price: 119,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '25',
      name: 'Area Rug',
      description: 'Hand-woven wool rug in geometric pattern, 200x300cm.',
      price: 649,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '26',
      name: 'Decorative Tray Set',
      description: 'Marble and brass serving trays, set of 2.',
      price: 139,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '27',
      name: 'Reading Chair',
      description: 'Ergonomic reading chair with ottoman in charcoal fabric.',
      price: 799,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1916',
      isNewCollection: true
    },
    {
      id: '28',
      name: 'Dresser Unit',
      description: '6-drawer dresser in white oak with brass handles.',
      price: 949,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '29',
      name: 'Filing Cabinet',
      description: 'Modern 3-drawer filing cabinet with lock, matte black.',
      price: 349,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '30',
      name: 'Plant Stand Set',
      description: 'Tiered brass plant stands for indoor greenery, set of 3.',
      price: 179,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=2072',
      isNewCollection: false
    },
    {
      id: '31',
      name: 'Sectional Sofa',
      description: 'L-shaped sectional in premium linen with reversible chaise.',
      price: 2199,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '32',
      name: 'Upholstered Headboard',
      description: 'King-size tufted headboard in soft grey velvet.',
      price: 549,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '33',
      name: 'Executive Desk',
      description: 'Large executive desk with built-in cable management.',
      price: 1099,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '34',
      name: 'Crystal Chandelier',
      description: 'Modern crystal chandelier with adjustable height.',
      price: 899,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: true
    },
    {
      id: '35',
      name: 'Console Table',
      description: 'Slim console table with marble top and gold frame.',
      price: 479,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    },
    {
      id: '36',
      name: 'Bedside Lamp Pair',
      description: 'Matching ceramic table lamps with linen shades.',
      price: 219,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '37',
      name: 'Ergonomic Task Chair',
      description: 'Mesh back task chair with lumbar support and armrests.',
      price: 399,
      category: 'office',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '38',
      name: 'Decorative Mirror Set',
      description: 'Set of 3 round mirrors in varying sizes with gold frames.',
      price: 269,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: false
    },
    {
      id: '39',
      name: 'Bar Cart',
      description: 'Two-tier bar cart with glass shelves and gold finish.',
      price: 329,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1974',
      isNewCollection: true
    },
    {
      id: '40',
      name: 'Quilted Bedspread',
      description: 'Luxury quilted bedspread in ivory with matching shams.',
      price: 289,
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070',
      isNewCollection: false
    }
  ];

  res.status(200).json({
    success: true,
    count: dummyProducts.length,
    data: dummyProducts
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getDummyProducts
};
