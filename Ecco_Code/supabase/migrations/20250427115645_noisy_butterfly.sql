/*
  # Seed initial products data

  1. Changes
    - Insert initial products with all required fields
    - Set appropriate categories
    - Include features, colors, and sizes where applicable

  2. Security
    - Uses existing RLS policies
*/

INSERT INTO products (
  name,
  price,
  image_url,
  category,
  description,
  features,
  rating,
  reviews,
  stock,
  discount,
  is_new,
  colors,
  sizes
) VALUES
  (
    'Premium Wireless Headphones',
    299.99,
    'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
    'Electronics',
    'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort.',
    ARRAY['Active Noise Cancellation', '30-hour Battery Life', 'Premium Comfort', 'Bluetooth 5.0'],
    4.8,
    245,
    50,
    NULL,
    false,
    ARRAY['Black', 'Silver', 'Midnight Blue'],
    NULL
  ),
  (
    'Smart Watch Series X',
    349.99,
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    'Electronics',
    'Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, and a stunning always-on display.',
    ARRAY['Heart Rate Monitor', 'GPS', 'Always-on Display', '5 ATM Water Resistance'],
    4.7,
    189,
    75,
    NULL,
    false,
    ARRAY['Space Gray', 'Silver', 'Gold'],
    NULL
  ),
  (
    'Designer Leather Backpack',
    129.99,
    'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg',
    'Fashion',
    'Stylish and functional backpack made from premium leather. Perfect for work, travel, or everyday use with multiple compartments.',
    ARRAY['Premium Leather', 'Multiple Compartments', 'Laptop Sleeve', 'Water-resistant'],
    4.5,
    112,
    30,
    NULL,
    false,
    ARRAY['Brown', 'Black', 'Tan'],
    NULL
  ),
  (
    'Wireless Earbuds Pro',
    149.99,
    'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    'Electronics',
    'Experience wireless freedom with our premium earbuds. Features include active noise cancellation, water resistance, and 24-hour battery life.',
    ARRAY['Active Noise Cancellation', 'Water Resistance', '24-hour Battery Life', 'Premium Sound'],
    4.7,
    214,
    100,
    NULL,
    true,
    ARRAY['White', 'Black', 'Blue'],
    NULL
  ),
  (
    'Premium Yoga Mat',
    79.99,
    'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
    'Sports',
    'Enhance your yoga practice with our premium non-slip yoga mat. Features extra thickness for comfort and eco-friendly materials.',
    ARRAY['Non-slip Surface', 'Extra Thick', 'Eco-friendly', 'Carrying Strap Included'],
    4.6,
    134,
    45,
    NULL,
    false,
    ARRAY['Purple', 'Blue', 'Black', 'Green'],
    NULL
  );

-- Insert categories
INSERT INTO categories (name, description) VALUES
  ('Electronics', 'Latest gadgets and electronic devices'),
  ('Fashion', 'Trendy clothing and accessories'),
  ('Home', 'Home decor and furnishings'),
  ('Sports', 'Sports equipment and accessories');