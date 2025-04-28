/*
  # Add additional product fields

  1. Changes
    - Add features array column
    - Add rating column
    - Add reviews column
    - Add discount column
    - Add is_new column
    - Add colors array column
    - Add sizes array column

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to products table
ALTER TABLE products
  ADD COLUMN features text[] NULL,
  ADD COLUMN rating numeric NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  ADD COLUMN reviews integer NOT NULL DEFAULT 0 CHECK (reviews >= 0),
  ADD COLUMN discount numeric NULL CHECK (discount >= 0 AND discount <= 100),
  ADD COLUMN is_new boolean NOT NULL DEFAULT false,
  ADD COLUMN colors text[] NULL,
  ADD COLUMN sizes text[] NULL;