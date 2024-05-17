import React from "react";

type ProductCardProps = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  description,
  image,
  category,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-900 font-bold">${price}</p>
        <p className="text-gray-600">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
